"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { CheckCircle } from "lucide-react";
import Animate from "./components/Animate";
import { i } from "framer-motion/client";
import { motion } from "framer-motion";


export default function Home() {

  // ================= CLIENT =================
  const clients = [
    "kemenhub.png","kemendik.png","kemenag.png","jamkrida.png","indotekno.png","boltz.png","airnav.png","axiata.png","ogilvy.png",
    "okbank.png","kliring.png","valdo.png","chailease.png","kantar.png","sgi.png","sinarmas.png",
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
const [visibleCards, setVisibleCards] = useState([false, false, false, false]);
const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));

        if (entry.isIntersecting) {
          setVisibleCards((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  cardRefs.current.forEach((el) => {
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

const [showTop, setShowTop] = useState(false);
const [showContact, setShowContact] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
const handleNavClick = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -90; // 🔥 sesuaikan tinggi navbar
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });

  // update URL hash
  window.history.pushState(null, "", `#${id}`);

  // highlight effect
  el.classList.add("ring-4", "ring-blue-300");

  setTimeout(() => {
    el.classList.remove("ring-4", "ring-blue-300");
  }, 500);
};
const sectionRef = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);
const coreRef = useRef<HTMLDivElement>(null);
const serviceRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));

        if (entry.isIntersecting) {
          setVisibleCards((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  cardRefs.current.forEach((el) => {
    if (el) observer.observe(el);
  });

  // 🔥 TAMBAHAN INI
  setTimeout(() => {
    setVisibleCards([true, true, true, true]);
  }, 300);

  return () => observer.disconnect();
}, []);

const [coreVisible, setCoreVisible] = useState(false);
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setCoreVisible(true);
      }
    },
    { threshold: 0.2 }
  );

  if (coreRef.current) observer.observe(coreRef.current);

  return () => observer.disconnect();
}, []);

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
    setOpenDropdown(null); // tutup dropdown saat scroll
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

const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const [activeSection, setActiveSection] = useState("home");
useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0.6, // 60% terlihat baru dianggap aktif
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuItems = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "services", label: "Layanan" },
  { id: "clients", label: "Klien" },
  { id: "contact", label: "Kontak" },
];

 // ================= MENU =================
  const [menu, setMenu] = useState(false);

  // ================= LANGUAGE =================
  const [lang, setLang] = useState<"id" | "en">("id");

  const t = {
  en: {
    // HERO
        heroBadge: "IT Solutions & Cyber Security",

    heroTagline: "Trusted IT & Procurement Partner for Secure and Integrated Solutions",

    // ABOUT
    aboutTitle1: "About Us",
    aboutTitle2: "PT. DOTHREE SANTANA PRISMA",

    aboutDesc1:     "PT. DOTHREE SANTANA PRISMA is a national private IT company established in 2017. The company focuses on IT infrastructure development and data security services in Indonesia.",

    aboutDesc2:     "The company consistently focuses on data security services for national and multinational companies, as well as government institutions and ministries.",
    aboutDesc3:     "Dothree has two main business sectors: IT Infrastructure Development and Data Security. The services offered include Infrastructure Services, Data Security, Application Security, and Network Security.",

    // VISION MISSION
    vision: "Vision",
    mission: "Mission",

    visionText:
      "To become a trusted IT company delivering secure and integrated solutions.",

    mission1: "Deliver reliable IT solutions",
    mission2: "Ensure system security",
    mission3: "Provide responsive support",

    // SERVICES
    servicesTitle: "OUR SERVICES",
    servicesDesc:
      "We deliver professional services designed to provide comprehensive IT and security solutions.",

    service1Title: "IT Solutions and System Integrations",
    service1Desc:
      "Providing integrated IT solutions to support efficient business operations.",

    service2Title: "Cyber and Security Solutions",
    service2Desc:
      "Protecting systems, networks, and data from digital threats.",
    focusDesc: "Main Focus : IT Infrastructure & Cyber Security",
    service3Title: "Managed Services",
    service3Desc:
      "Monitoring and maintaining system stability continuously.",

    service4Title: "Network Infrastructure",
    service4Desc:
      "Building and installing network infrastructure systems.",

    // SERVICES LIST
    it: "IT Solution",
    cyber: "Cyber Security",
    managed: "Managed Services",
    net: "Infrastructure Network",

    // DETAIL LIST
    infra: "Infrastructure Services",
    network: "Network Services",
    storage: "Data Storage",
    procurement: "Procurement",

    threat: "Threat Detection & Response",
    cloud: "Cloud Security",
    appsec: "Application Security",
    data: "Data Protection",
    identity: "Identity & Access",
    vapt: "VAPT (Vulnerability Assessment & Penetration Testing)",

    noc: "Network Operation Center",
    soc: "Security Operation Center",

    netInstall: "Network Installation",
    cctv: "CCTV Installation",
    gate: "Access Control",
    me: "Mechanical Electrical",
    cable: "Cable Management",

    // CORE VALUES
    coreTitle: "Core Values",
    coreDesc:
      "Our core values guide decisions, strengthen performance, and support long-term partnerships.",

    core1: "Professional Excellence",
    core1Desc:
      "We perform every task with competence, responsibility, and high ethical standards.",

    core2: "Integrity",
    core2Desc:
      "We uphold honesty, transparency, and compliance with regulations and standards.",

    core3: "Innovative",
    core3Desc:
      "We continuously develop adaptive and relevant solutions aligned with technological advancements.",

    core4: "Commitment",
    core4Desc:
      "We are committed to delivering high-quality services and achieving the best results for our clients.",
    
    // ADVANTAGE
    advantageTitle: "Our Advantage",
    adv1: "Experienced Team",
    adv2: "Security Focus",
    adv3: "Integrated Solutions",
    adv4: "Responsive Support",

    // COMMITMENT
    commitmentTitle: "Service Commitment",
    commitmentDesc:
      "We are committed to delivering high-quality IT services with professional standards.",

    commit1: "High-quality service",
    commit2: "System & data security",
    commit3: "Fast response support",
    commit4: "Professional & transparent",

    // PARTNERS
    partnersTitle: "Technology Partners",
    partnersDesc: "We collaborate with global trusted vendors",

    // CONTACT
    contact: "Contact Us",
    clients: "Our Clients",
    clientsDesc: "Trusted by government institutions, national and multinational companies"
    
  },

  id: {
    // HERO
    heroBadge: "Solusi IT & Keamanan Siber",
    heroTagline: "Mitra IT & Pengadaan Terpercaya untuk Solusi yang Aman dan Terintegrasi",
    
    // ABOUT
    aboutTitle1: "Tentang Kami",
    aboutTitle2: "PT. DOTHREE SANTANA PRISMA",

    aboutDesc1:     "PT. DOTHREE SANTANA PRISMA adalah perusahaan IT swasta nasional yang didirikan pada tahun 2017. Perusahaan ini berfokus pada pengembangan infrastruktur IT serta keamanan data di Indonesia.",
    aboutDesc2:     "PT. DOTHREE SANTANA PRISMA secara konsisten berfokus pada layanan keamanan data baik untuk perusahaan nasional maupun multinasional, serta kementerian dan lembaga.",
    aboutDesc3:     "Dothree memiliki dua sektor bisnis utama yaitu Pengembangan Infrastruktur IT dan Keamanan Data. Produk yang ditawarkan meliputi layanan Infrastruktur, Keamanan Data, Keamanan Aplikasi, dan Keamanan Jaringan.",

    // VISION MISSION
    vision: "Visi",
    mission: "Misi",

    visionText:
      "Menjadi perusahaan IT terpercaya dengan solusi aman dan terintegrasi.",

    mission1: "Memberikan solusi IT",
    mission2: "Menjamin keamanan sistem",
    mission3: "Memberikan dukungan cepat",

    // DETAIL
    infra: "Layanan Infrastruktur",
    network: "Layanan Jaringan",
    storage: "Penyimpanan Data",
    procurement: "Pengadaan",

    threat: "Deteksi Ancaman",
    cloud: "Keamanan Cloud",
    appsec: "Keamanan Aplikasi",
    data: "Perlindungan Data",
    identity: "Akses & Identitas",
    vapt: "VAPT (Vulnerability Assessment & Penetration Testing)",

    noc: "Pusat Operasi Jaringan (NOC)",
    soc: "Pusat Operasi Keamanan (SOC)",

    netInstall: "Instalasi Jaringan",
    cctv: "Instalasi CCTV",
    gate: "Akses Kontrol",
    me: "Mekanikal Elektrikal",
    cable: "Manajemen Kabel",

    // SERVICES
    servicesTitle: "LAYANAN KAMI",
    servicesDesc:
      "Kami menyediakan layanan IT profesional dan keamanan sistem.",

    service1Title: "Solusi IT dan Integrasi Sistem",
    service1Desc: "Solusi IT untuk operasional bisnis.",

    service2Title: "Keamanan Siber",
    service2Desc: "Melindungi sistem dan data.",
    focusDesc: "Fokus Utama : Infrastruktur IT & Keamanan Siber",
    service3Title: "Layanan Managed Services",
    service3Desc: "Monitoring sistem berkelanjutan.",

    service4Title: "Infrastruktur Jaringan",
    service4Desc:"Pembangunan jaringan.",

    // MENU
    it: "Solusi IT",
    cyber: "Keamanan Siber",
    managed: "Managed Service",
    net: "Infrastruktur Jaringan",

    // CORE VALUES
    coreTitle: "Nilai Utama",
    coreDesc:"Nilai yang membimbing keputusan, memperkuat kinerja dan mendukung kemitraan jangka panjang.",

    core1: "Profesional",
    core1Desc:
      "Kami menjalankan setiap tugas dengan kompetensi, tanggung jawab, dan standar etika yang tinggi.",

    core2: "Integritas",
    core2Desc:
      "Kami menjunjung tinggi kejujuran, transparansi, serta kepatuhan terhadap regulasi dan standar.",

    core3: "Inovatif",
    core3Desc:
      "Kami terus mengembangkan solusi yang adaptif dan relevan dengan perkembangan teknologi.",

    core4: "Komitmen",
    core4Desc:
      "Kami berkomitmen memberikan layanan berkualitas tinggi dan hasil terbaik bagi klien.",

    // ADVANTAGE
    advantageTitle: "Keunggulan Kami",
    adv1: "Tim Berpengalaman",
    adv2: "Fokus Keamanan",
    adv3: "Solusi Terintegrasi",
    adv4: "Dukungan Responsif",

    // COMMITMENT
    commitmentTitle: "Komitmen Layanan",
    commitmentDesc:
      "Kami berkomitmen memberikan layanan terbaik.",

    commit1: "Layanan berkualitas",
    commit2: "Keamanan sistem",
    commit3: "Respon cepat",
    commit4: "Profesional",

    // PARTNERS
    partnersTitle: "Produk & Teknologi",
    partnersDesc: "Kerja sama vendor global",

    // CONTACT
    contact: "Kontak Kami",

    // Client 
    clients: "Klien Kami",
    clientsDesc:   "Dipercaya oleh instansi pemerintah, perusahaan nasional dan multinasional"
    // SERVICES LIST - CARD 1
  
  },
  
  } as const;

  

  useEffect(() => {
  const browserLang = navigator.language;
  if (browserLang.includes("id")) {
    setLang("id");
  } else {
    setLang("en");
  }
}, []);

 
  // ================= DROPDOWN =================
 const [openDropdown, setOpenDropdown] = useState<string | null>(null); // desktop
const [mobileDropdown, setMobileDropdown] = useState(false); // mobile

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

const getAnimation = (i: number) => {
  if (!visibleCards[i]) return "opacity-0";

  return i % 2 === 0
    ? "opacity-100 translate-x-0"
    : "opacity-100 translate-x-0";
};

  return (
    <main className="w-full pt-24">

      {/* NAVBAR */}

    <motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-500 ${
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

  {/* MENU NAVBAR */}
  <div className="hidden md:flex items-center gap-8 text-sm">

    <button onClick={() => { handleNavClick("home");
      setShowContact(false);
    }} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Beranda" : "Home"}
    </button>

    <button onClick={() => { handleNavClick("about");
      setShowContact(false);
    }} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Tentang" : "About"}
    </button>

  <div className="relative" ref={dropdownRef}>

  {/* BUTTON */}
  <div
    onClick={() => {setShowContact(false);
      setOpenDropdown(openDropdown === "services" ? null : "services")
    }}
    className="cursor-pointer hover:text-blue-600 flex items-center gap-1"
  >
    {lang === "id" ? "Layanan" : "Services"}
    <span className={`transition ${openDropdown === "services" ? "rotate-180" : ""}`}>
      ▾
    </span>
  </div>

  {/* DROPDOWN SERVICES DEKSTOP*/}
  {openDropdown === "services" && (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 z-50">

      <div
        onClick={() => {
          setOpenDropdown(null);
          handleNavClick("it-solution"); setShowContact(false);
          setMobileDropdown(false);
          
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {t[lang].it}
      </div>

      <div
        onClick={() => {
          setOpenDropdown(null);
          handleNavClick("cyber-security"); setShowContact(false);
          setMobileDropdown(false);
          
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {t[lang].cyber}
      </div>

      <div
        onClick={() => {
          setOpenDropdown(null);
          handleNavClick("managed-services"); setShowContact(false);
          setMobileDropdown(false);
          
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {t[lang].managed}
        </div>

          <div
        onClick={() => {
          setOpenDropdown(null);
          handleNavClick("network-construction"); setShowContact(false);
          setMobileDropdown(false);
          
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {t[lang].net}
        </div>
      </div>

    
  )}

</div>

    <a onClick={() => { handleNavClick("clients"); setShowContact(false); }} className="cursor-pointer hover:text-blue-600">
      {lang === "id" ? "Klien" : "Clients"}
    </a>

    {/* ⚠️  KONTAK  */}
   <a
  onClick={() => {
    setShowContact(true); // 🔥 tampilkan contact dulu

    setTimeout(() => {
      handleNavClick("contact"); // baru scroll
    }, 100);
  }}
  className="cursor-pointer hover:text-blue-600"
>
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
</motion.nav>

{/* SEARCH */}

     {searchOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24">

    <div className="bg-white text-black dark:text-white border-b border-gray-200">

    </div>

  </div>
)}



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
    handleNavClick("home");
    setShowContact(false);
    setMenu(false);
    setMobileDropdown(false);
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

    {/*HOME*/}
 <a
  onClick={() => {
    handleNavClick("home");
    setMenu(false);
    setMobileDropdown(false);
    setShowContact(false);
  }}
  className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Beranda" : "Home"}
  </a>

  {/*TENTANG*/}
<a
  onClick={() => {
    handleNavClick("about");
    setMenu(false);
    setMobileDropdown(false);
    setShowContact(false);
  }}
  className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Tentang" : "About"}
  </a>

    {/*SERVICES*/}
 <div>

{/* HEADER MObile */}
  <div
    className="flex justify-between cursor-pointer transition active:scale-95"
    onClick={() => setMobileDropdown(prev => !prev)}
  >
    <span>{lang === "id" ? "Layanan" : "Services"}</span>

    <span className={`${mobileDropdown ? "rotate-180" : ""} transition`}>
      ▾
    </span>
  </div>

  {/* DROPDOWN */}
  <div
    className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
      mobileDropdown
        ? "max-h-40 opacity-100 mt-2"
        : "max-h-0 opacity-0 pointer-events-none"
    }`}
  >

  <div
    onClick={() => {
      handleNavClick("it-solution");
      setMenu(false);
      setMobileDropdown(false);
      setShowContact(false);
    }}
    className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
  >
    {t[lang].it}
  </div>

  <div
    onClick={() => {
      handleNavClick("cyber-security");
      setMenu(false);
      setMobileDropdown(false);
      setShowContact(false);
    }}
    className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
  >
      {t[lang].cyber}
  </div>

  <div
    onClick={() => {
      handleNavClick("managed-services");
      setMenu(false);
      setMobileDropdown(false);
      setShowContact(false);
    }}
    className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
  >
    {t[lang].managed}
  </div>

  <div
    onClick={() => {
      handleNavClick("network-construction");
      setMenu(false);
      setMobileDropdown(false);
      setShowContact(false);
    }}
    className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
  >
    {t[lang].net}
  </div>

</div>
</div>

      {/*KLIEN*/}
  <a
  onClick={() => {
    handleNavClick("clients");
    setMenu(false);
    setMobileDropdown(false);
    setShowContact(false);
  }}
  className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
>
    {lang === "id" ? "Klien" : "Clients"}
  </a>

    {/*KONTAK*/}
<a
  onClick={() => {
    setShowContact(true);
    setMenu(false);
    setMobileDropdown(false);

    setTimeout(() => {
      handleNavClick("contact");
     }, 100);
  }}
  className="cursor-pointer transition hover:scale-110 active:scale-95 hover:translate-x-1"
>
  {lang === "id" ? "Kontak" : "Contact"}
</a>

</div>

    {/* LANGUAGE */}
    <div className="mt-10">
      <p className="text-sm mb-2">PILIH BAHASA</p>

      <div className="flex gap-2">

  <button
    onClick={() => {setLang("en");
      setMobileDropdown(false);
    }}
    
    className={`px-3 py-1 transition
      ${lang === "en"
        ? "bg-red-500 text-white"
        : "border"}
    `}
  >
    EN
  </button>

  <button
    onClick={() => {setLang("id");
      setMobileDropdown(false);
    }}
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

<div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 blur-[120px] rounded-full" />
   {/* HERO */}
<section

  id="home"
className="relative w-full text-center pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">

    {/* 🔵 SHAPE DECOR */}
  <div className="absolute bottom-20 left-20 w-52 h-52 bg-blue-300/20 blur-3xl rounded-full z-0" />
  <div className="absolute top-12.5 right-15 w-37.5 h-37.5 bg-blue-500/20 blur-2xl rounded-full z-0" />

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0">
    <img
      src="/hero.png"
      alt="hero"
      className="w-full h-full object-cover opacity-80"
    />
  </div>

  {/* OVERLAY (BIAR TEXT JELAS) */}
  <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/80 to-blue-100/80 z-0" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl mx-auto">

          {/* 🔵 BADGE */}
  <Animate>
<Animate>
  <div className="inline-block px-4 py-1 mb-4 text-sm bg-blue-100/70 text-blue-700 rounded-full border border-blue-200 backdrop-blur-sm">
    {t[lang].heroBadge}
  </div>
</Animate>
  </Animate>

    <Animate>
<h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent tracking-tight">        DOTHREE
      </h1>
    </Animate>

   <Animate delay={0.2}>
  <p className="mt-4 text-base md:text-lg text-gray-700 font-semibold max-w-xl mx-auto leading-relaxed">
    {t[lang].heroTagline}
  </p>
</Animate>
      {/* 🔵 MINI LIST */}
  <div className="mt-6 flex flex-wrap justify-center gap-4 text-blue-600 text-sm">
  <span className="flex items-center gap-1 hover:scale-105 transition">
    ✓ {t[lang].infra}
  </span>
  <span className="flex items-center gap-1 hover:scale-105 transition">
    ✓ {t[lang].cyber}
  </span>
  <span className="flex items-center gap-1 hover:scale-105 transition">
    ✓ {t[lang].network}
  </span>
</div>


  </div>

</section>
<div className="h-20 bg-linear-to-b from-transparent to-gray-50" />

{/*ABOUT*/}
<section id="about" className="w-full py-12 md:py-16  px-4 bg-gray-50">


          {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0">
    <img
      src="/logoabout.png"
      alt="background"
      className="w-full h-full object-cover opacity-50"
    />
  </div>

  {/* TOP HERO ABOUT */}
  <div className="relative py-16 md:py-20 flex items-center justify-center text-center">

  

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/40 to-blue-900/40"></div>

  <div className="relative z-10 mt-10">
      <Animate type="left">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
      {t[lang].aboutTitle1}
    </h2>
    </Animate>

    <Animate type="right" delay={0.1}>
    <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
      {t[lang].aboutTitle2}
    </h2>
    </Animate>

  </div>

</div>

  {/* CIRCLE IMAGE */}
  <div className="flex justify-center -mt-12 relative z-20">
    <Animate delay={0.2}>
    <img
      src="/about.jpg.png"
      className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 md:border-6 border-white object-cover shadow-xl ring-4 ring-white/80"
    />
    </Animate>
  </div>

  {/* BOTTOM BLUE SECTION */}
  <div className="bg-blue-900 text-white text-center py-12 md:py-16 px-4 md:px-10">

    <div className="max-w-4xl mx-auto text-center px-4">

        <Animate delay={0.3}>
      <p className="text-sm md:text-base leading-relaxed opacity-90">
        {t[lang].aboutDesc1}
      </p>
      </Animate>

        <Animate delay={0.3}>
      <p className="text-sm md:text-base leading-relaxed opacity-90">
        {t[lang].aboutDesc2}
      </p>
      </Animate>

       <Animate delay={0.3}>
      <p className="text-sm md:text-base leading-relaxed opacity-90">
        {t[lang].aboutDesc3}
      </p>
      </Animate>

    </div>

  </div>

</section>

<section className="py-12 md:py-16 px-4 bg-linear-to-b from-gray-50 to-gray-100 text-center">

  <div className="max-w-4xl mx-auto">
        <Animate>
    <h2 className="text-3xl md:text-4xl font-bold mb-10">
      {lang === "id" ? "Visi & Misi" : "Vision & Mission"}
    </h2> </Animate>

    <div className="grid md:grid-cols-2 gap-8">

      {/* VISION */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          
          <Animate delay={0.1}>
        <h3 className="text-blue-600 font-semibold mb-3">
          {t[lang].vision} 
        </h3> </Animate>

          <Animate delay={0.2}> 
        <p className="text-gray-700 leading-relaxed ">
         {t[lang].visionText} 
        </p> </Animate>

      </div>

      {/* MISSION */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

          <Animate delay={0.5}>
        <h3 className="text-blue-600 font-semibold mb-3">
          {t[lang].mission} 
        </h3> </Animate>

     <ul className="text-gray-700 space-y-2 text-center">

  {[t[lang].mission1, t[lang].mission2, t[lang].mission3].map((item, i) => (
    <Animate key={i} delay={i * 0.1}>
      <li className="leading-relaxed">
        {item}
      </li>
    </Animate>
  ))}

</ul>

      </div>

    </div>

  </div>

</section>

<div className="h-px bg-linear-to-r from-transparent via-blue-300/50 to-transparent my-6 md:my-8" />

 {/* SERVICES */}
<section id="services" ref={sectionRef} className="py-16 md:py-20 px-4 bg-blue-50 scroll-mt-24">

  <div className="max-w-5xl mx-auto text-center">

    {/* TITLE */}
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      {t[lang].servicesTitle}
    </h2>

    <p className="font-semibold text-gray-600 max-w-3xl mx-auto mb-12">
      {t[lang].focusDesc}
    </p>

  
  </div>

  <div className="space-y-12">

  {/* ===== CARD 1 ===== */}
  <div
  id="it-solution"
  ref={(el) => {
  cardRefs.current[0] = el;
}}
  data-index="0"
 className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-10
flex flex-col items-center text-center
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 hover:scale-[1.02] hover:brightness-[1.02]
${visibleCards[0] ? "opacity-100 translate-y-0 scale-100 " : "opacity-0 translate-y-10 scale-95"}
`}
>

    <div className="flex justify-center mb-8">
      <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold shadow-md">
     <Animate delay={0.1}>
      {t[lang].service1Title}
      </Animate>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
      <div className="group aspect-video overflow-hidden rounded-xl">
        <Animate type="zoom">
        <img src="/it1.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
        </Animate>
      </div>
      <div className="group aspect-video overflow-hidden rounded-xl">
        <Animate type="zoom">
        <img src="/it2.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
        </Animate>
      </div>
    </div>

      <Animate delay={0.2}>
    <p className="font-semibold text-gray-700 text-sm md:text-base mb-6 leading-relaxed text-center max-w-2xl mx-auto">
     {t[lang].service1Desc} 
    </p> </Animate>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 
      text-sm md:text-base text-gray-700 
      max-w-xl mx-auto 
      text-left leading-snug items-start">

        <Animate delay={0}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].infra}
      </li>
      </Animate>

        <Animate delay={0.05}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].network}
      </li>
        </Animate>

        <Animate delay={0.1}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].storage}
      </li>
        </Animate>

        <Animate delay={0.15}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].procurement}
      </li>
      </Animate>

    </ul>

  </div>

  {/* ===== CARD 2 ===== */}
  <div
  id="cyber-security"
  ref={(el) => {
  cardRefs.current[1] = el;
}}
  data-index="1"
 className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-10
flex flex-col items-center text-center
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 hover:scale-[1.02] hover:brightness-[1.02]
${visibleCards[1] ? "opacity-100 translate-x-0 scale-100 " : "opacity-0 translate-x-10 scale-95"}
`}
>

    <div className="flex justify-center mb-8">
      <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold shadow-md">
       <Animate delay={0.1}> {t[lang].service2Title} </Animate>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
       <div className="group aspect-video overflow-hidden rounded-xl">
                <Animate type="zoom">
        <img src="/cyber1.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
      </Animate>
      </div>
       <div className="group aspect-video overflow-hidden rounded-xl">
                <Animate type="zoom">
        <img src="/cyber2.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
                </Animate>
      </div>
    </div>

      <Animate delay={0.2}>
    <p className="font-semibold text-gray-700 text-sm md:text-base mb-6 leading-relaxed text-center max-w-2xl mx-auto">
     {t[lang].service2Desc} 
    </p> </Animate>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm md:text-base text-gray-700 max-w-xl mx-auto text-left leading-snug items-start">

              <Animate delay={0}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].threat}
      </li> </Animate>

                <Animate delay={0.05}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].cloud}
      </li> </Animate>

                <Animate delay={0.1}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].appsec}
      </li> </Animate>

                <Animate delay={0.15}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].data}
      </li> </Animate>

                  <Animate delay={0.2}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].identity}
      </li> </Animate>

                <Animate delay={0.25}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        <span className="whitespace-pre-line">{t[lang].vapt}</span>
      </li> </Animate>

    </ul>

  </div>

  {/* ===== CARD 3 ===== */}
   <div
   id="managed-services"
  ref={(el) => {
  cardRefs.current[2] = el;
}}
  data-index="2"
className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-10
flex flex-col items-center text-center
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 hover:scale-[1.02] hover:brightness-[1.02]
${visibleCards[2] ? "opacity-100 translate-x-0 scale-100 " : "opacity-0 translate-x-10 scale-95"}
`}
>

    <div className="flex justify-center mb-8">
      <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold shadow-md">
        <Animate delay={0.1}> {t[lang].service3Title} </Animate>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
       <div className="group aspect-video overflow-hidden rounded-xl">
        <Animate type="zoom">
          <img src="/server.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
          </Animate>

      </div>
       <div className="group aspect-video overflow-hidden rounded-xl">
       <Animate type="zoom">
         <img src="/monitoring.png" className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110" />
        </Animate>
      </div>
    </div>

    <Animate delay={0.2}>
    <p className="font-semibold text-gray-700 text-sm md:text-base mb-6 leading-relaxed text-center max-w-2xl mx-auto">
     {t[lang].service3Desc} 
    </p> </Animate>

   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm md:text-base text-gray-700 max-w-xl mx-auto text-left leading-snug items-start">

        <Animate delay={0}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].noc}
      </li> </Animate>

        <Animate delay={0.05}>
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
        {t[lang].soc}
      </li> </Animate>

    </ul>

  </div>

  {/* ===== CARD 4 ===== */}
 <div
 id="network-construction"
  ref={(el) => {
  cardRefs.current[3] = el;
}}
  data-index="3"
className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-10
flex flex-col items-center text-center
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 hover:scale-[1.02] hover:brightness-[1.02]
${visibleCards[3] ? "opacity-100 translate-y-0 scale-100 " : "opacity-0 translate-y-10 scale-95"}
`}
>

  {/* HEADER */}
  <div className="flex justify-center mb-8">
    <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold shadow-md">
      <Animate delay={0.1}> {t[lang].service4Title} </Animate>

    </div>
  </div>

  {/* IMAGE */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
    
     <div className="group aspect-video overflow-hidden rounded-xl">
      <Animate type="zoom">
      <img
        src="/network1.png"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
      />
      </Animate>
    </div>

     <div className="group aspect-video overflow-hidden rounded-xl">
      <Animate type="zoom">
      <img
        src="/network2.png"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
      />
      </Animate>
    </div>

  </div>

  {/* DESC */}
  <Animate delay={0.2}>
  <p className="font-semibold text-gray-700 text-sm md:text-base mb-6 leading-relaxed text-center max-w-2xl mx-auto">
     {t[lang].service4Desc} 
  </p> </Animate>

  {/* LIST (2 KOLOM) */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm md:text-base text-gray-700 max-w-xl mx-auto text-left leading-snug items-start">

        <Animate delay={0}> 
      <li className="flex items-start gap-2">
      <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
      {t[lang].netInstall}
    </li> </Animate>

        <Animate delay={0.05}> 
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
      {t[lang].cctv}
    </li> </Animate>

        <Animate delay={0.1}> 
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
      {t[lang].gate}
    </li> </Animate>

        <Animate delay={0.15}> 
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
      {t[lang].me}
    </li> </Animate>

        <Animate delay={0.2}> 
      <li className="flex items-start gap-2">
        <CheckCircle className="text-blue-600 w-4 h-4 mt-1 shrink-0" />
      {t[lang].cable}
    </li> </Animate>

  </ul>

</div>
</div>

</section>

{/* ADVANTAGE */}
<section id="advantage" className="py-12 md:py-16 bg-blue-50 px-4">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
      <Animate> {lang === "id" ? "Keunggulan Kami" : "Our Advantage"} </Animate>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">

  {[
    { icon: "👨‍💻", text: t[lang].adv1 },
    { icon: "🔒", text: t[lang].adv2 },
    { icon: "🔄", text: t[lang].adv3 },
    { icon: "📞", text: t[lang].adv4 },
  ].map((item, i) => (
    <Animate key={i} delay={i * 0.1}>
      <div className="bg-white text-black p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="text-2xl mb-2 text-center">{item.icon}</div>
        <p className="font-semibold text-center">{item.text}</p>
      </div>
    </Animate>
  ))}

</div>
    </div>

</section>

<div className="h-px bg-lineaar-to-r from-transparent via-blue-300/40 to-transparent my-16" />


{/* COMMIT */}
<section id="commitment" className="py-12 md:py-16 px-4 bg-blue-50">

  <div className="max-w-5xl mx-auto text-center">

      <Animate>
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      {t[lang].commitmentTitle}
    </h2> </Animate>

      <Animate delay={0.1}>
    <p className="font-semibold text-gray-600 max-w-2xl mx-auto mb-12">
      {t[lang].commitmentDesc}
    </p> </Animate>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {[
    t[lang].commit1,
    t[lang].commit2,
    t[lang].commit3,
    t[lang].commit4,
  ].map((item, i) => (
    <Animate key={i} delay={i * 0.1}>
      <div className="p-5 md:p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        ✔ {item}
      </div>
    </Animate>
  ))}

</div>
</div>

</section>

{/* PARTNERS */}
<section id="partners" className="py-16 md:py-20 px-4 bg-gray-50">

  <div className="max-w-6xl mx-auto text-center">
      <Animate>
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      {t[lang].partnersTitle}
    </h2> </Animate>

      <Animate delay={0.1}>
    <p className="font-semibold text-gray-600 mb-12">
      {t[lang].partnersDesc}
    </p> </Animate>

    <div className="flex flex-wrap justify-center gap-8">

     {[
  "cisco.png",
  "fortinet.png",
  "microsoft.png",
  "vmware.png",
  "sophos.png",
  "dell.png",
  "hp.png",
  "lenovo.png",
].map((logo, i) => (
  <Animate key={i} delay={i * 0.05} type="zoom">
    <div className="w-40 md:w-44 bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <img
        src={`/partners/${logo}`}
        className="object-contain max-h-20 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
      />
    </div>
  </Animate>
))}

    </div>

  </div>

</section>

<div className="h-px bg-linear-to-r from-transparent via-blue-300/40 to-transparent my-16 md:my-20" />


{/*CORE VALUES */}
 
<section 
ref={coreRef}
className="relative py-20 px-4 bg-linear-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
{/* GRID BACKGROUND */}
<div className="absolute inset-0 opacity-10 pointer-events-none
bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]
bg-size-[40px_40px]">
</div>
  <div className="max-w-5xl mx-auto text-center">
    </div>

    {/* TITLE */}
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
      {t[lang].coreTitle}
    </h2>

    <p className="font-semibold text-sm md:text-base text-white/80 max-w-2xl mx-auto mb-12 text-center">
      {t[lang].coreDesc}
    </p>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">

      {/* CARD 1 */}
  <div className={`relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-400
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_40px_rgba(59,130,246,0.3)]
hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]
hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-100
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-800 px-3 py-1 rounded-md text-sm font-semibold shadow">
    {t[lang].core1}
  </div>

  <p className="text-sm mt-4 text-white/90 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core1Desc}
  </p>
</div>

      {/* CARD 2 */}
   <div className={`relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-400
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_40px_rgba(59,130,246,0.3)]
hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]
hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-200
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-800 px-3 py-1 rounded-md text-sm font-semibold shadow">
    {t[lang].core2}
  </div>

  <p className="text-sm mt-4 text-white/90 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core2Desc}
  </p>
</div>
      {/* CARD 3 */}
    <div className={`relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-400
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_40px_rgba(59,130,246,0.3)]
hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]
hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-300
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-800 px-3 py-1 rounded-md text-sm font-semibold shadow">
    {t[lang].core3}
  </div>

  <p className="text-sm mt-4 text-white/90 leading-relaxed max-w-2xl mx-auto">
      {t[lang].core3Desc}
  </p>
</div>

      {/* CARD 4 */}
   <div className={`relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-400
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_40px_rgba(59,130,246,0.3)]
hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]
hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-400
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-800 px-3 py-1 rounded-md text-sm font-semibold shadow">
    {t[lang].core4}
  </div>

  <p className="text-sm mt-4 text-white/90 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core4Desc}
  </p>
</div>

  </div>
<div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-blue-900 to-transparent"></div>
</section>

   {/* CLIENT SLIDER */}
<section id="clients" className="w-full py-16 bg-white">

  <div className="max-w-6xl mx-auto px-4">

      <Animate>
    <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
      {t[lang].clients}
    </h2> </Animate>

      <Animate delay={0.1}>
    <p className="font-semibold text-gray-600 mb-8 text-center">
    {t[lang].clientsDesc}
 </p> </Animate>

   <div className="flex flex-wrap justify-center gap-6">

 {clients.map((client, i) => (
  <Animate key={i} delay={i * 0.05} type="zoom">
    <div className="w-36 md:w-40 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <Image
        src={`/clients/${client}`}
        alt={client}
        width={200}
        height={100}
        className="object-contain max-h-20 w-auto opacity-80 hover:opacity-100 transition"
      />
    </div>
  </Animate>
))}

</div>

  </div>
</section>

 {/* CONTACT */}
 {showContact && (
  <section id="contact" className="w-full scroll-mt-20 transition-all duration-500 animate-fade-in">

  <div className="grid md:grid-cols-3 min-h-65 md:min-h-75">

    {/* KIRI */}
         <div className="md:col-span-1 bg-blue-900 text-white px-6 py-6 md:px-10 md:py-8 flex flex-col justify-center">

      <h2 className="text-xl font-semibold mb-4">
        {t[lang].contact}
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
{showContact && (
  <div className="md:col-span-2 h-65 md:h-75 shadow-lg">
    <iframe
      src="https://www.google.com/maps?q=PT+Dothree+Santana+Prisma+Jakarta&output=embed"
      className="w-full h-full border-0"
      loading="lazy"
    />
  </div>
)}
</div>
</section>
)}  



 {/* FOOTER */}
 {!showContact && (
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
)}


 

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
