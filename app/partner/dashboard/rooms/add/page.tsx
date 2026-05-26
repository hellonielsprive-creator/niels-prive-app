"use client";

import { useEffect, useState } from "react";
import { type User } from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  db,
  auth,
  storage,
} from "@/lib/firebase";

import { useRouter } from "next/navigation";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";

import {
  BedDouble,
  Users,
  Wallet,
  FileText,
  ArrowLeft,
  Building2,
  ImagePlus,
  Sparkles,
} from "lucide-react";

export default function AddRoomPage() {

  const router = useRouter();

  const { syncAfterMutation } =
    useDashboardData();

  /* ROOM */

  const [roomName, setRoomName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [guests, setGuests] =
    useState("");

  const [price, setPrice] =
    useState("");

  /* HOTEL */

  const [hotels, setHotels] =
    useState<any[]>([]);

  const [selectedHotel,
    setSelectedHotel,
  ] = useState("");

  /* MEDIA */

  const [image,
    setImage,
  ] = useState<File | null>(null);

  const [preview,
    setPreview,
  ] = useState("");

  const [galleryFiles,
    setGalleryFiles,
  ] = useState<File[]>([]);

  const [galleryPreview,
    setGalleryPreview,
  ] = useState<string[]>([]);

  /* STATES */

  const [loading, setLoading] =
    useState(false);

  /* FETCH HOTELS */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        return;
      }

      const fetchHotels = async () => {
        try {
          const hotelsQuery = query(
            collection(db, "hotels"),
            where("partnerId", "==", user.uid)
          );

          let snapshot = await getDocs(hotelsQuery);

          let hotelsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (hotelsData.length === 0) {
            console.log("Add Room: No hotels found, attempting to create one...");

            const partnerDocRef = doc(db, "partners", user.uid);
            const partnerDoc = await getDoc(partnerDocRef);

            let hotelName = "My Property";
            if (partnerDoc.exists()) {
              hotelName = (partnerDoc.data().propertyName as string) || hotelName;
              console.log("Add Room: Found partner, propertyName is:", hotelName);
            }

            const newHotelRef = await addDoc(collection(db, "hotels"), {
              name: hotelName,
              partnerId: user.uid,
              createdAt: new Date(),
            });

            console.log("Add Room: Created new hotel, id:", newHotelRef.id);

            // Now fetch again to get the new hotel
            snapshot = await getDocs(hotelsQuery);
            hotelsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          }

          setHotels(hotelsData);

          if (hotelsData.length === 1) {
            setSelectedHotel(hotelsData[0].id);
          }
        } catch (error) {
          console.error("Add Room: Error fetching/creating hotels:", error);
        }
      };

      await fetchHotels();
    });

    return () => unsubscribe();
  }, []);

  /* ADD ROOM */

  const addRoom = async () => {

    if (
      !selectedHotel ||
      !roomName ||
      !description ||
      !guests ||
      !price
    ) {

      alert(
        "Please complete all room details"
      );

      return;

    }

    try {

      setLoading(true);

      const hotelData =
        hotels.find(
          (hotel) =>
            hotel.id ===
            selectedHotel
        );

      /* MAIN IMAGE */

      let imageUrl = "";

      if (image) {

        const imageRef =
          ref(
            storage,
            `rooms/${Date.now()}-${image.name}`
          );

        const snapshot =
          await uploadBytes(
            imageRef,
            image
          );

        imageUrl =
          await getDownloadURL(
            snapshot.ref
          );

      }

      /* GALLERY */

      const galleryUrls: string[] =
        [];

      for (const file of galleryFiles) {

        const galleryRef =
          ref(
            storage,
            `rooms/gallery/${Date.now()}-${file.name}`
          );

        const snapshot =
          await uploadBytes(
            galleryRef,
            file
          );

        const url =
          await getDownloadURL(
            snapshot.ref
          );

        galleryUrls.push(
          url
        );

      }

      /* INCLUDE MAIN IMAGE */

      if (
        imageUrl &&
        !galleryUrls.includes(
          imageUrl
        )
      ) {

        galleryUrls.unshift(
          imageUrl
        );

      }

      /* CREATE ROOM */

      await addDoc(
        collection(db, "rooms"),
        {

          /* HOTEL RELATION */

          hotelId:
            selectedHotel,

          hotelName:
            hotelData?.name || "",

          /* ROOM */

          roomName,

          description,

          guests,

          price,

          /* MEDIA */

          image: imageUrl,

          gallery:
            galleryUrls,

          /* SYSTEM */

          partnerId:
            auth.currentUser?.uid,

          createdAt:
            new Date(),

          manualStatus:
            "available",

          archived: false,

        }
      );

      await syncAfterMutation();

      alert(
        "Room added successfully"
      );

      router.push(
        "/partner/dashboard/rooms"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#050505] text-white px-6 py-14 overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.10),transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <div className="flex flex-wrap items-center gap-4 mb-8">

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard/rooms"
                )
              }
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all"
            >

              <ArrowLeft size={18} />

              Back To Rooms

            </button>

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard"
                )
              }
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all"
            >

              <ArrowLeft size={18} />

              Back To Dashboard

            </button>

          </div>

          <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">

            NIELS PRIVÉ INVENTORY

          </p>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-5 tracking-[-0.04em]">

            Add Premium
            <br />
            Room Inventory

          </h1>

          <p className="text-white/45 leading-8 max-w-3xl text-lg">

            Create luxury room experiences connected to your hospitality properties with operational readiness and premium guest presentation.

          </p>

        </div>

        {/* FORM */}

        <div className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-8 md:p-10">

          <div className="space-y-7">

            {/* HOTEL */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Select Hotel

              </p>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d4a574]"
                />

                <select
                  value={selectedHotel}
                  onChange={(e) =>
                    setSelectedHotel(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-2xl pl-14 pr-5 py-5 outline-none"
                >

                  <option value="">

                    Select Property

                  </option>

                  {hotels.map(
                    (hotel) => (

                      <option
                        key={hotel.id}
                        value={hotel.id}
                      >

                        {hotel.name}

                      </option>

                    )
                  )}

                </select>

              </div>

            </div>

            {/* ROOM NAME */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Room Name

              </p>

              <div className="relative">

                <BedDouble
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d4a574]"
                />

                <input
                  value={roomName}
                  onChange={(e) =>
                    setRoomName(
                      e.target.value
                    )
                  }
                  placeholder="Royal Ocean Suite"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl pl-14 pr-5 py-5 outline-none"
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Room Description

              </p>

              <div className="relative">

                <FileText
                  size={18}
                  className="absolute left-5 top-6 text-[#d4a574]"
                />

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Describe the premium guest experience..."
                  className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl pl-14 pr-5 py-5 outline-none resize-none"
                />

              </div>

            </div>

            {/* GUESTS */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Guest Capacity

              </p>

              <div className="relative">

                <Users
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d4a574]"
                />

                <input
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      e.target.value
                    )
                  }
                  placeholder="2 Guests"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl pl-14 pr-5 py-5 outline-none"
                />

              </div>

            </div>

            {/* PRICE */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Starting Price

              </p>

              <div className="relative">

                <Wallet
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d4a574]"
                />

                <input
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  placeholder="12000"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl pl-14 pr-5 py-5 outline-none"
                />

              </div>

            </div>

            {/* MAIN IMAGE */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Main Room Image

              </p>

              <label className="border border-dashed border-white/10 rounded-[30px] bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.04] transition-all">

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];

                    if (!file)
                      return;

                    setImage(file);

                    setPreview(
                      URL.createObjectURL(
                        file
                      )
                    );

                  }}
                />

                {

                  preview ? (

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[280px] object-cover rounded-[24px]"
                    />

                  ) : (

                    <div>

                      <div className="w-20 h-20 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-5">

                        <BedDouble
                          size={34}
                          className="text-[#d4a574]"
                        />

                      </div>

                      <h3 className="text-2xl font-semibold mb-3">

                        Upload Main Room Image

                      </h3>

                      <p className="text-white/45 leading-7 max-w-md">

                        Add cinematic luxury room visuals for your premium inventory listing.

                      </p>

                    </div>

                  )

                }

              </label>

            </div>

            {/* GALLERY */}

            <div>

              <p className="text-sm text-white/45 mb-3">

                Room Gallery

              </p>

              <label className="border border-dashed border-white/10 rounded-[30px] bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.04] transition-all">

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {

                    const files =
                      Array.from(
                        e.target.files || []
                      );

                    setGalleryFiles(
                      files
                    );

                    const previews =
                      files.map(
                        (file) =>
                          URL.createObjectURL(
                            file
                          )
                      );

                    setGalleryPreview(
                      previews
                    );

                  }}
                />

                <div className="w-20 h-20 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-5">

                  <ImagePlus
                    size={34}
                    className="text-[#d4a574]"
                  />

                </div>

                <h3 className="text-2xl font-semibold mb-3">

                  Upload Room Gallery

                </h3>

                <p className="text-white/45 leading-7 max-w-md mb-8">

                  Add multiple room visuals including bathrooms, suites, balconies, and amenities.

                </p>

                {/* PREVIEWS */}

                {
                  galleryPreview.length > 0 && (

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">

                      {galleryPreview.map(
                        (
                          image,
                          index
                        ) => (

                          <img
                            key={index}
                            src={image}
                            alt="Preview"
                            className="w-full h-[140px] object-cover rounded-2xl"
                          />

                        )
                      )}

                    </div>

                  )
                }

              </label>

            </div>

            {/* SUBMIT */}

            <button
              onClick={addRoom}
              disabled={loading}
              className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-5 rounded-2xl font-semibold text-lg disabled:opacity-50 flex items-center justify-center gap-3"
            >

              <Sparkles size={20} />

              {loading
                ? "Creating Luxury Room..."
                : "Add Premium Room"}

            </button>

          </div>

        </div>

      </section>

    </main>

  );

}