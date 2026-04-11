"use client";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Islamic Fund Management",
      img: "/investment-1.png",
      description:
        "We assist retail and institutional clients in managing their funds in accordance with Islamic principles, providing practical advice for making halal investments.",
      btn: "Learn more",
      bg: "bg-[#DEEAFF]",
    },
    {
      title: "International Relations",
      img: "/investment-2.png",
      description:
        "We establish connections with local and international organizations to promote Islamic financial systems and create partnerships that support financial inclusion.",
      btn: "Learn more",
      bg: "bg-[#D5F6ED]",
    },
    {
      title: "Education and Training",
      img: "/investment-3.png",
      description:
        "We provide comprehensive education and training programs to help individuals and institutions understand and implement Islamic financial principles effectively.",
      btn: "Learn more",
      bg: "bg-[#FBE2F4]",
    },
    {
      title: "For Islamic Banks",
      img: "/investment-4.png",
      description:
        "We offer specialized guidance for managing funds in alignment with Islamic principles, helping Islamic banks make informed, halal investment decisions.",
      btn: "Learn more",
      bg: "bg-[#E2DBF9]",
    },
    {
      title: "Islamic Capital Market",
      img: "/investment-5.png",
      description:
        "We provide expert guidance for managing funds in alignment with Islamic principles, helping you make informed, halal investment decisions.",
      btn: "Learn more",
      bg: "bg-[#EBEFF3]",
    },
    {
      title: "Shariah Compliance Audit",
      img: "/investment-6.png",
      description:
        "We provide specialized audit services to ensure compliance with Shariah principles, helping institutions maintain transparency and adherence to Islamic financial standards.",
      btn: "Learn more",
      bg: "bg-[#FFEDB6]",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Services
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Expert guidance for managing funds in alignment with Islamic principles,
          helping you make informed, halal investment decisions.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {services.map((s, i) => (
          <div
            key={i}
            className={`${s.bg} rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            
            {/* TOP */}
            <div className="flex items-center gap-7">
              <Image
                width={85}
                height={85}
                src={s.img}
                alt={s.title}
                className="object-contain"
              />
              <h3 className="font-semibold text-gray-900 text-[24px]">
                {s.title}
              </h3>
            </div>

            {/* DESC */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {s.description}
            </p>

            {/* BUTTON */}
            <button className="cursor-pointer mt-auto w-full bg-[#152032] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#1f2c44] transition">
              {s.btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}