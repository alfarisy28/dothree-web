"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ArrowUp } from "lucide-react";


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

const [showTop, setShowTop] = useState(false);


const [searchOpen, setSearchOpen] = useState(false);

const handleNavClick = (id: string) => {
  const currentHash = window.location.hash.replace("#", "");
  const el = document.getElementById(id);

  if (!el) return;

  if (currentHash === id) {
    // scroll ke atas dulu
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // 🔥 TAMBAHKAN DI SINI
      el.classList.add("ring-4", "ring-blue-300");

      setTimeout(() => {
        el.classList.remove("ring-4", "ring-blue-300");
      }, 400);

    }, 300);

  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  }
};


const [showNavbar, setShowNavbar] = useState(true);
const [lastScroll, setLastScroll] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // scroll ke bawah → hide
      setShowNavbar(false);
    } else {
      // scroll ke atas → show
      setShowNavbar(true);
    }

    setLastScroll(currentScroll);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScroll]);

const [search, setSearch] = useState("");

const handleSearch = (value: string) => {
  setSearch(value);

  const v = value.toLowerCase();

  if (v.includes("home") || v.includes("beranda")) {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }

  if (v.includes("about") || v.includes("tentang")) {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }

  if (v.includes("service") || v.includes("layanan")) {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  if (v.includes("client") || v.includes("klien")) {
    document.getElementById("clients")?.scrollIntoView({ behavior: "smooth" });
  }

  if (v.includes("contact") || v.includes("kontak")) {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }
};



 // ================= MENU =================
  const [menu, setMenu] = useState(false);

  // ================= LANGUAGE =================
  const [lang, setLang] = useState<"id" | "en">("id");

  // ================= DROPDOWN =================
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const clientRef = useRef<HTMLDivElement>(null);

 
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

useEffect(() => {
  const handleScroll = () => {
    setShowTop(window.scrollY > 400);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


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


 useEffect(() => {
  document.body.style.overflow = menu ? "hidden" : "auto";
}, [menu]);


  return (
    <main className="w-full">

      {/* NAVBAR */}
     {searchOpen && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24">

    <div className="bg-white text-black dark:text-white border-b border-gray-200">

    </div>

  </div>
)}

 <nav
  className={`fixed top-0 left-0 w-full z-50 
  bg-white
  transition-transform duration-500 ${
    showNavbar ? "translate-y-0 shadow-md" : "-translate-y-full"
  }`}
>
 <div className="flex items-center justify-between px-6 py-3">

  {/* LOGO */}
  <div
    onClick={() => handleNavClick("home")}
    className="font-bold text-blue-900 text-lg cursor-pointer"
  >
    DOTHREE
  </div>

  {/* MENU TENGAH */}
  <div className="hidden md:flex items-center gap-8 text-sm">

    <a onClick={() => handleNavClick("home")} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Beranda" : "Home"}
    </a>

    <a onClick={() => handleNavClick("about")} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Tentang" : "About"}
    </a>

    <span onClick={() => handleNavClick("services")} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Layanan" : "Services"} ▾
    </span>

    <a onClick={() => handleNavClick("clients")} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Klien" : "Clients"}
    </a>

    {/* ⚠️ PINDAHKAN KONTAK KE SINI */}
    <a onClick={() => handleNavClick("contact")} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Kontak" : "Contact"}
    </a>

  </div>

  {/* RIGHT */}
  <div className="hidden md:flex items-center gap-2">

  {/* EN */}
  <button
    onClick={() => setLang("en")}
    className={`px-2 py-1 text-sm border transition
      ${lang === "en"
        ? "bg-red-500 text-white border-red-500"
        : "bg-white text-black hover:bg-gray-100"}
    `}
  >
    EN
  </button>

  {/* ID */}
  <button
    onClick={() => setLang("id")}
    className={`px-2 py-1 text-sm border transition
      ${lang === "id"
        ? "bg-red-500 text-white border-red-500"
        : "bg-white text-black hover:bg-gray-100"}
    `}
  >
    ID
  </button>

</div>

  {/* MOBILE */}
  <button className="md:hidden text-2xl" onClick={() => setMenu(true)}>
    ☰
  </button>

</div>
</nav>


      {/* OVERLAY */}
      {menu && (
  <div
    className="fixed inset-0 bg-black/50 z-40"
    onClick={() => setMenu(false)}
  />
)}

      {/* MENU MOBILE */}
     <div
  className={`
    fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50
    transform transition-transform duration-300
    ${menu ? "translate-x-0" : "translate-x-full"}
  `}
>
  <div className="flex flex-col h-full p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
     <div
  onClick={() => {
  setMenu(false);
  document.getElementById("home")?.scrollIntoView({
    behavior: "smooth",
  });
}}
  className="font-bold text-blue-900 cursor-pointer active:scale-90 transition"
>
  DOTHREE
</div>
     <button
  onClick={() => setMenu(false)}
  className="transition active:scale-90"
>
  ✕
</button>
    </div>

    <hr className="mb-6"/>

    {/* MENU */}
   <div className="flex flex-col gap-5">

 <a
  onClick={() => {
    handleNavClick("home");
    setMenu(false);
  }}
  className="cursor-pointer transition active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Beranda" : "Home"}
  </a>

<a
  onClick={() => {
    handleNavClick("about");
    setMenu(false);
  }}
  className="cursor-pointer transition active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Tentang" : "About"}
  </a>

  <div
    className="flex justify-between cursor-pointer transition active:scale-95"
    onClick={() => {
  setOpenDropdown(openDropdown === "services" ? null : "services");

}}
  >
    <span>{lang === "id" ? "Layanan" : "Services"}</span>
    <span>▾</span>
  </div>

  <a
  onClick={() => {
    handleNavClick("clients");
    setMenu(false);
  }}
  className="cursor-pointer transition active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Klien" : "Clients"}
  </a>

<a
  onClick={() => {
    handleNavClick("contact");
    setMenu(false);
  }}
  className="cursor-pointer transition active:scale-95 hover:translate-x-1"
>
  {lang === "id" ? "Kontak" : "Contact"}
</a>

</div>

    {/* LANGUAGE */}
    <div className="mt-10">
      <p className="text-sm mb-2">PILIH BAHASA</p>

      <div className="flex gap-2">

  <button
    onClick={() => setLang("en")}
    className={`px-3 py-1 transition
      ${lang === "en"
        ? "bg-red-500 text-white"
        : "border"}
    `}
  >
    EN
  </button>

  <button
    onClick={() => setLang("id")}
    className={`px-3 py-1 transition
      ${lang === "id"
        ? "bg-red-500 text-white"
        : "border"}
    `}
  >
    ID
  </button>

</div>
    </div>

  </div>
</div>

   {/* HERO */}
<section
  id="home"
  className="w-full bg-blue-900 text-white text-center pt-24 md:pt-28 pb-20 px-4 md:px-10"
>
  <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
    DOTHREE
  </h1>
  <p className="mt-4 text-base md:text-lg opacity-90">
    Trusted IT Partner
  </p>
</section>


{/*ABOUT*/}
<section id="about" className="w-full">

  {/* TOP HERO ABOUT */}
  <div className="relative min-h-100 md:h-75 flex items-center justify-center text-center">

  

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/40 to-blue-900/40"></div>

  <div className="relative z-10 mt-10">
    <h2 className="text-4xl md:text-6xl font-extrabold text-black">
      About
    </h2>
    <h2 className="text-4xl md:text-6xl font-extrabold text-blue-700">
      Company
    </h2>
  </div>

</div>

  {/* CIRCLE IMAGE */}
  <div className="flex justify-center -mt-12 relative z-20">
    <img
      src="/about.jpg.png"
      className="w-28 h-28 md:w-40 md:h-40 rounded-full border-8 border-white object-cover shadow-2xl ring-4 ring-white"
    />
  </div>

  {/* BOTTOM BLUE SECTION */}
  <div className="bg-blue-900 text-white text-center py-20 px-4 md:px-10">

    <div className="max-w-4xl mx-auto text-center py-20 px-4">

      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        PT. DOTHREE SANTANA PRISMA
      </h3>

      <p className="text-sm md:text-base leading-relaxed opacity-90">
        PT. DOTHREE SANTANA PRISMA is a company engaged in professional
        information technology services and procurement of goods.
        Established in 2017 and headquartered in South Jakarta,
        the company is committed to delivering integrated solutions
        that support operational efficiency, system security,
        and business growth across various sectors.
      </p>

      <p className="text-sm md:text-base leading-relaxed opacity-90">
        By adopting a professional, structured, and customer-oriented
        approach, PT. DOTHREE SANTANA PRISMA provides IT solutions,
        system integration, cyber security services, managed services,
        as well as network construction and supporting installations.
      </p>

    </div>

  </div>

</section>

 {/* SERVICES */}
<section id="services" className="py-16 px-4 bg-gray-100 ">
  <h2 className="text-2xl font-bold mb-8">
    {lang === "id" ? "Layanan Kami" : "Our Services"}
  </h2>

  <div className="GRID grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div className="bg-white text-black p-6 rounded-xl shadow hover:shadow-xl ">
  IT Solution
</div>
    <div className="bg-white text-black p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">
      Cyber Security
    </div>
    <div className="bg-white text-black p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">
      Managed Services
    </div>
  </div>
</section>

   {/* CLIENT SLIDER */}
<section id="clients" className="w-full py-16 bg-gray-50">

  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
      {lang === "id" ? "Klien Kami" : "Our Clients"}
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

      {clients.map((client, i) => (
        <div
          key={i}
          className="bg-white text-black rounded-2xl p-5 flex items-center justify-center
          shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <Image
            src={`/clients/${client}`}
            alt={client}
            width={120}
            height={60}
            className="object-contain max-h-12.5 w-auto opacity-80 hover:opacity-100 transition"
          />
        </div>
      ))}

    </div>

  </div>
</section>

 {/* FOOTER */}
<footer className="bg-linear-to-r from-blue-900 to-blue-800 text-white py-6 px-4 md:px-10 border-t border-white/20">

  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

    <div className="flex items-start gap-3 text-sm md:text-base">
      <MapPin size={18} className="mt-1 shrink-0" />

      <div className="leading-relaxed">
        Jl. Perdana I No.10c, RT.7/RW.5, Petukangan Selatan,<br />
        Pesanggrahan, Jakarta Selatan 12270
      </div>
    </div>

    <div className="text-sm opacity-80">
      © DOTHREE 2026
    </div>

  </div>

</footer>


  {/* CONTACT */}
  <section id="contact" className="w-full scroll-mt-20">

  <div className="grid md:grid-cols-3 min-h-65 md:min-h-75">

    {/* KIRI */}
         <div className="md:col-span-1 bg-blue-900 text-white px-6 py-6 md:px-10 md:py-8 flex flex-col justify-center">

      <h2 className="text-xl font-semibold mb-4">
        {lang === "id" ? "Kontak Kami" : "Contact Us"}
      </h2>

      <div className="space-y-2 text-sm">

        {/* EMAIL */}
        <a
          href="mailto:fadli.hidayah@dothree.co.id"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <Mail size={16} />
          <span className="text-sm">fadli.hidayah@dothree.co.id</span>
        </a>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/6281212767722"
          target="_blank"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <Phone size={16} />
          <span className="text-sm">+62 812-1276-7722</span>
        </a>

        {/* MAPS */}
        <a
          href="https://maps.app.goo.gl/C7uEnmFcgEtyrxhy6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 hover:opacity-80 transition"
        >
          <MapPin size={16} className="mt-1" />
          <span className="text-sm leading-relaxed">
            PT DOTHREE SANTANA PRISMA<br />
            Jl. Perdana 1 No. 10c,<br />
            Jakarta Selatan
          </span>
        </a>

      </div>

    </div>

    {/* KANAN (MAP) */}
    <div className="md:col-span-2 h-65 md:h-75 shadow-lg">
      <iframe
  src="https://www.google.com/maps?q=PT+Dothree+Santana+Prisma+Jakarta&output=embed"
  className="w-full h-full border-0"
  loading="lazy"
></iframe>
    </div>

  </div>

</section>



{showTop && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="
      fixed bottom-4 right-4 
      bg-blue-900 text-white
      p-3 rounded-full
      shadow-xl
      hover:scale-110 hover:bg-blue-800
      transition-opacity duration-300
      animate-bounce
    "
  >
    <ArrowUp size={20} />
  </button>
)}

     
    </main>
  );
}
