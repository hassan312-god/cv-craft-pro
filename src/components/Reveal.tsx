import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Décalage en ms, pour animer une grille en cascade. */
  delay?: number;
  /** Direction de l'entrée. */
  from?: "bottom" | "left" | "scale";
  className?: string;
}

/**
 * Révèle son contenu quand il entre dans la fenêtre (une seule fois).
 *
 * L'animation est entièrement désactivée si l'utilisateur a demandé de réduire
 * les animations (`prefers-reduced-motion`).
 */
export const Reveal = ({ children, delay = 0, from = "bottom", className = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hidden =
    from === "left"
      ? "opacity-0 -translate-x-5"
      : from === "scale"
        ? "opacity-0 scale-95"
        : "opacity-0 translate-y-6";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
};
