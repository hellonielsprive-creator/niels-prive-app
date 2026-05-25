import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Star,
} from "lucide-react";

type HotelCardProps = {
  id?: string;
  image: string;
  name: string;
  location: string;
  rating: string;
  price: string;
  rooms: string;
  status?: string;
};

export default function HotelCard({
  id,
  image,
  name,
  location,
  rating,
  price,
  rooms,
  status = "Available",
}: HotelCardProps) {
  const router = useRouter();

  const handleReserveClick = () => {
    router.push(`/checkout?hotelId=${encodeURIComponent(id || "")}&hotelName=${encodeURIComponent(name)}`);
  };

  return (

    <div
      className="
        group
        relative
        bg-white
        rounded-[34px]
        overflow-hidden
        border border-black/[0.04]
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-700
        hover:-translate-y-3
        hover:shadow-[0_35px_90px_rgba(0,0,0,0.14)]
      "
    >

      {/* IMAGE SECTION */}

      <div className="relative overflow-hidden h-[280px]">

        <img
          src={image}
          alt={name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-[4000ms]
            ease-out
            group-hover:scale-110
          "
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* LIGHT EFFECT */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%)]" />

        {/* STATUS */}

        <div className="absolute top-5 right-5">

          <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-medium text-black shadow-lg">

            {status}

          </div>

        </div>

        {/* CONTENT OVER IMAGE */}

        <div className="absolute bottom-0 left-0 p-6 z-10">

          <p className="uppercase tracking-[4px] text-white/60 text-[11px] mb-2">

            Niels Privé Collection

          </p>

          <h2 className="text-white text-3xl font-semibold leading-tight max-w-[280px]">

            {name}

          </h2>

          <p className="text-white/70 mt-3 text-sm">

            {location}

          </p>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="p-7">

        {/* TOP DETAILS */}

        <div className="flex items-center justify-between gap-5">

          <div>

            <p className="text-[#8a8a8a] text-sm mb-2">
              Starting From
            </p>

            <h3 className="text-4xl font-semibold text-[#111] leading-none">

              {price}

            </h3>

            <p className="text-[#8a8a8a] text-sm mt-2">

              per night

            </p>

          </div>

          <div className="text-right">

            <div className="bg-black text-white px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 mb-4">

              <Star
                size={14}
                className="fill-white"
              />

              {rating}

            </div>

            <p className="text-[#8a8a8a] text-sm">
              Rooms Left
            </p>

            <h3 className="text-black text-lg font-semibold">

              {rooms}

            </h3>

          </div>

        </div>

        {/* LUXURY FEATURES */}

        <div className="mt-8 flex flex-wrap gap-3">

          <div className="bg-[#f4f4f4] px-4 py-2 rounded-full text-sm text-black">
            Ocean View
          </div>

          <div className="bg-[#f4f4f4] px-4 py-2 rounded-full text-sm text-black">
            Spa Access
          </div>

          <div className="bg-[#f4f4f4] px-4 py-2 rounded-full text-sm text-black">
            Premium Suite
          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-8 flex gap-3">

          <Link
            href={`/hotel/${id}`}
            className="
              flex-1
              bg-black
              text-white
              py-4
              rounded-2xl
              text-center
              font-medium
              transition-all
              hover:opacity-90
              hover:scale-[0.98]
            "
          >

            View Stay

          </Link>

          <button
            onClick={handleReserveClick}
            className="
              flex-1
              border
              border-[#e5e5e5]
              py-4
              rounded-2xl
              text-black
              font-medium
              transition-all
              hover:bg-[#f7f7f7]
            "
          >

            Reserve

          </button>

        </div>

      </div>

    </div>

  );

}