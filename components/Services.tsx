import React from "react";
import localFont from "next/font/local";

const kringe = localFont({
  src: "../app/fonts/kringe.ttf",
});

const hertica = localFont({
  src: "../app/fonts/hertica.ttf",
});

export default function Services() {
  return (
    <>
      <section className="hero_grid mt-36 ">
        <div className={`mb-36 clamp-text ${hertica.className} px-5`}>
          <h1 className=" text-black">006</h1>
          <h1 className=" text-black">Identity design</h1>
          <h1 className=" text-gray-300">info</h1>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <div className="flex justify-center items-center col-start-1 col-end-4 row-start-1 row-end-2 bg-[url('/lynxxx.JPG')] bg-cover bg-top h-[100vh]">
            <button className={`text-white ${kringe.className} clamp-text`}>
              Book Now
            </button>
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:justify-between px-3 md:px-0">
            <h3 className="text-2xl text-gray-400 font-bold">Contact</h3>
            <div className="flex flex-col gap-4 font-mono">
              <p className="font-mono">
                Ready to slay your next event or just treat yourself? Reach
                out—we&apos;d love to bring your beauty vision to life.
              </p>
              <p>📍 Visit Us: [Your Studio Address]</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
