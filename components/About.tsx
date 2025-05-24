import React from "react";

export default function About() {
  return (
    <>
      <section id="about" className="hero_grid mt-36 ">
        <div className="flex justify-around items-center gap-4 mb-36">
          <h1 className=" text-black font-mono">006</h1>
          <h1 className=" text-black font-mono">Identity design</h1>
          <h1 className=" text-gray-300 font-mono">info</h1>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <div className="flex justify-center items-center col-start-2 col-end-5 row-start-1 row-end-2 bg-[url('/lynxx.jpeg')] bg-cover bg-top h-[100vh]"></div>
          <div className="flex flex-col gap-5 md:gap-0 md:justify-between px-3 md:px-0">
            <h3 className="text-2xl text-gray-400 font-bold">Why Choose Us?</h3>

            <div className="flex flex-col gap-4 font-mono">
              <div>
                <span className="font-bold">Expertise</span> – Years of
                experience in diverse styles, from natural to avant-garde.
              </div>
              <div>
                <span className="font-bold">Quality Products</span> – Premium,
                skin- and hair-friendly products for lasting wear.
              </div>
              <div>
                <span className="font-bold">Personalized Touch</span> – Your
                vision, our craft—tailored just for you.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
