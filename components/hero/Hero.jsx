import Image from "next/image";
import herobig from "../../public/hero-big.png";

export default function HeroSection() {
  return (
    <section className="relative bg-[#009688] w-full overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute w-20 h-20 rounded-full bg-white/10 top-1/4 left-[55%]" />
        <span className="absolute w-10 h-10 rounded-full bg-white/10 top-[55%] left-[62%]" />
        <span className="absolute w-6 h-6 rounded-full bg-white/10 top-[30%] left-[70%]" />
        <span className="absolute w-4 h-4 rounded-full bg-white/10 top-[65%] left-[75%]" />
        <span className="absolute w-12 h-12 rounded-full bg-white/10 top-[10%] left-[80%]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch min-h-[340px]">
        {/* LEFT — Text */}
        <div className="flex-1 flex flex-col justify-center gap-5 px-8 md:px-12 py-12 z-10">
          {/* Badge */}
          <span className="inline-flex items-center w-fit bg-white/15 border border-white/30 text-white text-sm px-4 py-1.5 rounded-full">
            Seeking Knowledge is an Obligation in Islam
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl/snug lg:text-5xl/relaxed font-extrabold text-white leading-tight tracking-tight ">
            Enhance Your<br />
            Understanding of Islamic<br />
            Ethics with Al-Muamalat
          </h1>

          {/* CTA + Reviews */}
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold text-sm px-5 py-3 rounded-lg tracking-wide transition-colors">
              STUDENTS' OPINION
            </button>

            <div className="flex items-center gap-3">
              {/* Avatar stack */}
              <div className="flex">
                {[
                  { src: "/ellipis-1.png", alt: "Student 1" },
                  { src: "/ellipis-2.png", alt: "Student 2" },
                  { src: "/ellipis-3.png", alt: "Student 3" },
                ].map((av, i) => (
                  <Image
                    key={i}
                    src={av.src}
                    alt={av.alt}
                    width={32}
                    height={32}
                    className=" h-8 rounded-full border-2 border-[#009688] object-cover -ml-2 first:ml-0"
                  />
                ))}
              </div>

              {/* Stars + count */}
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-3.5 h-3.5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-xs text-white/75">(10k+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative flex items-end justify-center w-full md:w-[380px] flex-shrink-0 z-10">
          {/* Stat card */}
          <div className="absolute top-6 left-4 bg-white/95 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-extrabold text-teal-800 leading-none">250k</p>
              <p className="text-xs text-slate-500 mt-0.5">Assisted Student</p>
            </div>
          </div>

          <Image
            src={herobig}
            alt="Student"
            className=" md:w-112 md:h-112 object-cover object-top rounded-t-2xl"
            width={320}
            height={340}
          />
        </div>
      </div>
    </section>
  );
}