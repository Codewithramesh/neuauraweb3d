import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
export function useExperienceMotion() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".business-hero",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".hero-signal", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.25,
      });
      gsap.from(".graph-node", {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        stagger: 0.045,
        scrollTrigger: {
          trigger: ".graph-layout",
          start: "top 78%",
          once: true,
        },
      });
      gsap.from(".reveal-copy > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".brand-reveal",
          start: "top 55%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, [reduce]);
}
