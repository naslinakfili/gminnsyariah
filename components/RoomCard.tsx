"use client";

import React, { useState } from "react";
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
  ChevronLeftIcon,
  ChevronRightIcon,
  ImagesIcon,
  RulerIcon,
  UsersIcon,
  WhatsAppIcon,
} from "./Icons";

interface RoomCardProps {
  room: RoomType;
  lang: Lang;
  layout?: "grid" | "wide";
  onOpenGallery: (room: RoomType, initialIndex: number) => void;
}

export function RoomCard({
  room,
  lang,
  layout = "grid",
  onOpenGallery,
}: RoomCardProps) {
  // Always begin each room showcase on photo 1 (index 0)
  const [activeIdx, setActiveIdx] = useState(0);
  const copy = UI_COPY.rooms;
  const totalPhotos = room.photos.length;
  const activePhoto = room.photos[activeIdx] ?? room.photos[0];
  const isPortrait = activePhoto.orientation === "portrait";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % totalPhotos);
  };

  const bookingMessage =
    lang === "id"
      ? `Halo ${HOTEL.name}, saya ingin memesan kamar ${room.name} (${formatRupiah(
        room.pricePerNight
      )}/malam). Mohon info ketersediaan dan promo yang berlaku.`
      : `Hello ${HOTEL.name}, I would like to book the ${room.name} (${formatRupiah(
        room.pricePerNight
      )}/night). Could you share availability and any current promo rates?`;

  const promoMessage =
    lang === "id"
      ? `Halo ${HOTEL.name}, saya ingin menanyakan info promo harga untuk kamar ${room.name}.`
      : `Hello ${HOTEL.name}, I would like to inquire about promo rates for the ${room.name}.`;

  const adultLabel =
    room.maxAdults === 1 ? copy.adultSingular[lang] : copy.adultPlural[lang];

  const isWide = layout === "wide";

  return (
    <article
      className={`group h-full bg-white border border-[#E2E8E7] transition-colors duration-200 hover:border-[#C5D3D2] ${isWide ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-12" : "flex flex-col"
        }`}
    >
      {/* Photo Stage */}
      <div
        className={`relative overflow-hidden bg-[#182021] ${isWide
            ? "lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:min-h-[380px]"
            : "aspect-[4/3]"
          }`}
      >
        <button
          type="button"
          onClick={() => onOpenGallery(room, activeIdx)}
          className="relative w-full h-full block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7B85]"
          aria-label={`${room.name} — ${copy.viewPhotos[lang]}`}
        >
          <Image
            src={activePhoto.src}
            alt={activePhoto.alt[lang]}
            fill
            sizes={
              isWide
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            className={`transition-opacity duration-200 ${isPortrait ? "object-contain" : "object-cover"
              }`}
          />
        </button>

        {/* Top-left photo index indicator */}
        <div className="pointer-events-none absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="bg-[#182021]/85 text-white text-[11px] font-medium tracking-wider tabular-nums px-2.5 py-1">
            {activeIdx + 1} / {totalPhotos}
          </span>
          {room.featured && (
            <span className="bg-[#0C7B85] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1">
              {copy.featuredTag[lang]}
            </span>
          )}
        </div>

        {/* Prev / Next arrows when multiple photos exist */}
        {totalPhotos > 1 && (
          <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={lang === "id" ? "Foto sebelumnya" : "Previous photo"}
              className="w-8 h-8 flex items-center justify-center bg-white/95 hover:bg-[#0C7B85] text-[#1B2223] hover:text-white border border-[#E2E8E7] transition-colors cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={lang === "id" ? "Foto berikutnya" : "Next photo"}
              className="w-8 h-8 flex items-center justify-center bg-white/95 hover:bg-[#0C7B85] text-[#1B2223] hover:text-white border border-[#E2E8E7] transition-colors cursor-pointer"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top-right ordered photo jump strip (1..N) */}
        {totalPhotos > 1 && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-[#182021]/80 p-1">
            {room.photos.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`${copy.photoLabel[lang]} ${idx + 1}`}
                className={`w-5 h-5 text-[11px] font-medium tabular-nums transition-colors cursor-pointer ${idx === activeIdx
                    ? "bg-[#0C7B85] text-white"
                    : "text-[#D4DFE0] hover:text-white"
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Room Details */}
      <div
        className={`p-6 sm:p-8 flex flex-col justify-between gap-6 ${isWide ? "lg:col-span-6" : "flex-1"
          }`}
      >
        <div className="space-y-5">
          {/* Header & Pricing */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C7B85] mb-1">
                {room.dimensions} · {room.areaSqm} m²
              </p>
              <h3 className="font-serif text-2xl sm:text-[28px] font-semibold text-[#1B2223] leading-tight">
                {room.name}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline sm:justify-end gap-1">
                <span className="text-xl sm:text-2xl font-bold text-[#1B2223] tabular-nums">
                  {formatRupiah(room.pricePerNight)}
                </span>
                <span className="text-xs text-[#738284]">
                  {copy.perNight[lang]}
                </span>
              </div>
              <a
                href={buildWhatsAppUrl(promoMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium text-[#0C7B85] hover:text-[#096169] underline underline-offset-4 mt-1"
              >
                {copy.askPromo[lang]}
              </a>
            </div>
          </div>

          <p className="text-sm text-[#505D5E] leading-relaxed">
            {room.summary[lang]}
          </p>

          {/* Architectural hairline spec grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3.5 border-y border-[#E2E8E7] text-xs">
            <div className="flex items-center gap-2 text-[#1B2223]">
              <RulerIcon className="w-4 h-4 text-[#0C7B85] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#738284]">
                  {copy.specSize[lang]}
                </span>
                <span className="font-medium">
                  {room.dimensions} ({room.areaSqm} m²)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1B2223]">
              <UsersIcon className="w-4 h-4 text-[#0C7B85] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#738284]">
                  {copy.specCapacity[lang]}
                </span>
                <span className="font-medium">
                  {room.maxAdults} {adultLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1B2223]">
              <BedIcon className="w-4 h-4 text-[#0C7B85] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#738284]">
                  {copy.specBed[lang]}
                </span>
                <span className="font-medium">{room.bedConfig[lang]}</span>
              </div>
            </div>
          </div>

          {/* Room Amenities */}
          <ul className="flex flex-wrap gap-1.5" aria-label={room.name}>
            {room.amenities.map((item) => (
              <li
                key={item.id}
                className="border border-[#E2E8E7] bg-[#FAFAF7] px-2.5 py-1 text-xs text-[#1B2223]"
              >
                {item[lang]}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenGallery(room, activeIdx)}
            className="inline-flex items-center justify-center gap-2 border border-[#D4DFE0] hover:border-[#1B2223] text-[#1B2223] text-sm font-medium px-4 py-3 transition-colors cursor-pointer"
          >
            <ImagesIcon className="w-4 h-4 text-[#0C7B85]" />
            <span>{copy.viewPhotos[lang]}</span>
          </button>

          <a
            href={buildWhatsAppUrl(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-5 py-3 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{copy.bookRoom[lang]}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
