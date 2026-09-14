import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Clock,
  // MessageCircle,
  Music,
  Pause,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import bgUtama from "./assets/bg-utama.jpg";
// import brideImg from "./assets/brideImg.png";
// import groomImg from "./assets/groomImg.png";
import song from "./assets/Crazier.mp3";
import { useWedding } from "./context/WeddingContext";
import { RsvpSection } from "./components/RsvpSection";

// ============ DATA ============
const WEDDING_DATE = new Date("2026-10-10T18:00:00+07:00");

const couple = {
  bride: {
    name: "Ema",
    fullName: "Rosalia Ema Tutut",
    // parents: "Anak Tunggal",
  },
  groom: {
    name: "Ignasius",
    fullName: "Ignasius Usaros",
    // parents: "Anak ke dua dari 3 bersaudara",
  },
};

const events = [
  {
    title: "Pemberkatan",
    day: "Sabtu",
    date: "10",
    month: "Oktober",
    year: "2026",
    time: "18.00",
    place: "Sejabin, Dusun Engkersik 1, Desa Engkersik, Kec. Sekadau Hilir",
    maps: "https://www.google.com/maps/place/Engkersik,+Kec.+Sekadau+Hilir,+Kabupaten+Sekadau,+Kalimantan+Barat/@-0.0893511,111.0541635,13z/data=!3m1!4b1!4m6!3m5!1s0x2e01f89e4a57785b:0x59291de55ed2906c!8m2!3d-0.0783852!4d111.1056539!16s%2Fg%2F121p7c7k?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D",
  },
];

const loveStory = [
  {
    title: "Sebuah awal",
    year: "2021",
    desc: "Tidak ada yang menyangka perkenalan biasa di sebuah acara keluarga membawa kami sejauh ini. Bermula dari perkenalan hingga pertemanan sederhana, kebersamaan itu perlahan menumbuhkan rasa nyaman hingga kami memutuskan untuk berjalan bersama pada tahun 2023",
  },
  {
    title: "Jarak",
    year: "2024",
    desc: "Satu tahun berjalan mengenal satu sama lain lebih dekat, kami banyak belajar arti memahami dan mempercayai. Namun, tuntutan pekerjaan membuat kami harus menjalani hubungan jarak jauh. Berbagai benturan ego yang kami lalui, namun kami selalu saling menggenggam tangan satu sama lain.",
  },
  {
    title: "Komitmen",
    year: "2026",
    desc: "Tiga tahun berjalan, dengan versi hubungan yang di rasa sudah lebih matang. Di tahun 2026 ini kami mantap membawa komitmen ini ke tahap lamaran.",
  },
  {
    title: "Semuanya akan di mulai",
    year: "2026",
    desc: "Semua ujian yang di lalui ternyata cara mengajarkan kami untuk selalu saling menguatkan. Hari ini bukan sebuah akhir, melainkan awal yang baru. Sebuah ikatan awal untuk menuntun kami menuju ke pemberkatan suci yang kelak akan menjadikan kami satu di dalam Tuhan.",
  },
];

const bankAccounts = [
  { bank: "BRI", number: "2081-0102-2395-502", name: "Rosalia Ema Tutut" },
];

// ============ ANIMATION VARIANTS ============
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// function FlipCard({
//   name,
//   fullName,
//   image,
//   delay = 0,
// }: {
//   name: string;
//   fullName: string;
//   image: string;
//   delay?: number;
// }) {
//   const [flipped, setFlipped] = useState(false);

//   useEffect(() => {
//     // Mulai setelah delay awal
//     const startTimer = setTimeout(() => {
//       setFlipped(true); // pertama kali flip ke foto
//     }, 2200 + delay);

//     // Setelah itu berganti terus setiap 3.5 detik
//     const interval = setInterval(() => {
//       setFlipped((prev) => !prev);
//     }, 3500);

//     return () => {
//       clearTimeout(startTimer);
//       clearInterval(interval);
//     };
//   }, [delay]);

//   return (
//     <div className="text-center" style={{ perspective: "1000px" }}>
//       <motion.div
//         className="relative w-44 h-44 mx-auto mb-6"
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: flipped ? 180 : 0 }}
//         transition={{
//           duration: 0.85,
//           ease: [0.4, 0.0, 0.2, 1],
//         }}>
//         {/* ===== Sisi Depan (Nama) ===== */}
//         <div
//           className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-pink to-blush 
//                      flex flex-col items-center justify-center shadow-xl border-[5px] border-white"
//           style={{ backfaceVisibility: "hidden" }}>
//           <span className="font-script text-5xl text-brown leading-none">
//             {name.charAt(0)}
//           </span>
//           <span className="text-xs text-taupe mt-1 tracking-wider uppercase">
//             {name}
//           </span>
//         </div>

//         {/* ===== Sisi Belakang (Foto) ===== */}
//         <div
//           className="absolute inset-0 rounded-full overflow-hidden shadow-xl border-[5px] border-white"
//           style={{
//             backfaceVisibility: "hidden",
//             transform: "rotateY(180deg)",
//           }}>
//           <img
//             src={image}
//             alt={fullName}
//             className="w-full h-full object-cover object-top"
//           />
//         </div>
//       </motion.div>

//       {/* Nama lengkap */}
//       <h3 className="font-serif text-2xl text-white mb-1">{fullName}</h3>
//       <p className="text-sm text-white/80">
//         {name === couple.bride.name ? "Mempelai Wanita" : "Mempelai Pria"}
//       </p>
//     </div>
//   );
// }

// ============ HOOKS ============
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

// ============ COMPONENTS ============
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={`section-snap relative px-6 py-16 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      variants={sectionVariants}>
      {children}
    </motion.section>
  );
}

function Cover({ onOpen }: { onOpen: () => void }) {
  const { guestName } = useWedding();

  const displayGuestName = guestName
    ? guestName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : null;

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background + Ken Burns (hanya di cover) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-kenburns"
        style={{ backgroundImage: `url(${bgUtama})` }}
        animate={{ scale: [1, 1, 1.1, 1.1, 1] }}
        transition={{
          duration: 18,
          times: [0, 0.2, 0.5, 0.7, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center px-6">
        {displayGuestName && (
          <div className="mb-8">
            <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1 drop-shadow">
              Kepada Yth.
            </p>
            <p className="font-serif text-lg md:text-xl text-white drop-shadow-md">
              {displayGuestName}
            </p>
            <div className="w-16 h-px bg-white/40 mx-auto mt-3" />
          </div>
        )}

        <p className="text-white/80 tracking-[0.3em] text-sm uppercase mb-4 drop-shadow-md">
          The Engagement Of
        </p>

        <h1 className="font-script text-6xl md:text-7xl text-white mb-2 drop-shadow-lg">
          {couple.bride.name}
        </h1>
        <div className="flex items-center justify-center gap-4 my-3">
          <div className="w-12 h-px bg-white/70" />
          <Heart className="w-5 h-5 text-rose fill-rose drop-shadow" />
          <div className="w-12 h-px bg-white/70" />
        </div>
        <h1 className="font-script text-6xl md:text-7xl text-white mb-6 drop-shadow-lg">
          {couple.groom.name}
        </h1>

        <p className="font-serif text-lg text-white/90 mb-8 drop-shadow-md">
          {events[0].day}, {events[0].date} {events[0].month} {events[0].year}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="px-10 py-3.5 bg-white/95 text-brown rounded-full font-medium tracking-wide shadow-xl hover:bg-white transition-colors">
          Buka Undangan
        </motion.button>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-12">
          <ChevronDown className="w-6 h-6 text-white/80 mx-auto drop-shadow" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Countdown() {
  const time = useCountdown(WEDDING_DATE);
  const items = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm border border-white/40">
          <div className="font-serif text-2xl md:text-3xl font-semibold text-brown">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-xs text-taupe mt-1 tracking-wide">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      {subtitle && (
        <p className="text-white/70 text-sm tracking-[0.25em] uppercase mb-2 drop-shadow">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-white drop-shadow-md">
        {children}
      </h2>
      <div className="w-24 h-px bg-white/50 mx-auto mt-4" />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-sm text-taupe hover:text-brown transition-colors">
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {copied ? "Tersalin" : "Salin"}
    </button>
  );
}

function MusicPlayer({
  playing,
  setPlaying,
}: {
  playing: boolean;
  setPlaying: (v: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={song} type="audio/mpeg" />
      </audio>
      <button
        onClick={() => setPlaying(!playing)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brown text-cream shadow-lg flex items-center justify-center hover:bg-dark transition-colors"
        aria-label={playing ? "Pause music" : "Play music"}>
        {playing ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </button>
    </>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* ===== BACKGROUND TETAP DIAM (tidak ikut scroll) ===== */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-kenburns -z-10"
        style={{ backgroundImage: `url(${bgUtama})` }}
      />
      <div className="fixed inset-0 bg-black/45 -z-10" />

      <AnimatePresence>
        {!opened && (
          <Cover
            onOpen={() => {
              setOpened(true);
              setPlaying(true);
            }}
          />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <MusicPlayer playing={playing} setPlaying={setPlaying} />

          {/* HERO */}
          <AnimatedSection>
            <div className="text-center max-w-lg mx-auto">
              <p className="text-white/80 tracking-[0.3em] text-sm uppercase mb-3 drop-shadow">
                The Engagement Of
              </p>
              <h1 className="font-script text-5xl md:text-6xl text-white leading-tight drop-shadow-lg">
                {couple.bride.name} & {couple.groom.name}
              </h1>
              <p className="font-serif text-lg text-white/90 mt-4 mb-10 drop-shadow">
                {events[0].day}, {events[0].date} {events[0].month}{" "}
                {events[0].year}
              </p>

              <Countdown />

              <p className="mt-12 text-sm text-white/80 italic max-w-sm mx-auto leading-relaxed drop-shadow">
                "⁠⁠Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat
                yang mempersatukan dan menyempurnakan"
              </p>
              <p className="text-xs text-rose-200 mt-2 drop-shadow">
                ~ Kolose 3:14 ~
              </p>
            </div>
          </AnimatedSection>

          {/* BRIDE & GROOM */}
          <AnimatedSection>
            <SectionTitle subtitle="Mempelai">Bride & Groom</SectionTitle>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="text-center bg-white/85 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/40">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-soft-pink to-blush flex items-center justify-center mb-5 shadow-inner">
                  <span className="font-script text-4xl text-brown">E</span>
                </div>
                <h3 className="font-serif text-2xl text-brown mb-1">
                  {couple.bride.fullName}
                </h3>
                {/* <p className="text-sm text-taupe mt-3">{couple.bride.parents}</p> */}
              </div>

              <div className="text-center bg-white/85 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/40">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-soft-pink to-blush flex items-center justify-center mb-5 shadow-inner">
                  <span className="font-script text-4xl text-brown">I</span>
                </div>
                <h3 className="font-serif text-2xl text-brown mb-1">
                  {couple.groom.fullName}
                </h3>
                {/* <p className="text-sm text-taupe mt-3">{couple.groom.parents}</p> */}
              </div>
            </div>
          </AnimatedSection>

          {/* ACARA */}
          <AnimatedSection>
            <SectionTitle subtitle="Save The Date">Acara</SectionTitle>

            <div className="max-w-md mx-auto">
              {events.map((ev) => (
                <div
                  key={ev.title}
                  className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 text-center">
                  {/* Icon Kalender */}
                  <div className="flex justify-center mb-6">
                    <div className="w-11 h-11 rounded-full border border-brown/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-brown">
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div className="flex items-center justify-center gap-5 mb-2">
                    {/* Bulan (kiri) */}
                    <div className="flex flex-col items-center w-16">
                      <div className="h-px w-12 bg-brown/50 mb-1.5" />
                      <span className="text-sm tracking-[0.2em] text-brown uppercase font-medium">
                        {ev.month.slice(0, 3)}
                      </span>
                      <div className="h-px w-12 bg-brown/50 mt-1.5" />
                    </div>

                    {/* Tanggal besar */}
                    <span className="font-serif text-6xl md:text-7xl font-medium text-brown leading-none">
                      {ev.date}
                    </span>

                    {/* Tahun (kanan) */}
                    <div className="flex flex-col items-center w-16">
                      <div className="h-px w-12 bg-brown/50 mb-1.5" />
                      <span className="text-sm tracking-[0.2em] text-brown uppercase font-medium">
                        {ev.year}
                      </span>
                      <div className="h-px w-12 bg-brown/50 mt-1.5" />
                    </div>
                  </div>

                  {/* Hari */}
                  <p className="text-xs tracking-[0.25em] text-taupe uppercase mb-8">
                    {ev.day}
                  </p>

                  {/* Lokasi */}
                  <div className="flex flex-col items-center mb-7">
                    <MapPin
                      className="w-8 h-8 text-brown mb-2.5"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-brown leading-relaxed max-w-xs">
                      {ev.place}
                    </p>
                  </div>

                  {/* Waktu */}
                  <div className="flex flex-col items-center mb-8">
                    <Clock
                      className="w-8 h-8 text-brown mb-2.5"
                      strokeWidth={1.5}
                    />
                    <p className="text-base tracking-wide text-brown font-medium">
                      {ev.time}
                    </p>
                  </div>

                  {/* Tombol Maps */}
                  <a
                    href={ev.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm bg-brown text-cream rounded-full hover:bg-dark transition-colors">
                    <MapPin className="w-4 h-4" />
                    Lihat Maps
                  </a>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* LOVE STORY */}
          <AnimatedSection>
            <SectionTitle subtitle="Our Journey">Love Story</SectionTitle>
            <div className="max-w-2xl mx-auto space-y-5">
              {loveStory.map((story) => (
                <div
                  key={story.title}
                  className="bg-white/85 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40">
                  {story.year && (
                    <span className="text-xs tracking-widest text-rose uppercase">
                      {story.year}
                    </span>
                  )}
                  <h3 className="font-serif text-xl text-brown mt-1 mb-3">
                    {story.title}
                  </h3>
                  <p className="text-sm text-taupe leading-relaxed">
                    {story.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* WEDDING GIFT */}
          <AnimatedSection>
            <SectionTitle subtitle="Hadiah">Engagement Gift</SectionTitle>
            <p className="text-center text-sm text-white/80 max-w-md mx-auto mb-8 leading-relaxed drop-shadow">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Namun jika memberi adalah ungkapan tanda kasih, kami akan senang
              hati menerimanya.
            </p>
            <div className="max-w-lg mx-auto space-y-4">
              {bankAccounts.map((acc) => (
                <div
                  key={acc.bank}
                  className="bg-white/85 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between border border-white/40 shadow-lg">
                  <div>
                    <p className="text-xs text-taupe uppercase tracking-wide">
                      {acc.bank}
                    </p>
                    <p className="font-mono text-lg text-brown tracking-wider">
                      {acc.number}
                    </p>
                    <p className="text-sm text-taupe">{acc.name}</p>
                  </div>
                  <CopyButton text={acc.number} />
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* RSVP */}
          <AnimatedSection>
            <RsvpSection />
          </AnimatedSection>

          {/* FOOTER */}
          <AnimatedSection className="!min-h-[40dvh]">
            <div className="text-center">
              <p className="font-script text-3xl text-white mb-2 drop-shadow-lg">
                {couple.bride.name} & {couple.groom.name}
              </p>
              <p className="text-xs text-white/70 tracking-widest uppercase drop-shadow">
                {events[0].date} {events[0].month} {events[0].year}
              </p>
              <p className="text-xs text-white/50 mt-6 drop-shadow">
                Made with{" "}
                <Heart className="inline w-3 h-3 text-rose fill-rose" /> for our
                special day
              </p>
            </div>
          </AnimatedSection>
        </>
      )}
    </div>
  );
}
