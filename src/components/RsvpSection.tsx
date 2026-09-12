import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRsvp } from "../hooks/useRsvp";
import { useWedding } from "../context/WeddingContext";

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

export function RsvpSection() {
  const { guestName } = useWedding();
  const { rsvpList, submitRsvp, submitting, loading, attendanceCount } =
    useRsvp();

  const [form, setForm] = useState({
    name: "",
    message: "",
    attendance: "Hadir" as "Hadir" | "Tidak Hadir",
  });

  // Auto-isi nama dari query ?to=
  useEffect(() => {
    if (guestName) {
      // ubah "budi-santoso" → "Budi Santoso"
      const prettyName = guestName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setForm((prev) => ({ ...prev, name: prettyName }));
    }
  }, [guestName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.message.trim().length < 2) return;

    try {
      await submitRsvp({
        name: form.name.trim(),
        message: form.message.trim(),
        attendance: form.attendance,
        guestParam: guestName || undefined,
      });

      setForm({
        name: guestName
          ? guestName
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "",
        message: "",
        attendance: "Hadir",
      });
    } catch {
      alert("Gagal mengirim ucapan. Silakan coba lagi.");
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <SectionTitle subtitle="Ucapan">RSVP & Wishes</SectionTitle>

      <p className="text-center text-sm text-white/80 max-w-md mx-auto mb-6 drop-shadow">
        Sampaikan ucapan & doa terbaik untuk kedua mempelai.
      </p>

      {/* Ringkasan kehadiran */}
      <div className="flex justify-center gap-6 mb-8 text-sm text-white/80">
        <span>
          Hadir: <strong className="text-white">{attendanceCount.hadir}</strong>
        </span>
        <span>
          Tidak Hadir:{" "}
          <strong className="text-white">{attendanceCount.tidakHadir}</strong>
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 mb-12"
      >
        <input
          type="text"
          placeholder="Nama Anda"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/85 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-rose/40 text-sm"
          required
        />
        <textarea
          placeholder="Ucapan & doa (min. 2 karakter)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/85 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-rose/40 text-sm resize-none"
          required
        />
        <div className="flex gap-4 justify-center">
          {(["Hadir", "Tidak Hadir"] as const).map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm text-white/90 cursor-pointer drop-shadow"
            >
              <input
                type="radio"
                name="attendance"
                value={opt}
                checked={form.attendance === opt}
                onChange={() => setForm({ ...form, attendance: opt })}
                className="accent-brown"
              />
              {opt}
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-white/95 text-brown rounded-xl font-medium hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
        >
          <MessageCircle className="w-4 h-4" />
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      {/* List ucapan */}
      <div className="max-w-md mx-auto space-y-3 max-h-80 overflow-y-auto">
        {loading && (
          <p className="text-center text-sm text-white/60 py-6">
            Memuat ucapan...
          </p>
        )}

        {!loading && rsvpList.length === 0 && (
          <p className="text-center text-sm text-white/60 py-6 drop-shadow">
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        )}

        {rsvpList.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/85 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-brown text-sm">{w.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  w.attendance === "Hadir"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {w.attendance}
              </span>
            </div>
            <p className="text-sm text-taupe">{w.message}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}