type HotelCardProps = {
  image: string;
  name: string;
  location: string;
  rating: string;
  price: string;
  rooms: string;
};

export default function HotelCard({
  image,
  name,
  location,
  rating,
  price,
  rooms,
}: HotelCardProps) {

  return (
    <div className="bg-white rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:scale-[1.02]">

      <img
        src={image}
        alt={name}
        className="h-[240px] w-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      <div className="p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold text-black">
            {name}
          </h2>

          <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
            {rating}
          </div>

        </div>

        <p className="text-gray-500 mt-2">
          {location}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-gray-500 text-sm">
              Starting From
            </p>

            <h3 className="text-3xl font-semibold text-black">
              {price}
            </h3>

          </div>

          <div className="text-right">

            <p className="text-gray-500 text-sm">
              Rooms Left
            </p>

            <h3 className="font-semibold text-black">
              {rooms}
            </h3>

          </div>

        </div>

        <div className="mt-6 flex gap-3">

          <a
  href="/hotel/1"
  className="flex-1 bg-black text-white py-3 rounded-2xl hover:opacity-90 transition-all text-center"
>
  View Stay
</a>
          <button className="flex-1 border border-gray-300 py-3 rounded-2xl hover:bg-gray-50 transition-all text-black">
            Contact
          </button>

        </div>

      </div>

    </div>
  );
}