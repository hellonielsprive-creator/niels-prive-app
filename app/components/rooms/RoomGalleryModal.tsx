"use client";

type RoomGalleryModalProps = {
  galleryPreview: string[];
  setGalleryPreview: any;
};

export default function RoomGalleryModal({
  galleryPreview,
  setGalleryPreview,
}: RoomGalleryModalProps) {

  if (
    galleryPreview.length === 0
  ) {
    return null;
  }

  return (

    <div
      onClick={() =>
        setGalleryPreview([])
      }
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-10 overflow-y-auto"
    >

      <div className="grid md:grid-cols-2 gap-5 max-w-6xl">

        {galleryPreview.map(
          (
            image,
            index
          ) => (

            <img
              key={index}
              src={image}
              alt="Gallery"
              className="w-full h-[320px] object-cover rounded-[28px]"
            />

          )
        )}

      </div>

    </div>

  );

}