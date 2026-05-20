"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function AddRoomPage() {

  const [roomName, setRoomName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [guests, setGuests] =
    useState("");

  const [price, setPrice] =
    useState("");

  const addRoom = async () => {

    try {

      await addDoc(
        collection(db, "rooms"),
        {
          roomName,
          description,
          guests,
          price,
        }
      );

      alert("Room added successfully");

      setRoomName("");
      setDescription("");
      setGuests("");
      setPrice("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-10">

      <div className="w-full max-w-2xl border border-white/10 bg-white/[0.03] rounded-[35px] p-10">

        <h1 className="text-5xl font-semibold mb-10">

          Add New Room

        </h1>

        <div className="space-y-6">

          <input
            value={roomName}
            onChange={(e) =>
              setRoomName(e.target.value)
            }
            placeholder="Room Name"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Room Description"
            className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none resize-none"
          />

          <input
            value={guests}
            onChange={(e) =>
              setGuests(e.target.value)
            }
            placeholder="Guests"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
          />

          <input
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Price"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-5 outline-none"
          />

          <button
            onClick={addRoom}
            className="w-full bg-[#d4a574] text-black py-5 rounded-2xl font-semibold text-lg"
          >

            Add Room

          </button>

        </div>

      </div>

    </main>

  );

}