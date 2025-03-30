import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = ({
  threshold = 1000,
  className = "",
  size = 30,
  color = "currentColor",
  strokeWidth = 3,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY <= threshold;
      console.log(
        "Scroll Y:",
        window.scrollY,
        "Threshold:",
        threshold,
        "Visible:",
        shouldBeVisible
      );
      setIsVisible(shouldBeVisible);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]); // Make sure threshold is in the dependency array

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.3s ease-in-out",
      }}
      className={`scroll-indicator ${className}`}
      onClick={() =>
        window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" })
      }
      aria-hidden={!isVisible}
      aria-label="Scroll down"
      role="button"
      tabIndex={isVisible ? 0 : -1}
    >
      <div className="scroll-indicator-button">
        <ChevronDown size={size} color={color} strokeWidth={strokeWidth} />
      </div>
    </div>
  );
};

export default ScrollIndicator;
