"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  HOTEL,
  Lang,
  RoomType,
  UI_COPY,
  buildWhatsAppUrl,
  formatRupiah,
} from "@/lib/hotel-data";
import {
  BedIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  RulerIcon,
  UsersIcon,
  WhatsAppIcon,
} from "./Icons";

interface RoomGalleryModalProps {
  room: RoomType;
  initialIndex: number;
  lang: Lang;
  onClose: () => void;
}

export function RoomGalleryModal({
  room,
  initialIndex,
  lang,
  onClose,
}: RoomGalleryModalProps) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const copy = UI_COPY.rooms;
  const totalPhotos = room.photos.length;
  const activePhoto = room.photos[activeIdx] ?? room.photos[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev + 1) % totalPhotos);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, totalPhotos]);

  const adultLabel =
    room.maxAdults === 1 ? copy.adultSingular[lang] : copy.adultPlural[lang];

  const bookingMessage =
    lang === "id"
      ? `Halo ${HOTEL.name}, saya tertarik memesan kamar ${room.name} (${formatRupiah(
          room.pricePerNight
        )}/malam). Mohon info ketersediaan dan info promo harga.`
      : `Hello ${HOTEL.name}, I would like to book the ${room.name} (${formatRupiah(
          room.pricePerNight
        )}/night). Could you share availability and current promo rates?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141A1B]/85 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-room-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-[#FAFAF7] border border-[#2F3B3D] overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Photo Stage & Ordered Thumbnail Strip */}
        <div className="lg:col-span-7 bg-[#141A1B] flex flex-col">
          {/* Top strip inside dark stage */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#283335] text-xs text-[#D4DFE0]">
            <span className="font-medium tracking-wide tabular-nums">
              {copy.photoLabel[lang]} {activeIdx + 1} {copy.ofLabel[lang]}{" "}
              {totalPhotos}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden inline-flex items-center gap-1 text-white hover:text-[#2AA4B0] cursor-pointer"
              aria-label={copy.closeModal[lang]}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Uncropped display container for both landscape & portrait shots */}
          <div className="relative h-[300px] sm:h-[420px] lg:h-[460px] w-full bg-[#141A1B]">
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt[lang]}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain p-2 sm:p-4"
            />

            {totalPhotos > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos)
                  }
                  aria-label={
                    lang === "id" ? "Foto sebelumnya" : "Previous photo"
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#182021]/90 hover:bg-[#0C7B85] text-white border border-[#354345] transition-colors cursor-pointer"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIdx((prev) => (prev + 1) % totalPhotos)
                  }
                  aria-label={lang === "id" ? "Foto berikutnya" : "Next photo"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#182021]/90 hover:bg-[#0C7B85] text-white border border-[#354345] transition-colors cursor-pointer"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Caption + Ordered Thumbnails (1 -> 2 -> 3 -> 4) */}
          <div className="px-4 py-3.5 border-t border-[#283335] bg-[#182021] space-y-3">
            <p className="text-xs sm:text-sm text-[#DCE5E6]">
              {activePhoto.caption[lang]}
            </p>
            {totalPhotos > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {room.photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`relative w-16 h-12 shrink-0 overflow-hidden border transition-colors cursor-pointer ${
                      idx === activeIdx
                        ? "border-[#2AA4B0] ring-1 ring-[#2AA4B0]"
                        : "border-[#354345] opacity-65 hover:opacity-100"
                    }`}
                    aria-label={`${copy.photoLabel[lang]} ${idx + 1}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt[lang]}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 bg-[#141A1B]/85 text-white text-[10px] tabular-nums px-1">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Room Details & Direct Booking */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between lg:max-h-[92vh] lg:overflow-y-auto bg-white">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C7B85]">
                  {HOTEL.name}
                </p>
                <h3
                  id="modal-room-title"
                  className="font-serif text-3xl font-semibold text-[#1B2223] mt-1"
                >
                  {room.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.closeModal[lang]}
                className="hidden lg:flex w-9 h-9 items-center justify-center border border-[#E2E8E7] hover:border-[#1B2223] text-[#1B2223] transition-colors cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3.5 px-4 bg-[#F2F5F4] border border-[#E2E8E7]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[#1B2223] tabular-nums">
                  {formatRupiah(room.pricePerNight)}
                </span>
                <span className="text-xs text-[#738284]">
                  {copy.perNight[lang]}
                </span>
              </div>
              <p className="text-xs text-[#0C7B85] font-medium mt-1">
                {HOTEL.promoCallout[lang]}
              </p>
            </div>

            <p className="text-sm text-[#505D5E] leading-relaxed">
              {room.summary[lang]}
            </p>

            {/* Key Specs */}
            <div className="space-y-2.5 py-4 border-y border-[#E2E8E7] text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#738284]">
                  <RulerIcon className="w-4 h-4 text-[#0C7B85]" />
                  {copy.specSize[lang]}
                </span>
                <span className="font-medium text-[#1B2223]">
                  {room.dimensions} ({room.areaSqm} m²)
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#738284]">
                  <UsersIcon className="w-4 h-4 text-[#0C7B85]" />
                  {copy.specCapacity[lang]}
                </span>
                <span className="font-medium text-[#1B2223]">
                  {room.maxAdults} {adultLabel}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#738284] shrink-0">
                  <BedIcon className="w-4 h-4 text-[#0C7B85]" />
                  {copy.specBed[lang]}
                </span>
                <span className="font-medium text-[#1B2223] text-right">
                  {room.bedConfig[lang]}
                </span>
              </div>
            </div>

            {/* Full Amenity List */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#738284] mb-3">
                {lang === "id" ? "Fasilitas Kamar" : "Room Amenities"}
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs sm:text-sm text-[#1B2223]">
                {room.amenities.map((amenity) => (
                  <li key={amenity.id} className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-[#0C7B85] shrink-0" />
                    <span>{amenity[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E2E8E7] space-y-2.5">
            <a
              href={buildWhatsAppUrl(bookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-5 py-3.5 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{copy.bookRoom[lang]}</span>
            </a>
            <p className="text-center text-[11px] text-[#738284]">
              WhatsApp {HOTEL.whatsappDisplay} · Check-in {HOTEL.checkIn} /{" "}
              Check-out {HOTEL.checkOut}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
