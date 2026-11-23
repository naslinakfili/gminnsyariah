"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  GENERAL_FACILITIES,
  GUEST_REVIEWS,
  GeneralFacility,
  HOTEL,
  LANDMARKS,
  Lang,
  ROOMS,
  RoomCategory,
  RoomType,
  UI_COPY,
  buildWhatsAppUrl,
  formatRupiah,
} from "@/lib/hotel-data";
import { GmInnLogo } from "./GmInnLogo";
import {
  BreakfastIcon,
  CarIcon,
  ClockIcon,
  CloseIcon,
  CoffeeIcon,
  ExternalLinkIcon,
  FamilyIcon,
  MapPinIcon,
  MenuIcon,
  NoSmokingIcon,
  SnowflakeIcon,
  StarIcon,
  WhatsAppIcon,
  WifiIcon,
} from "./Icons";
import { RoomCard } from "./RoomCard";
import { RoomGalleryModal } from "./RoomGalleryModal";
import { ScrollReveal } from "./ScrollReveal";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderFacilityIcon(key: GeneralFacility["key"]) {
  const iconClass = "w-5 h-5 text-[#0C7B85]";
  switch (key) {
    case "breakfast":
      return <BreakfastIcon className={iconClass} />;
    case "wifi":
      return <WifiIcon className={iconClass} />;
    case "parking":
      return <CarIcon className={iconClass} />;
    case "ac":
      return <SnowflakeIcon className={iconClass} />;
    case "no-smoking":
      return <NoSmokingIcon className={iconClass} />;
    case "family":
      return <FamilyIcon className={iconClass} />;
  }
}

export function HotelPageClient() {
  const [lang, setLang] = useState<Lang>("id");
  const [filter, setFilter] = useState<"all" | RoomCategory>("all");
  const [modalState, setModalState] = useState<{
    room: RoomType;
    index: number;
  } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize date inputs post-mount inside an animation frame so Next.js 16
  // Cache Components static prerendering never hits current-time evaluation.
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("suite-room");
  const [guests, setGuests] = useState<number>(2);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      setCheckIn(formatLocalDate(tomorrow));
      setCheckOut(formatLocalDate(dayAfter));
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 32);
    const frameId = requestAnimationFrame(syncScroll);
    window.addEventListener("scroll", syncScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const isHeaderSolid = scrolled || mobileMenuOpen;

  const filteredRooms =
    filter === "all"
      ? ROOMS
      : ROOMS.filter((room) => room.category === filter);

  const selectedRoom =
    ROOMS.find((room) => room.id === selectedRoomId) ?? ROOMS[0];

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (value && checkOut && value >= checkOut) {
      const nextDay = new Date(`${value}T00:00:00`);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatLocalDate(nextDay));
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkInDisplay = checkIn || (lang === "id" ? "Fleksibel" : "Flexible");
    const checkOutDisplay =
      checkOut || (lang === "id" ? "Fleksibel" : "Flexible");

    const message =
      lang === "id"
        ? `Halo ${HOTEL.name}, saya ingin menanyakan ketersediaan kamar serta info promo harga:\n- Tipe Kamar: ${selectedRoom.name} (${formatRupiah(
            selectedRoom.pricePerNight
          )}/malam)\n- Check-in: ${checkInDisplay}\n- Check-out: ${checkOutDisplay}\n- Jumlah Tamu: ${guests} orang\nTerima kasih.`
        : `Hello ${HOTEL.name}, I would like to check room availability and current promo rates:\n- Room Type: ${selectedRoom.name} (${formatRupiah(
            selectedRoom.pricePerNight
          )}/night)\n- Check-in: ${checkInDisplay}\n- Check-out: ${checkOutDisplay}\n- Guests: ${guests} guest(s)\nThank you.`;

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const generalWhatsAppUrl = buildWhatsAppUrl(
    lang === "id"
      ? `Halo ${HOTEL.name}, saya ingin menanyakan ketersediaan kamar dan info promo harga.`
      : `Hello ${HOTEL.name}, I would like to inquire about room availability and current promo rates.`
  );

  const rooftopWhatsAppUrl = buildWhatsAppUrl(
    lang === "id"
      ? `Halo ${HOTEL.name}, saya ingin menanyakan jam buka dan menu di Rooftop Coffee & Food.`
      : `Hello ${HOTEL.name}, I would like to ask about Rooftop Coffee & Food opening hours and menu.`
  );

  const navItems = [
    { href: "#kamar", label: UI_COPY.nav.rooms[lang] },
    { href: "#rooftop", label: UI_COPY.nav.rooftop[lang] },
    { href: "#fasilitas", label: UI_COPY.nav.facilities[lang] },
    { href: "#lokasi", label: UI_COPY.nav.location[lang] },
    { href: "#ulasan", label: UI_COPY.nav.reviews[lang] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1B2223]">
      <SmoothScrollProvider />
      {/* Fixed Architectural Header (transparent over hero at top, solid on scroll/menu) */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isHeaderSolid
            ? "bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E2E8E7]"
            : "bg-gradient-to-b from-[#0C1516]/80 via-[#0C1516]/35 to-transparent border-b border-white/15"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <a href="#" className="shrink-0" aria-label={HOTEL.name}>
            <GmInnLogo variant={isHeaderSolid ? "dark" : "light"} />
          </a>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center gap-7 text-sm font-medium transition-colors ${
              isHeaderSolid ? "text-[#505D5E]" : "text-white/90"
            }`}
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 ${
                  isHeaderSolid ? "hover:text-[#0C7B85]" : "hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switch & Direct WhatsApp */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`inline-flex border p-0.5 text-xs font-semibold transition-colors ${
                isHeaderSolid
                  ? "border-[#D4DFE0] bg-white"
                  : "border-white/30 bg-[#101A1B]/45 backdrop-blur-xs"
              }`}
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === "id"
                    ? isHeaderSolid
                      ? "bg-[#1B2223] text-white"
                      : "bg-white text-[#1B2223]"
                    : isHeaderSolid
                      ? "text-[#505D5E] hover:text-[#1B2223]"
                      : "text-white/85 hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === "en"
                    ? isHeaderSolid
                      ? "bg-[#1B2223] text-white"
                      : "bg-white text-[#1B2223]"
                    : isHeaderSolid
                      ? "text-[#505D5E] hover:text-[#1B2223]"
                      : "text-white/85 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0C7B85] hover:bg-[#096169] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{UI_COPY.nav.bookNow[lang]}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`lg:hidden w-10 h-10 inline-flex items-center justify-center border transition-colors cursor-pointer ${
                isHeaderSolid
                  ? "border-[#E2E8E7] bg-white text-[#1B2223]"
                  : "border-white/30 bg-[#101A1B]/45 backdrop-blur-xs text-white"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8E7] bg-white px-4 py-5 space-y-4">
            <nav className="flex flex-col divide-y divide-[#E2E8E7]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm font-medium text-[#1B2223] hover:text-[#0C7B85]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-4 py-3"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{UI_COPY.hero.ctaPrimary[lang]}</span>
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section: Full-Bleed Architectural Background + Centered Editorial Copy */}
        <section className="relative bg-[#FAFAF7]">
          <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#121C1D]">
            <Image
              src={HOTEL.heroImage.src}
              alt={HOTEL.heroImage.alt[lang]}
              fill
              preload
              sizes="100vw"
              className="object-cover object-[center_42%]"
            />

            {/* Readability Overlays */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#0D1718]/45"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#0B1415]/75 via-[#0E1819]/40 to-[#0B1415]/80"
            />

            {/* Centered Hero Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 text-center space-y-5 sm:space-y-6">
              <ScrollReveal delay={0} distance={16} duration={700}>
                <div className="inline-flex items-center justify-center gap-2 border-b border-[#2AA4B0] pb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8AE3EB]">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>{UI_COPY.hero.eyebrow[lang]}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} distance={20} duration={750}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-semibold text-white leading-[1.08] tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
                  {UI_COPY.hero.title[lang]}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200} distance={20} duration={750}>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {UI_COPY.hero.subtitle[lang]}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section
          id="kamar"
          className="scroll-mt-24 py-16 sm:py-20 bg-[#F2F5F4] border-y border-[#E2E8E7]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-2xl space-y-3 mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0C7B85]">
                  {UI_COPY.rooms.eyebrow[lang]}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1B2223]">
                  {UI_COPY.rooms.heading[lang]}
                </h2>
                <p className="text-sm sm:text-base text-[#505D5E] leading-relaxed">
                  {UI_COPY.rooms.lead[lang]}
                </p>
              </div>
            </ScrollReveal>

            {/* Room Category Filter */}
            <ScrollReveal delay={90}>
              <div
                className="flex flex-wrap gap-2 mb-8"
                role="tablist"
                aria-label={UI_COPY.rooms.eyebrow[lang]}
              >
                {(
                  [
                    { id: "all", label: UI_COPY.rooms.filterAll[lang] },
                    { id: "solo", label: UI_COPY.rooms.filterSolo[lang] },
                    { id: "couple", label: UI_COPY.rooms.filterCouple[lang] },
                    { id: "family", label: UI_COPY.rooms.filterFamily[lang] },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                      filter === tab.id
                        ? "bg-[#1B2223] border-[#1B2223] text-white"
                        : "bg-white border-[#E2E8E7] text-[#505D5E] hover:text-[#1B2223] hover:border-[#C5D3D2]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Balanced Room Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredRooms.map((room, index) => {
                const useWideLayout =
                  filteredRooms.length === 1 ||
                  (filteredRooms.length % 2 === 1 &&
                    index === filteredRooms.length - 1);

                return (
                  <ScrollReveal
                    key={`${filter}-${room.id}`}
                    delay={(index % 2) * 110}
                    className={useWideLayout ? "lg:col-span-2" : "h-full"}
                  >
                    <RoomCard
                      room={room}
                      lang={lang}
                      layout={useWideLayout ? "wide" : "grid"}
                      onOpenGallery={(selected, photoIdx) =>
                        setModalState({ room: selected, index: photoIdx })
                      }
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Rooftop Coffee & Food Section */}
        <section
          id="rooftop"
          className="scroll-mt-24 py-16 sm:py-22 bg-[#182021] text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2AA4B0]">
                <CoffeeIcon className="w-4 h-4" />
                <span>{UI_COPY.rooftop.eyebrow[lang]}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight">
                {UI_COPY.rooftop.heading[lang]}
              </h2>

              <p className="text-sm sm:text-base text-[#C7D4D6] leading-relaxed">
                {UI_COPY.rooftop.lead[lang]}
              </p>

              <div className="divide-y divide-[#2B3739] border-y border-[#2B3739]">
                {UI_COPY.rooftop.highlights.map((item) => (
                  <div key={item.title.id} className="py-4">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A5B6B8] mt-1 leading-relaxed">
                      {item.detail[lang]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={rooftopWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-6 py-3.5 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{UI_COPY.rooftop.cta[lang]}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Rooftop Showcase Image (supports instant swap via HOTEL.rooftopImage) */}
            <ScrollReveal delay={140} className="lg:col-span-6">
              <div className="border border-[#2E3A3C] bg-[#121819] p-2.5">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121819]">
                  <Image
                    src={HOTEL.rooftopImage ?? HOTEL.heroImage.src}
                    alt={
                      HOTEL.rooftopImage
                        ? UI_COPY.rooftop.heading[lang]
                        : HOTEL.heroImage.alt[lang]
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={
                      HOTEL.rooftopImage
                        ? "object-cover"
                        : "object-cover object-[42%_85%]"
                    }
                  />
                </div>
                <p className="text-xs text-[#A5B6B8] px-1 pt-3 pb-1 leading-relaxed">
                  {UI_COPY.rooftop.imageCaption[lang]}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* General Facilities & Stay Hours */}
        <section id="fasilitas" className="scroll-mt-24 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-2xl space-y-3 mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0C7B85]">
                  {UI_COPY.facilities.eyebrow[lang]}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1B2223]">
                  {UI_COPY.facilities.heading[lang]}
                </h2>
              </div>
            </ScrollReveal>

            {/* Architectural hairline grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E2E8E7]">
              {GENERAL_FACILITIES.map((facility, index) => (
                <ScrollReveal
                  key={facility.key}
                  delay={index * 75}
                  className="bg-white border-r border-b border-[#E2E8E7] p-6 sm:p-7 space-y-3"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E6F3F4]">
                    {renderFacilityIcon(facility.key)}
                  </div>
                  <h3 className="text-base font-semibold text-[#1B2223]">
                    {facility.title[lang]}
                  </h3>
                  <p className="text-sm text-[#505D5E] leading-relaxed">
                    {facility.detail[lang]}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Check-in / Check-out strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScrollReveal delay={0}>
                <div className="bg-white border border-[#E2E8E7] p-5 flex items-start gap-4 h-full">
                  <ClockIcon className="w-5 h-5 text-[#0C7B85] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#738284]">
                      {UI_COPY.facilities.checkInLabel[lang]}
                    </p>
                    <p className="text-lg font-bold text-[#1B2223] tabular-nums mt-0.5">
                      {HOTEL.checkIn}
                    </p>
                    <p className="text-xs text-[#505D5E] mt-1">
                      {UI_COPY.facilities.checkInNote[lang]}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={110}>
                <div className="bg-white border border-[#E2E8E7] p-5 flex items-start gap-4 h-full">
                  <ClockIcon className="w-5 h-5 text-[#0C7B85] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#738284]">
                      {UI_COPY.facilities.checkOutLabel[lang]}
                    </p>
                    <p className="text-lg font-bold text-[#1B2223] tabular-nums mt-0.5">
                      {HOTEL.checkOut}
                    </p>
                    <p className="text-xs text-[#505D5E] mt-1">
                      {UI_COPY.facilities.checkOutNote[lang]}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Location & Landmarks Section */}
        <section
          id="lokasi"
          className="scroll-mt-24 py-16 sm:py-20 bg-[#F2F5F4] border-y border-[#E2E8E7]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0C7B85]">
                  {UI_COPY.location.eyebrow[lang]}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1B2223]">
                  {UI_COPY.location.heading[lang]}
                </h2>
                <p className="text-sm sm:text-base font-medium text-[#1B2223]">
                  {HOTEL.address}
                </p>
              </div>

              <div className="divide-y divide-[#D4DFE0] border-y border-[#D4DFE0]">
                {LANDMARKS.map((item) => (
                  <div key={item.name.id} className="py-4 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-[#1B2223]">
                        {item.name[lang]}
                      </h3>
                      <span className="text-xs font-semibold text-[#0C7B85] tabular-nums">
                        {item.distance[lang]}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#505D5E]">
                      {item.note[lang]}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#505D5E] leading-relaxed">
                {UI_COPY.location.culinaryNote[lang]}
              </p>

              <a
                href={HOTEL.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1B2223] hover:bg-[#0C7B85] text-white text-sm font-semibold px-5 py-3 transition-colors"
              >
                <MapPinIcon className="w-4 h-4" />
                <span>{UI_COPY.location.openMaps[lang]}</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            </ScrollReveal>

            <ScrollReveal delay={140} className="lg:col-span-6">
              <div className="bg-white border border-[#E2E8E7] p-2">
                <iframe
                  title={HOTEL.name}
                  src={HOTEL.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[360px] sm:h-[440px] border-0"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#505D5E] mt-2.5 px-1">
                <span>Peunayong, Kuta Alam, Banda Aceh</span>
                <a
                  href={HOTEL.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0C7B85] hover:underline font-medium"
                >
                  {UI_COPY.location.openMaps[lang]}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Guest Reviews Section */}
        <section id="ulasan" className="scroll-mt-24 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0C7B85]">
                    {UI_COPY.reviews.eyebrow[lang]}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1B2223]">
                    {UI_COPY.reviews.heading[lang]}
                  </h2>
                  <p className="text-sm sm:text-base text-[#505D5E]">
                    {UI_COPY.reviews.subline[lang]}
                  </p>
                </div>

                <a
                  href={HOTEL.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#D4DFE0] hover:border-[#0C7B85] bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1B2223] transition-colors self-start md:self-auto"
                >
                  <span>{UI_COPY.reviews.viewGoogle[lang]}</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5 text-[#0C7B85]" />
                </a>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUEST_REVIEWS.map((review, index) => (
                <ScrollReveal
                  key={review.id}
                  delay={index * 110}
                  className="h-full"
                >
                  <blockquote className="h-full bg-white border border-[#E2E8E7] p-7 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div
                        className="flex items-center gap-1 text-[#B88A34]"
                        aria-label={`${review.rating} / 5`}
                      >
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <StarIcon key={idx} className="w-4 h-4" />
                        ))}
                        <span className="ml-2 text-xs font-semibold text-[#505D5E] tabular-nums">
                          5/5 · Google
                        </span>
                      </div>

                      <p className="text-sm text-[#1B2223] leading-relaxed">
                        &ldquo;{review.quote[lang]}&rdquo;
                      </p>
                    </div>

                    <footer className="pt-4 border-t border-[#E2E8E7]">
                      <p className="text-sm font-semibold text-[#1B2223]">
                        {review.author}
                      </p>
                      {review.badge && (
                        <p className="text-xs text-[#0C7B85] font-medium mt-0.5">
                          {review.badge}
                        </p>
                      )}
                      {lang === "en" && (
                        <p className="text-[11px] text-[#738284] mt-1">
                          {UI_COPY.reviews.translatedNote.en}
                        </p>
                      )}
                    </footer>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Direct Booking CTA */}
        <section className="py-14 sm:py-16 bg-[#E6F3F4] border-t border-[#D4DFE0]">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0C7B85]">
                {UI_COPY.closing.eyebrow[lang]}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1B2223]">
                {UI_COPY.closing.heading[lang]}
              </h2>
              <p className="text-sm sm:text-base text-[#505D5E] max-w-2xl mx-auto leading-relaxed">
                {UI_COPY.closing.subtitle[lang]}
              </p>
              <div className="pt-2">
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-7 py-4 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{UI_COPY.closing.ctaPrimary[lang]}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Direct WhatsApp Inquiry Bar */}
          <ScrollReveal delay={130}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white border border-[#D4DFE0] shadow-[0_14px_40px_rgba(17,28,29,0.06)] p-5 sm:p-6 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E2E8E7]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1B2223]">
                  {UI_COPY.bookingBar.title[lang]}
                </h2>
                <span className="text-xs text-[#738284]">
                  {UI_COPY.bookingBar.helper[lang]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                <div className="lg:col-span-2">
                  <label
                    htmlFor="booking-checkin"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#505D5E] mb-1.5"
                  >
                    {UI_COPY.bookingBar.checkIn[lang]}
                  </label>
                  <input
                    id="booking-checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="w-full h-11 px-3 border border-[#D4DFE0] bg-[#FAFAF7] text-sm text-[#1B2223] focus:outline-none focus:border-[#0C7B85]"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label
                    htmlFor="booking-checkout"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#505D5E] mb-1.5"
                  >
                    {UI_COPY.bookingBar.checkOut[lang]}
                  </label>
                  <input
                    id="booking-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-11 px-3 border border-[#D4DFE0] bg-[#FAFAF7] text-sm text-[#1B2223] focus:outline-none focus:border-[#0C7B85]"
                  />
                </div>

                <div className="lg:col-span-3">
                  <label
                    htmlFor="booking-room"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#505D5E] mb-1.5"
                  >
                    {UI_COPY.bookingBar.roomType[lang]}
                  </label>
                  <select
                    id="booking-room"
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full h-11 px-3 border border-[#D4DFE0] bg-[#FAFAF7] text-sm text-[#1B2223] focus:outline-none focus:border-[#0C7B85]"
                  >
                    {ROOMS.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} — {formatRupiah(room.pricePerNight)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label
                    htmlFor="booking-guests"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#505D5E] mb-1.5"
                  >
                    {UI_COPY.bookingBar.guests[lang]}
                  </label>
                  <select
                    id="booking-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-11 px-3 border border-[#D4DFE0] bg-[#FAFAF7] text-sm text-[#1B2223] focus:outline-none focus:border-[#0C7B85]"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {UI_COPY.bookingBar.guestUnit[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <button
                    type="submit"
                    className="w-full h-11 inline-flex items-center justify-center gap-2 bg-[#0C7B85] hover:bg-[#096169] text-white text-sm font-semibold px-4 transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>{UI_COPY.bookingBar.submit[lang]}</span>
                  </button>
                </div>
              </div>
            </form>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Architectural Footer */}
      <footer className="bg-[#182021] text-white border-t border-[#283335]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <GmInnLogo variant="light" />
            <p className="text-sm text-[#A5B6B8] max-w-sm leading-relaxed">
              {UI_COPY.footer.tagline[lang]}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2AA4B0]">
              {UI_COPY.footer.navHeading[lang]}
            </p>
            <ul className="space-y-2 text-sm text-[#C7D4D6]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm text-[#C7D4D6]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2AA4B0]">
              {UI_COPY.footer.contactHeading[lang]}
            </p>
            <p className="leading-relaxed">{HOTEL.address}</p>
            <p className="text-xs text-[#A5B6B8]">
              {UI_COPY.footer.hoursLabel[lang]}
            </p>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-[#2AA4B0] transition-colors pt-1"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#2AA4B0]" />
              <span>WhatsApp {HOTEL.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[#283335]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8FA2A4]">
            <span>© 2026 {HOTEL.name}, Banda Aceh</span>
            <span>{HOTEL.promoCallout[lang]}</span>
          </div>
        </div>
      </footer>

      {/* Floating Circular WhatsApp Button */}
      <a
        href={generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={UI_COPY.hero.ctaPrimary[lang]}
        title={UI_COPY.hero.ctaPrimary[lang]}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] inline-flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* Room Gallery & Specification Modal */}
      {modalState && (
        <RoomGalleryModal
          room={modalState.room}
          initialIndex={modalState.index}
          lang={lang}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}
