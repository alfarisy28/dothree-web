"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  // ================= CLIENT =================
  const clients = [
    "axiata.png","ogilvy.png","okbank.png","ciputra.png","askrindo.png","kliring.png",
    "idx.png","jamkrindo.png","jasindo.png","valdo.png","yazaki.png","pacific.png",
    "aditama.png","chailease.png","kantar.png","nissin.png","sgi.png","sinarmas.png",
    "tunaikita.png","weblab.png","shimizu.png"
  ];

  const perPage = 6;

  const groupedClients: string[][] = [];
  for (let i = 0; i < clients.length; i += perPage) {
    groupedClients.push(clients.slice(i, i + perPage));
  }

  // ================= STATE =================
  const [active, setActive] = useState(0);
const [isPaused, setIsPaused] = useState(false);


 // ================= SWIPE =================
 const startX = useRef(0);

const handleTouchStart = (e: any) => {
  console.log("SWIPE JALAN");
  startX.current = e.touches[0].clientX;
};


 const moveX = useRef(0);
 const handleTouchMove = (e: any) => {
  moveX.current = e.touches[0].clientX;
};

 const handleTouchEnd = () => {
  const diff = startX.current - moveX.current;

  if (Math.abs(diff) < 30) return;

  if (diff > 0) {
    setActive((prev) =>
      prev === groupedClients.length - 1 ? 0 : prev + 1
    );
  } else {
    setActive((prev) =>
      prev === 0 ? groupedClients.length - 1 : prev - 1
    );
  }
};


  // ================= AUTOPLAY =================
 useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setActive((prev) =>
      prev === groupedClients.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, [isPaused, groupedClients.length]);

 
  // ================= MENU =================
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "auto";
  }, [menu]);

  return (
    <main className="pt-24">

      {/* NAVBAR */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur shadow z-50 flex justify-between px-6 py-4">
        <div className="font-bold text-blue-900">DOTHREE</div>

        <div className="hidden md:flex gap-8">
          <a href="#home">Home</a>
          <a href="#clients">Clients</a>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenu(true)}>
          ☰
        </button>
      </nav>

      {/* OVERLAY */}
      {menu && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden pointer-events-auto"
    onClick={() => setMenu(false)}
  />
)}

      {/* MENU MOBILE */}
     <div
  className={`
    fixed top-0 right-0 h-full w-64 bg-white z-50
    transform transition-transform duration-300
    ${menu ? "translate-x-0" : "translate-x-full"}
    md:hidden
  `}
  style={{ pointerEvents: menu ? "auto" : "none" }}
  
>

        <div className="p-6 flex flex-col gap-6 mt-10">
          <div onClick={() => setMenu(false)} className="text-right cursor-pointer">✕</div>

          <a href="#home" onClick={()=>setMenu(false)}>Home</a>
          <a href="#clients" onClick={()=>setMenu(false)}>Clients</a>
        </div>
      </div>

      {/* HERO */}
       <section id="home" className="bg-blue-900 text-white text-center pt-28 pb-20 px-4">
        <div>
          <h1 className="text-4xl font-bold">DOTHREE</h1>
          <p>Trusted IT Partner</p>
        </div>
      </section>
      
<section id="clients" className="py-16 text-center">
      {/* CLIENT SLIDER */}
      <div className="flex justify-center">
  <div className="w-full max-w-4xl overflow-hidden relative z-50">

    <div
  className="flex transition-transform duration-500 ease-in-out will-change-transform"
  style={{
    transform: `translate3d(-${active * 100}%, 0, 0)`,
    touchAction: "pan-y",
  }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
      {groupedClients.map((group, i) => (
        <div key={i} className="min-w-full flex justify-center">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {group.map((client, j) => (
              <div
                key={j}
                className="w-[150px] h-[100px] flex items-center justify-center bg-white shadow rounded"
              >
                <Image
                  src={`/clients/${client}`}
                  alt={client}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>

  </div>
</div>

        {/* DOT */}
        <div className="flex justify-center mt-6 gap-2">
  {groupedClients.map((_, i) => (
    <div
      key={i}
      onClick={() => setActive(i)}
      className={`h-2 rounded-full cursor-pointer ${
        active === i ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
      }`}
    />
  ))}
</div>
      </section>

    </main>
  );
}