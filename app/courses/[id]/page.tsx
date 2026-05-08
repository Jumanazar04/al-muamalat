'use client'

import { request } from "@/services/request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/dist/client/components/navigation";
import { Check, Circle } from "lucide-react";

function CoursesDetails() {
  const params = useParams();

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ["course", params?.id],
    queryFn: () => request.get(`/courses/${params?.id}`).then(res => res?.data?.data),
  });

  if (isLoading) return <div className="text-center py-20 text-gray-400">Yuklanmoqda...</div>;
  if (isError)   return <div className="text-center py-20 text-red-500">Xatolik yuz berdi</div>;

  // -------------------------------------------------------
  // Ma'lumotlar API javobiga qarab moslashtiring
  // -------------------------------------------------------
  const whatYouLearn: string[] = course?.what_you_learn ?? [];
  const whyStudy: string[]     = course?.why_study      ?? [];
  const services = [
    {
      title: course?.service_1_title ?? "Space for creative ideas",
      desc:  course?.service_1_desc  ?? "Cyber Square nourishes young aspiring minds to get a clear vision of their ideas. We guide them in analyzing and building their vision and ideas into reality.",
    },
    {
      title: course?.service_2_title ?? "Engaging and fun curriculum",
      desc:  course?.service_2_desc  ?? 'Our goal is to create an engaging system that provides exciting activities so children can understand the programming concepts thoroughly so that they can perform them on their own. With Cyber Square kids have fun while they learn without frustrations.',
    },
    {
      title: course?.service_3_title ?? "Professional teaching methods",
      desc:  course?.service_3_desc  ?? "We professionals at Cyber Square, have developed an in-depth understanding in how to teach kids and how to code. Moreover, we believe in exposing kids to real programming languages and professional tools.",
    },
  ];
  const paymentFeatures: string[] = course?.payment_features ?? [
    "Space for creative ideas",
    "Engaging and fun curriculum",
    "Professional teaching methods",
    "Learn from AI & Data Science experts",
    "Courses by IIT, NIT, and IIM alumni",
    "UK certification upon completion",
    "Personalized one-to-one training",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">

      {/* ── 1. Course Description ── */}
      <section>
        <div
          className="text-base text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: course?.description_uz
              ?.replace(/\\n/g, "")
              ?.replace(/\\"/g, '"'),
          }}
        />
      </section>

      {/* ── 2. International Educational Programs ── */}
      <section className=" p-8">
        {/* Header */}
        <div className="text-center py-3 px-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            International educational programs
          </h2>
        </div>
        <p className="text-center text-gray-500 text-sm mb-8">
          {course?.programs_subtitle ??
            "Al Muamalat Education's international study programs offer an in-depth learning experience at leading Islamic financial institutions around the world."}
        </p>

        {/* What you'll learn  +  Why study */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="bg-[#F3F8FF] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              What you'll learn
            </h3>
            <ul className="space-y-3">
              {whatYouLearn.length > 0
                ? whatYouLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-teal-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))
                : (
                  // Fallback namuna
                  [
                    "Gain a comprehensive understanding of Islamic finance principles and ethics.",
                    "Build a portfolio with 10+ real-world projects in Islamic financial services.",
                    "Learn to develop and manage Sharia-compliant financial products.",
                    "Master key concepts in Islamic banking, investment, and wealth management.",
                    "Understand the fundamentals of risk management in Islamic finance.",
                    "Develop skills to work as an Islamic finance consultant.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check size={16} className="text-teal-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))
                )}
            </ul>
          </div>

          {/* Right */}
          <div className="bg-[#F3F8FF] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Why should you study at "AL-MUAMALAT"?
            </h3>
            <ul className="space-y-3">
              {(whyStudy.length > 0
                ? whyStudy
                : ["Lifetime access", "Video lessons", "Tests", "Projects", "Downloadable resources", "Access via mobile device"]
              ).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <Circle size={8} className="fill-gray-500 text-gray-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Brief information about the course ── */}
      <section>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Brief information about the course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-teal-500 font-semibold text-lg mb-2 flex items-center gap-1">
              Videodarslar <span className="text-xs">▼</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course?.video_info ??
                "Lessons are posted on the platform in the form of videos, which can be viewed anytime and anywhere. Video lessons are updated."}
            </p>
          </div>
          <div>
            <h3 className="text-teal-500 font-semibold text-lg mb-2 flex items-center gap-1">
              Tasks <span className="text-xs">▼</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course?.task_info ??
                "Test tasks are given at the end of the module. Only students who successfully pass the test will be able to access the lessons in the next module."}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Our Services + Payment ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-gray-200">
        {/* Our Services – teal card */}
        <div className="bg-teal-500 text-white p-8 space-y-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          {services.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check size={18} className="mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-base">{s.title}</h4>
                <p className="text-sm text-teal-100 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="bg-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>
            <ul className="space-y-3 mb-8">
              {paymentFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <Circle size={8} className="fill-gray-500 text-gray-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-fit bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold py-3 px-8 rounded-lg">
            Purchase Now
          </button>
        </div>
      </section>

    </div>
  );
}

export default CoursesDetails;