import React from "react";
import Background from "../assets/Thumbnail.png";

export default function Hero() {
  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden my-4 sm:my-6 px-4 sm:px-0">
      <div
        className="bg-cover bg-center aspect-[16/9]"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      ></div>
    </div>
  );
}
