import React from "react";
import Image from "next/image";
import localFont from "next/font/local";

const hertica = localFont({
  src: "../app/fonts/hertica.ttf",
  // weight: "100 900",
});

export default function Hero() {
  return (
    <>
      <section className="hero_grid">
        <div className="flex justify-center items-center md:grid md:grid-cols-5 gap-4 my-4 md:my-8 lg:my-14">
          <h1
            className={`text-black col-start-3 col-end-6 ${hertica.className} clamp-text`}
          >
            Slay & Sparkle
          </h1>
        </div>
        {/* <div className="grid grid-cols-3 gap-4 mb-20">
          <h1 className=" text-black font-mono">006</h1>
          <h1 className=" text-black font-mono">Identity design</h1>
          <h1 className=" text-gray-300 font-mono">info</h1>
        </div> */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 bg-[url('/lynx.jpg')] bg-cover bg-top h-[100vh]"></div>
          <div className="flex flex-col gap-5 md:gap-0 md:justify-between px-3 md:px-0">
            <p className="font-mono">
              Elevate your look with expert makeup artistry and breathtaking braided styles. Whether you crave bold glamour or elegant charm, we transform your vision into reality—because you deserve to shine!
            </p>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-gray-400 font-bold">Services</h3>
              <ul className="font-mono">
                <li>Braids</li>
                <li>Makeup</li>
                <li>Nails</li>
                <li>Pedicure/manicure</li>
                <li>Lash extensions</li>
                <li>Ombre brows</li>
                <li>Wigs/installations</li>
                <li>Facial treatment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
