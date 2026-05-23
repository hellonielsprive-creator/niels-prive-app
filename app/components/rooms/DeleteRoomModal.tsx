"use client";

type DeleteRoomModalProps = {
  showDeleteModal: boolean;
  selectedRoom: any;
  setShowDeleteModal: any;
  setSelectedRoom: any;
  deleteRoom: () => void;
};

export default function DeleteRoomModal({
  showDeleteModal,
  selectedRoom,
  setShowDeleteModal,
  setSelectedRoom,
  deleteRoom,
}: DeleteRoomModalProps) {

  if (
    !showDeleteModal ||
    !selectedRoom
  ) {
    return null;
  }

  return (

    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#111111] p-8">

        <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

          ARCHIVE ROOM

        </p>

        <h2 className="text-3xl font-semibold mb-4">

          Archive
          {" "}
          {selectedRoom.roomName}?

        </h2>

        <p className="text-white/45 leading-7 mb-8">

          The room will be hidden from active inventory while preserving historical analytics and reservation records.

        </p>

        <div className="flex items-center gap-4">

          <button
            onClick={() => {

              setShowDeleteModal(
                false
              );

              setSelectedRoom(
                null
              );

            }}
            className="flex-1 py-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all"
          >

            Cancel

          </button>

          <button
            onClick={deleteRoom}
            className="flex-1 py-4 rounded-2xl bg-red-900/60 hover:bg-red-800/60 transition-all text-white"
          >

            Archive Room

          </button>

        </div>

      </div>

    </div>

  );

}