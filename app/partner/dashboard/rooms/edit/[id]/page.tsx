"use client";

import { useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function EditRoomPage() {

  const router = useRouter();

  const params = useParams();

  const roomId =
    params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [roomName, setRoomName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [guests, setGuests] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [bedType, setBedType] =
    useState("");

  const [bathrooms, setBathrooms] =
    useState("");

  const [size, setSize] =
    useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {

    const fetchRoom =
      async () => {

        try {

          const roomRef =
            doc(
              db,
              "rooms",
              roomId
            );

          const roomSnap =
            await getDoc(
              roomRef
            );

          if (
            roomSnap.exists()
          ) {

            const roomData =
              roomSnap.data();

            setRoomName(
              roomData.roomName || ""
            );

            setDescription(
              roomData.description || ""
            );

            setGuests(
              roomData.guests || ""
            );

            setPrice(
              roomData.price || ""
            );

            setBedType(
              roomData.bedType || ""
            );

            setBathrooms(
              roomData.bathrooms || ""
            );

            setSize(
              roomData.size || ""
            );

            setImage(
              roomData.image || ""
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    if (roomId) {

      fetchRoom();

    }

  }, [roomId]);

  const updateRoom =
    async () => {

      try {

        setSaving(true);

        await updateDoc(
          doc(
            db,
            "rooms",
            roomId
          ),
          {
            roomName,
            description,
            guests,
            price,
            bedType,
            bathrooms,
            size,
            image,
          }
        );

        alert(
          "Room updated successfully"
        );

        router.push(
          "/partner/dashboard/rooms"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setSaving(false);

      }

    };

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        Loading Room...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-10">

      <div className="w-full max-w-3xl border border-white/10 bg-white/[0.03] rounded-[35px] p-10">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

          <div>

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

              ROOM EDITOR

            </p>

            <h1 className="text-5xl font-semibold">

              Edit Room

            </h1>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard"
                )
              }
              className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
            >

              Dashboard

            </button>

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard/rooms"
                )
              }
              className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
            >

              Rooms

            </button>

          </div>

        </div>

        {/* FORM */}

        <div className="space-y-6">

          <input
            value={roomName}
            onChange={(e) =>
              setRoomName(
                e.target.value
              )
            }
            placeholder="Room Name"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Room Description"
            className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none resize-none"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              value={guests}
              onChange={(e) =>
                setGuests(
                  e.target.value
                )
              }
              placeholder="Guests"
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
            />

            <input
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              placeholder="Price"
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
            />

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              value={bedType}
              onChange={(e) =>
                setBedType(
                  e.target.value
                )
              }
              placeholder="Bed Type"
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
            />

            <input
              value={bathrooms}
              onChange={(e) =>
                setBathrooms(
                  e.target.value
                )
              }
              placeholder="Bathrooms"
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
            />

            <input
              value={size}
              onChange={(e) =>
                setSize(
                  e.target.value
                )
              }
              placeholder="Room Size"
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
            />

          </div>

          <input
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            placeholder="Room Image URL"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
          />

          {/* IMAGE PREVIEW */}

          {image && (

            <img
              src={image}
              alt="Room Preview"
              className="w-full h-[280px] object-cover rounded-[28px] border border-white/10"
            />

          )}

          {/* SAVE */}

          <button
            onClick={updateRoom}
            disabled={saving}
            className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-5 rounded-2xl font-semibold text-lg disabled:opacity-50"
          >

            {
              saving
                ? "Saving Changes..."
                : "Save Room Changes"
            }

          </button>

        </div>

      </div>

    </main>

  );

}