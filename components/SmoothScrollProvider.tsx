"use client";

import { useEffect } from "react";

function hasScrollableParent(target: EventTarget | null, deltaY: number): boolean {
  let node = target instanceof HTMLElement ? target : null;
  while (node && node !== document.body && node !== document.documentElement) {
    if (
      node.getAttribute("role") === "dialog" ||
      node.getAttribute("aria-modal") === "true"
    ) {
      return true;
    }

    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const isScrollable = overflowY === "auto" || overflowY === "scroll";

    if (isScrollable && node.scrollHeight > node.clientHeight + 1) {
      const canScrollUp = node.scrollTop > 0;
      const canScrollDown =
        node.scrollTop + node.clientHeight < node.scrollHeight - 1;
      if ((deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown)) {
        return true;
      }
    }

    node = node.parentElement;
  }

  return false;
}

export function SmoothScrollProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId = 0;
    let isAnimating = false;
    let lastTime = 0;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = (now: number) => {
      const dt = Math.min(48, now - lastTime || 16.667);
      lastTime = now;

      const ease = 0.085;
      const factor = 1 - Math.pow(1 - ease, dt / 16.667);
      const maxScroll = getMaxScroll();

      targetY = Math.max(0, Math.min(maxScroll, targetY));
      currentY += (targetY - currentY) * factor;

      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        window.scrollTo({
          top: currentY,
          behavior: "instant" as ScrollBehavior,
        });
        isAnimating = false;
        rafId = 0;
        return;
      }

      window.scrollTo({
        top: currentY,
        behavior: "instant" as ScrollBehavior,
      });
      rafId = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        document.body.style.overflow === "hidden" ||
        hasScrollableParent(e.target, e.deltaY)
      ) {
        return;
      }

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 32;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      e.preventDefault();

      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      targetY = Math.max(0, Math.min(getMaxScroll(), targetY + delta));
      startAnimation();
    };

    const onScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const anchor = target?.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href === "#") {
        e.preventDefault();
        if (!isAnimating) {
          currentY = window.scrollY;
        }
        targetY = 0;
        startAnimation();
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      if (!isAnimating) {
        currentY = window.scrollY;
      }
      targetY = Math.max(
        0,
        Math.min(
          getMaxScroll(),
          el.getBoundingClientRect().top + window.scrollY - 76
        )
      );
      startAnimation();
      window.history.pushState(null, "", href);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
