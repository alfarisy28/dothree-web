"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { Users, ShieldCheck, Network, Headphones, Rocket, CheckCircle, CheckCircle2,} from "lucide-react";
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
    adv1:   "Experienced and professional team in information technology and procurement services.",
    adv2:   "Strong focus on security, reliability, and service quality.",
    adv3:   "Integrated IT and procurement solutions delivered comprehensively.",
    adv4:   "Responsive and solution-oriented approach for every client requirement.",
    adv5:   "Commitment to innovation and continuous improvement.",

    // COMMITMENT
    commitmentTitle: "Service Commitment",
    commitmentDesc:
      "We are committed to delivering high-quality IT services with professional standards.",

    commit1:   "Deliver reliable and high-quality IT and procurement services in accordance with agreed standards.",
    commit2:   "Ensure system security, data protection, and compliance with applicable regulations.",
    commit3:   "Provide responsive support and timely solutions to meet client needs.",
    commit4:   "Maintain professionalism, transparency, and accountability in every engagement.",
    commit5:   "Build long-term partnerships through consistent performance and continuous improvement.",

    // PARTNERS
    partnersTitle: "Technology Solutions We Offer",
    partnersDesc: "We collaborate with global trusted vendors",

    headOffice:
  "Head Office (3rd Floor, Graha Mampang, Mampang Prapatan Raya Street Kav.100, RT 007/003, Duren Tiga, Pancoran, South Jakarta 12760).",

workshopOffice:
  "Workshop Office (Perdana 1 Street No. 10C, RT 007/005, Pesanggrahan, South Jakarta 12270).",
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
    adv1:   "Tim yang berpengalaman dan profesional dalam bidang teknologi informasi dan pengadaan.",
    adv2:   "Fokus yang kuat pada keamanan, keandalan, dan kualitas layanan.",
    adv3:   "Layanan TI dan pengadaan yang terintegrasi secara menyeluruh.",
    adv4:   "Pendekatan yang responsif dan berorientasi pada solusi untuk setiap kebutuhan klien.",
    adv5:   "Komitmen terhadap inovasi dan peningkatan berkelanjutan.",

    // COMMITMENT
    commitmentTitle: "Komitmen Layanan",
    commitmentDesc:
      "Kami berkomitmen memberikan layanan terbaik.",

    commit1:   "Memberikan layanan TI dan pengadaan yang andal dan berkualitas tinggi sesuai dengan standar yang disepakati.",
    commit2:   "Memastikan keamanan sistem, perlindungan data, dan kepatuhan terhadap peraturan yang berlaku.",
    commit3:   "Memberikan dukungan responsif dan solusi tepat waktu untuk memenuhi kebutuhan klien.",
    commit4:   "Menjaga profesionalisme, transparansi, dan akuntabilitas dalam setiap keterlibatan.",
    commit5:  "Membangun kemitraan jangka panjang melalui kinerja yang konsisten dan peningkatan berkelanjutan.",

    // PARTNERS
    partnersTitle: "Produk Yang Kami Tawarkan",

    // CONTACT
    contact: "Kontak Kami",
    headOffice:
    "Head Office (Graha Mampang LT.3 Jalan. Mampang Prapatan Raya Kav.100 RT 007/003 Duren Tiga Pancoran Jakarta Selatan 12760).",
     workshopOffice:
    "Workshop Office (Jalan. Perdana 1 No. 10C RT 007/005 Pesanggrahan Jakarta Selatan 12270).",
    // Client 
    clients: "Klien Kami",
    clientsDesc:   "Dipercaya oleh instansi pemerintah, perusahaan nasional dan multinasional"
    
  
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
  className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-transform duration-500 ${
    showNavbar ? "translate-y-0 shadow-md" : "-translate-y-full"
  }`}
    >


<div className="max-w-350 mx-auto flex items-center h-20 px-6 md:px-10">

  {/* LOGO */}
<div className="mr-auto">
    <div
  onClick={() => handleNavClick("home")}
  className="cursor-pointer"
>
  <Image
    src="/logo3.png"
    alt="Dothree"
    width={220}
    height={60}
    className="object-contain"
  />
</div>
</div>

  {/* MENU NAVBAR */}
<div className="hidden md:flex items-center gap-8 text-[15px] font-light tracking-wide mr-10">    <button onClick={() => { handleNavClick("home");
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
  className="relative w-full text-center
pt-20 pb-14
md:pt-24 md:pb-24
px-4 bg-blue-950 text-white overflow-hidden"
>

  {/* BACKGROUND LOGO */}
<Image
  src="/logo2.png"
  alt="Background Logo"
  fill
  priority
  className="object-contain
object-center
opacity-[0.08] md:opacity-[0.14]
scale-[0.8] md:scale-[1.8]
translate-y-8 md:translate-y-8
drop-shadow-[0_0_18px_rgba(255,255,255,0.06)]"
/>
  {/*  SHAPE */}
  <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
  <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/20 blur-2xl rounded-full" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">

    {/* TITLE */}
    <Animate>
<h1 className="relative z-20
text-4xl sm:text-5xl md:text-6xl lg:text-7xl
font-bold
tracking-tight md:tracking-[-2px]
leading-none
text-center
text-white
drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)]
max-w-[95%] mx-auto
md:whitespace-nowrap">
  PT DOTHREE SANTANA PRISMA
</h1>
    </Animate>

    {/* TAGLINE */}
    <Animate delay={0.2}>
      <p className="mt-4 text-base md:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed">
        {t[lang].heroTagline}
      </p>
    </Animate>

    {/* MINI LIST */}
<div className="mt-7 flex flex-wrap justify-center
gap-x-4 gap-y-2
text-white/80
text-xs md:text-sm
px-4">  <span className="flex items-center gap-1 hover:scale-105 transition">
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


<div className="py-8 bg-white">
  <div className="h-px bg-gray-200/70"></div>
</div>

{/* ================= ABOUT ================= */}
<section
  id="about"
className="grid grid-cols-1 md:grid-cols-2 items-stretch bg-[#F7F4F1]">
{/* LEFT IMAGE */}

<div className="relative h-60 md:min-h-full p-4 pb-1 bg-[#F5F3F1] flex items-start">

  <img
    src="/about.png"
    alt="about"
    className="w-full h-full max-h-[calc(100%-24px)] object-cover rounded-sm object-center grayscale contrast-125 brightness-105"
  />


</div>

  {/* RIGHT CONTENT */}
<div className="flex items-center px-4 md:px-16 pt-2 pb-8 md:py-10 bg-[#F5F3F1]">        <div className="max-w-2xl flex flex-col justify-center h-full">

      {/* TITLE */}
      <Animate type="left">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#2A1D1A] mb-8 mt-4 md:mt-0">
  {lang === "id" ? "TENTANG KAMI" : "ABOUT US"}
</h2>
      </Animate>

      {/* COMPANY */}
      <Animate delay={0.1}>
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-[#2A1D1A] mb-6">
          PT. DOTHREE SANTANA PRISMA
        </h3>
      </Animate>

      {/* DESC 1 */}
      <Animate delay={0.2}>
        <p className="text-[15px] md:text-[17px] leading-[1.7] tracking-wide text-[#2A1D1A]/90 mb-8">
          {t[lang].aboutDesc1}
        </p>
      </Animate>

    

      {/* DESC 2 */}
      <Animate delay={0.4}>
        <p className="text-[17px] leading-[1.7] tracking-wide text-[#2A1D1A]/90">
          {t[lang].aboutDesc2} {t[lang].aboutDesc3}
        </p>
      </Animate>

    </div>

  </div>

</section>



      {/*VISI*/}
<section className="relative overflow-hidden py-16 md:py-20 px-4 bg-linear-to-b from-white via-blue-50/30 to-gray-100 text-center">

{/* BACKGROUND EFFECT */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">

  <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 blur-3xl rounded-full" />

  <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 blur-3xl rounded-full" />

</div>

  <div className="max-w-5xl mx-auto">
        <Animate>
<h2 className="text-3xl md:text-5xl font-semibold tracking-tight bg-linear-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-12">      {lang === "id" ? "Visi & Misi" : "Vision & Mission"}
    </h2> </Animate>


<div className="relative grid md:grid-cols-2 gap-6 items-stretch">
  <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-linear-to-b from-transparent via-blue-200 to-transparent" />

     {/* VISION */}
<div className="relative overflow-hidden bg-white/70 backdrop-blur-sm backdrop-saturate-150 p-5 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-200/80
hover:-translate-y-3 hover:rotate-[0.3deg] hover:shadow-2xl hover:scale-[1.02]
hover:border-blue-300
transition-all duration-300 ease-out">

  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-700 via-blue-400 to-cyan-300" />

   {/* GLOW */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/30 blur-3xl rounded-full" />

  <Animate delay={0.05}>
   <div className="flex justify-center mb-4">

  <div className="w-40 h-40 rounded-full bg-linear-to-b from-blue-50 to-white border border-blue-100 shadow-inner flex items-center justify-center">

    <Image
      src="/visi.png"
      alt="Visi"
      width={190}
      height={190}
      className="object-contain drop-shadow-xl transition duration-500 hover:scale-110"
    />

  </div>

</div>
  </Animate>

  <Animate delay={0.1}>
<h3 className="text-blue-700 text-3xl md:text-4xl font-bold mb-5 tracking-tight">      {t[lang].vision}
    </h3>
  </Animate>

  <Animate delay={0.2}>
    <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
      {t[lang].visionText}
    </p>
  </Animate>

</div>

    {/* MISSION */}
<div className="relative overflow-hidden bg-white/70 backdrop-blur-sm backdrop-saturate-150 p-5 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-200/80
hover:-translate-y-3 hover:rotate-[0.3deg] hover:shadow-2xl hover:scale-[1.02]
hover:border-blue-300
transition-all duration-300 ease-out">

<div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-700 via-blue-400 to-cyan-300" />
  <Animate delay={0.05}>
    <div className="flex justify-center mb-4">

  <div className="w-40 h-40 rounded-full bg-linear-to-b from-blue-50 to-white border border-blue-100 shadow-inner flex items-center justify-center">

    <Image
      src="/visi.png"
      alt="Visi"
      width={190}
      height={190}
      className="object-contain drop-shadow-xl transition duration-500 hover:scale-110"
    />

  </div>

</div>
  </Animate>

  <Animate delay={0.5}>
<h3 className="text-blue-700 text-3xl md:text-4xl font-bold mb-5 tracking-tight">
        {t[lang].mission}
    </h3>
  </Animate>

  <ul className="text-gray-700 space-y-5 text-[15px] md:text-base max-w-md mx-auto">
    {[t[lang].mission1, t[lang].mission2, t[lang].mission3].map((item, i) => (
      <Animate key={i} delay={i * 0.1}>
        <li className="leading-relaxed flex items-start gap-3 text-left">

  <span className="text-blue-600 mt-1">✦</span>

  <span>{item}</span>

</li>
      </Animate>
    ))}
  </ul>

</div>

    </div>

  </div>

</section>

<div className="py-8 bg-white">
  <div className="h-px bg-gray-200/70"></div>
</div>

 {/* SERVICES */}
<section id="services" ref={sectionRef} className="py-10 md:py-14 px-4 bg-blue-50 scroll-mt-24">

  <div className="max-w-5xl mx-auto text-center">

    {/* TITLE */}
<h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-6">
        {t[lang].servicesTitle}
    </h2>
  
  </div>

  <div className="space-y-8">

      {/* ===== CARD 1 ===== */}
  <div
  id="cyber-security"
  ref={(el) => {
  cardRefs.current[1] = el;
}}
  data-index="1"
 className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-6
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

  {/* ===== CARD 2 ===== */}
  <div
  id="it-solution"
  ref={(el) => {
  cardRefs.current[0] = el;
}}
  data-index="0"
 className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-6
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


  {/* ===== CARD 3 ===== */}
   <div
   id="managed-services"
  ref={(el) => {
  cardRefs.current[2] = el;
}}
  data-index="2"
className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm
rounded-2xl shadow-md p-5 md:p-6 mb-6
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
rounded-2xl shadow-md p-5 md:p-6 mb-6
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

<div className="py-8 bg-white">
  <div className="h-px bg-gray-200/70"></div>
</div>

{/* ================= ADVANTAGE + COMMITMENT ================= */}
<section className="py-10 md:py-14 bg-blue-50 px-4">

  <div className="max-w-7xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {/* ================= LEFT ================= */}
<div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm h-full">
        <Animate>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-blue-900 text-center mb-8">
            {lang === "id" ? "Keunggulan Kami" : "Our Advantage"}
          </h2>
        </Animate>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {[
            { icon: <Users size={34} strokeWidth={1.8} />, text: t[lang].adv1 },
            { icon: <ShieldCheck size={34} strokeWidth={1.8} />, text: t[lang].adv2 },
            { icon: <Network size={34} strokeWidth={1.8} />, text: t[lang].adv3 },
            { icon: <Headphones size={34} strokeWidth={1.8} />, text: t[lang].adv4 },
            { icon: <Rocket size={34} strokeWidth={1.8} />, text: t[lang].adv5 },
          ].map((item, i) => (

            <Animate key={i} delay={i * 0.1}>
<div className="bg-gray-50 border border-gray-100 rounded-2xl min-h-42.5 p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
<div className="text-blue-700 mb-4 flex justify-center">
                    {item.icon}
                </div>

                <p className="font-medium text-gray-900">
                  {item.text}
                </p>

              </div>
            </Animate>

          ))}

        </div>

      </div>

      {/* ================= RIGHT ================= */}
<div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm h-full">
    
        <Animate>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-blue-900 text-center mb-8">
            {t[lang].commitmentTitle}
          </h2>
        </Animate>

        { /*<Animate delay={0.1}>
          <p className="font-normal text-gray-600 max-w-2xl mx-auto mb-10 text-center leading-relaxed">
            {t[lang].commitmentDesc}
          </p>
        </Animate> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {[
            t[lang].commit1,
            t[lang].commit2,
            t[lang].commit3,
            t[lang].commit4,
            t[lang].commit5,
          ].map((item, i) => (

            <Animate key={i} delay={i * 0.1}>
<div className="bg-gray-50 border border-gray-100 rounded-2xl min-h-42.5 p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
               <div className="mb-4 text-green-600 flex justify-center">
                  <CheckCircle2 size={34} strokeWidth={2} />
                </div>

                <p className="font-medium text-gray-900">
                        {item}
                </p>
              </div>
            </Animate>

          ))}

        </div>

      </div>

    </div>

  </div>

</section>

<div className="py-8 bg-white">
  <div className="h-px bg-gray-200/70"></div>
</div>

{/* ================= PRODUK KAMI ================= */}
<section
  className="relative overflow-hidden"
  style={{
    backgroundImage: "url('/logoproduk.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  {/* OVERLAY */}
  <div className="bg-black/40">

<div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">

      {/* TITLE */}
      <Animate>
<h2 className="text-white text-3xl md:text-6xl font-semibold leading-tight max-w-55 md:max-w-md">          {lang === "id"
            ? "PRODUK\nUTAMA KAMI"
            : "OUR MAIN\nPRODUCTS"}
        </h2>
      </Animate>

    </div>

  </div>

  {/* LOGO AREA */}
  <div className="bg-white py-5 md:py-10">

    <div className="max-w-6xl mx-auto px-4">

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
          {[
          "kaspersky.png",
          "fortra.png",
          "qualys.png",
        ].map((logo, i) => (

          <Animate key={i} delay={i * 0.1}>
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 flex items-center justify-center p-4 min-h-30 md:min-h-42.5">

  <img
    src={`/products/${logo}`}
    className={`object-contain w-auto transition duration-300 hover:scale-105 ${
      logo === "qualys.png"
        ? "max-h-12 md:max-h-20"
        : "max-h-14 md:max-h-24"
    }`}
  />

</div>
          </Animate>

        ))}

      </div>

    </div>

  </div>

</section>

<div className="py-8 bg-white">
  <div className="h-px bg-gray-200/70"></div>
</div>

{/* PARTNERS */}
<section id="partners" className="py-10 md:py-14 px-4 bg-gray-50">

  <div className="max-w-6xl mx-auto text-center">
     <Animate>
  <div className="text-center mb-12">

    <h2
      className="
        text-3xl
        md:text-5xl
        font-semibold
        tracking-[-1px]
        text-blue-900
        mb-4
      "
    >
      {t[lang].partnersTitle}
    </h2>

    <div className="w-24 h-1 bg-blue-900/80 mx-auto rounded-full" />

  </div>
</Animate>

     

    <div className="flex flex-wrap justify-center gap-3 md:gap-5">

     {[
  "cisco.png",
  "aruba.png",
  "bitdefender.png",
  "darktrace.png",
  "radware.png",
  "sangfor.png",
  "segura.png",
  "sonicwall.png",
  "zimperium.png",
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

<div className="relative h-20 overflow-hidden bg-white">

  <div className="absolute inset-x-0 top-0 h-px bg-gray-200/60" />

  <div className="absolute inset-0 bg-linear-to-b from-blue-50/40 to-transparent blur-2xl" />

</div>
{/*CORE VALUES */}
 
<section 
ref={coreRef}
className="relative py-14 md:py-20 px-4 bg-linear-to-b from-[#0f172a] via-[#172554] to-[#1e3a8a] text-white overflow-hidden">
{/* GRID BACKGROUND */}
<div className="absolute inset-0 z-0 opacity-10 pointer-events-none
bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]
bg-size:[40px_40px]">
</div>
<div className="relative z-10"></div>
  
    {/* TITLE */}
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-center">
      {t[lang].coreTitle}
    </h2>

    <p className="text-sm md:text-base font-light tracking-wide leading-relaxed  text-white/80 max-w-2xl mx-auto mb-8 text-center">
      {t[lang].coreDesc}
    </p>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto px-4">

      {/* CARD 1 */}
  <div className={`relative bg-white/10 backdrop-blur-md
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_30px_rgba(0,0,0,0.25)]
hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
hover:-translate-y-2 hover:scale-[1.01]
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-100
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg">
    {t[lang].core1}
  </div>

  <p className="text-sm md:text-base mt-4 text-white/85 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core1Desc}
  </p>
</div>

      {/* CARD 2 */}
   <div className={`relative bg-white/10 backdrop-blur-md
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_30px_rgba(0,0,0,0.25)]
hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
hover:-translate-y-2 hover:scale-[1.01]
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-200
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg">
    {t[lang].core2}
  </div>

  <p className="text-sm md:text-base mt-4 text-white/85 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core2Desc}
  </p>
</div>
      {/* CARD 3 */}
    <div className={`relative bg-white/10 backdrop-blur-md
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_30px_rgba(0,0,0,0.25)]
hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
hover:-translate-y-2 hover:scale-[1.01]
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-300
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg">
    {t[lang].core3}
  </div>

  <p className="text-sm md:text-base mt-4 text-white/85 leading-relaxed max-w-2xl mx-auto">
      {t[lang].core3Desc}
  </p>
</div>

      {/* CARD 4 */}
   <div className={`relative bg-white/10 backdrop-blur-md
py-5 px-6 rounded-2xl text-center
border border-white/10
shadow-[0_10px_30px_rgba(0,0,0,0.25)]
hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
hover:-translate-y-2 hover:scale-[1.01]
transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform delay-400
${coreVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}
`}>

  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg">
    {t[lang].core4}
  </div>

  <p className="text-sm md:text-base mt-4 text-white/85 leading-relaxed max-w-2xl mx-auto">
    {t[lang].core4Desc}
  </p>
</div>

  </div>
<div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-blue-900 to-transparent"></div>
</section>

<div className="relative h-20 overflow-hidden bg-white">

  <div className="absolute inset-x-0 top-0 h-px bg-gray-200/60" />

  <div className="absolute inset-0 bg-linear-to-b from-blue-50/40 to-transparent blur-2xl" />

</div>

   {/* CLIENT */}
<section
  id="clients"
  className="w-full py-14 md:py-20 bg-linear-to-b from-white to-blue-50"
>

  <div className="max-w-6xl mx-auto px-4">

     <Animate>
  <div className="text-center mb-12">

    <h2
      className="
        text-3xl
        md:text-5xl
        font-semibold
        tracking-[-1px]
        text-blue-900
        mb-4
      "
    >
      {t[lang].clients}
    </h2>

    <div className="w-24 h-1 bg-linear-to-r from-blue-900 to-blue-500 mx-auto rounded-full" />

  </div>
</Animate>

      <Animate delay={0.1}>
<p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-12 text-center">    {t[lang].clientsDesc}
 </p> </Animate>

   <div className="flex flex-wrap justify-center gap-4">

 {clients.map((client, i) => (
  <Animate key={i} delay={i * 0.05} type="zoom">
<div
  className="
    w-36
    md:w-44
    h-24 md:h-32
    bg-white/90
    backdrop-blur-sm
    rounded-3xl
    p-5
    flex items-center justify-center
    border border-gray-100
    shadow-sm
    hover:shadow-2xl
    hover:-translate-y-2
    hover:scale-105
    transition-all duration-300
  "
>      <Image
        src={`/clients/${client}`}
        alt={client}
        width={200}
        height={100}
        className="
  object-contain
  max-h-16
  md:max-h-20
  w-auto
  opacity-80
  hover:opacity-100
  hover:scale-105
  transition duration-300
"
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
  <MapPin size={16} className="mt-1 shrink-0" />

  <div className="flex flex-col gap-4">

    <span className="text-sm leading-relaxed">
      {t[lang].headOffice}
    </span>

    <span className="text-sm leading-relaxed">
      {t[lang].workshopOffice}
    </span>

  </div>
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
<footer className="relative bg-linear-to-r from-blue-900 to-blue-800 text-white py-3 px-4 md:px-8 border-t border-white/20 overflow-hidden">

  {/* DESKTOP LOGO */}
  <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2">

    <Image
      src="/logo2.png"
      alt="Dothree"
      width={95}
      height={24}
      className="object-contain opacity-80"
    />

  </div>

  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">

    {/* MOBILE LOGO */}
    <div className="md:hidden">
      <Image
        src="/logo2.png"
        alt="Dothree"
        width={90}
        height={22}
        className="object-contain opacity-80"
      />
    </div>

    {/* ADDRESS */}
    <div className="flex items-center justify-center gap-2 text-xs md:text-[15px] text-center md:text-left">

      <MapPin size={14} className="shrink-0" />

      <div className="leading-relaxed">
        {t[lang].workshopOffice}
      </div>

    </div>

    {/* COPYRIGHT */}
    <div className="text-xs md:text-sm opacity-80 whitespace-nowrap">
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
