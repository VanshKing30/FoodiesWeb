import React, { useState, useEffect } from "react";
import "./FloatBtn.css";

const FloatBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="scrollButton"
      onClick={scrollToTop}
      style={{ display: visible ? "flex" : "none" }}
    >
      &#9650;
    </button>
  );
};

export default FloatBtn;
