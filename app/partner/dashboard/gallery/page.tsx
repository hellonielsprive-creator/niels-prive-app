"use client";

import {
  Upload,
  ImagePlus,
  FolderPlus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function GalleryPage() {

  const galleryImages = [

    {
      title: "Oceanfront Arrival",
      category: "Hero Banner",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    },

    {
      title: "Skyline Penthouse",
      category: "Luxury Suites",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    },

    {
      title: "Infinity Pool",
      category: "Amenities",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2070&auto=format&fit=crop",
    },

    {
      title: "Private Dining",
      category: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },

  ];

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* TOPBAR */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

              MEDIA STUDIO

            </p>

            <h1 className="text-5xl font-semibold leading-tight">

              Luxury Gallery
              <br />
              Management

            </h1>

          </div>

          <div className="flex items-center gap-4">

            <button className="border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all px-6 py-4 rounded-2xl flex items-center gap-3">

              <FolderPlus size={20} />

              Create Collection

            </button>

            <button className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-medium">

              <Upload size={20} />

              Upload Media

            </button>

          </div>

        </div>

        {/* HERO CARD */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] mb-12">

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
            alt="Gallery"
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute z-20 left-0 top-0 h-full flex flex-col justify-center px-12 max-w-2xl">

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">

              VISUAL EXPERIENCE

            </p>

            <h2 className="text-6xl font-semibold leading-[1.05] mb-8">

              Showcase Your
              Property Through
              Cinematic Visuals

            </h2>

            <p className="text-neutral-300 text-lg leading-9">

              Premium hospitality begins with premium
              presentation. Curate immersive visuals that
              inspire travelers worldwide.

            </p>

          </div>

        </div>

        {/* GALLERY GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {galleryImages.map((item, index) => (

            <div
              key={index}
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

                    Professionally curated visual asset
                    optimized for premium hospitality
                    presentation.

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