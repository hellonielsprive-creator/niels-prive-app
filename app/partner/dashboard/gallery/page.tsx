"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Upload,
  ImagePlus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  ImageIcon,
} from "lucide-react";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";
import {
  createGalleryItem,
  getGalleryByPartnerId,
} from "@/lib/firestore/gallery";

export default function GalleryPage() {
  const router = useRouter();

  const { partnerId } = useDashboardData();

  const [galleryImages, setGalleryImages] =
    useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState("");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!partnerId) {
      return;
    }

    const fetchGallery = async () => {
      try {
        const galleryData =
          await getGalleryByPartnerId(partnerId);

        setGalleryImages(galleryData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchGallery();
  }, [partnerId]);

  const handleUpload = async () => {
    if (!imageUrl || !title || !category) {
      alert("Please Fill All Fields");
      return;
    }

    if (!partnerId) {
      alert("Please sign in");
      return;
    }

    try {
      const created = await createGalleryItem(
        partnerId,
        {
          title,
          category,
          image: imageUrl,
        }
      );

      setGalleryImages((prev) => [created, ...prev]);

      setImageUrl("");
      setTitle("");
      setCategory("");

      alert("Media Uploaded Successfully");
    } catch (error) {
      console.log(error);

      alert("Failed To Upload Media");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="max-w-7xl mx-auto px-8 py-10">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">
              MEDIA STUDIO
            </p>

            <button
              onClick={() =>
                router.push("/partner/dashboard")
              }
              className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
            >
              ← Back To Dashboard
            </button>

            <h1 className="text-5xl font-semibold leading-tight">
              Luxury Gallery
              <br />
              Management
            </h1>

            <p className="text-white/45 mt-5 leading-8 max-w-2xl">
              Curate premium hospitality visuals, cinematic room
              experiences, and immersive luxury storytelling.
            </p>
          </div>
        </div>

        {/* UPLOAD SECTION */}

        <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Media Title"
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              placeholder="Category"
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
              placeholder="Image URL"
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-7 py-4 rounded-2xl flex items-center gap-3 font-medium"
          >
            <Upload size={20} />
            Upload Media
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="text-center py-32 text-white/40 text-xl">
            Loading Media Gallery...
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && galleryImages.length === 0 && (
          <div className="border border-dashed border-white/10 rounded-[35px] p-16 text-center bg-white/[0.02]">
            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">
              <ImageIcon
                size={38}
                className="text-[#d4a574]"
              />
            </div>

            <h2 className="text-3xl font-semibold mb-4">
              No Media Uploaded Yet
            </h2>

            <p className="text-white/45 max-w-xl mx-auto leading-8 mb-10">
              Upload cinematic hospitality visuals, room photography,
              amenities, and luxury experiences.
            </p>
          </div>
        )}

        {/* LIVE GALLERY */}

        <div className="grid lg:grid-cols-2 gap-8">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03]"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[340px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <button className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <MoreVertical size={18} />
                </button>

                <div className="absolute bottom-0 left-0 p-8">
                  <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">
                    {item.category}
                  </p>

                  <h3 className="text-4xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 leading-8 max-w-lg">
                    Luxury hospitality visual optimized for immersive
                    guest presentation.
                  </p>
                </div>
              </div>

              <div className="p-7 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-[#d4a574] transition-all">
                    <Eye size={20} />
                  </button>

                  <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-[#d4a574] transition-all">
                    <Pencil size={20} />
                  </button>

                  <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-red-500 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>

                <button className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-medium">
                  <ImagePlus size={18} />
                  Replace Media
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
