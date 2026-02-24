import { useEffect } from "react";

export default function ScrollToTopButton() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("scrollToTopBtn");
      if (btn) {
        if (window.scrollY > 300) {
          btn.style.display = "flex";
        } else {
          btn.style.display = "none";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="scrollToTopBtn"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-brand text-white p-3 rounded-full shadow-lg hover:bg-brand-dark transition hidden items-center justify-center"
      aria-label="Scroll to top"
      style={{ display: "none" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
