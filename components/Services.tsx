import React from "react";
import ParallaxText from "./ParallaxText";
import localFont from "next/font/local";

const hertica = localFont({
  src: "../app/fonts/hertica.ttf",
  // weight: "100 900",
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
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 bg-[url('/lynxxx.JPG')] bg-cover bg-top h-[100vh]"></div>
          <div className="flex flex-col gap-5 md:gap-0 md:justify-between px-3 md:px-0">
            {/* <div className="flex flex-col gap-2"> */}
            <h3 className="text-2xl text-gray-400 font-bold">Contact</h3>
            {/* </div> */}

            <p className="font-mono">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              error similique sunt fugit architecto, aut quia deleniti eos odio
              laborum voluptatibus quis impedit explicabo esse modi nesciunt
              facilis cupiditate dignissimos?
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
