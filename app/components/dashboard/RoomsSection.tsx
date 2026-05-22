"use client";

import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function RoomsSection({
  rooms,
  editingRoom,
  setEditingRoom,
  updatedPrice,
  setUpdatedPrice,
  setRooms,
}: any) {

  return (

    <div className="mt-10 px-20">

      <h2 className="text-4xl font-semibold mb-8 mt-6 ml-6">

        Property Rooms

      </h2>

      <div className="grid grid-cols-3 gap-6 pl-2">

        {rooms.map((room: any) => (

          <div
            key={room.id}
            className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 ml-6"
          >

            <h3 className="text-3xl font-semibold mb-4">

              {room.roomName}

            </h3>

            <p className="text-neutral-400 mb-4">

              {room.description}

            </p>

            <p className="mb-2">

              Guests: {room.guests}

            </p>

            <p className="text-[#d4a574]">

              ${room.price}

            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => {

                  setEditingRoom(room.id);
                  setUpdatedPrice(room.price);

                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >

                Edit

              </button>

              <button
                onClick={async () => {

                  await deleteDoc(
                    doc(db, "rooms", room.id)
                  );

                  setRooms(
                    rooms.filter(
                      (r: any) => r.id !== room.id
                    )
                  );

                }}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >

                Delete

              </button>

            </div>

            {

              editingRoom === room.id && (

                <div className="mt-5 space-y-3">

                  <input
                    value={updatedPrice}
                    onChange={(e) =>
                      setUpdatedPrice(e.target.value)
                    }
                    placeholder="Update price"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />

                  <button
                    onClick={async () => {

                      await updateDoc(
                        doc(db, "rooms", room.id),
                        {
                          price: updatedPrice,
                        }
                      );

                      setRooms(
                        rooms.map((r: any) =>

                          r.id === room.id
                            ? {
                                ...r,
                                price: updatedPrice,
                              }
                            : r

                        )
                      );

                      setEditingRoom(null);

                    }}
                    className="bg-[#d4a574] text-black px-5 py-3 rounded-xl font-medium"
                  >

                    Save Changes

                  </button>

                </div>

              )

            }

          </div>

        ))}

      </div>

    </div>

  );

}