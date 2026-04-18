"use client";
import Link from "next/link";
import CourseCard from "./CourseCard.tsx";
import { useState } from "react";



export default function Courses() {
const [courses] = useState([
    {
      img: "/course1.png",
      title: "Various versions have evolved over the years",
      rating: 4,
      reviews: 102,
      price: 500,
      category: "Business",
    },
    {
      img: "/course2.png",
      title: "Many desktop publishing packages and web page editors",
      rating: 5,
      reviews: 250,
      price: 700,
      category: "Design",
    },
    {
      img: "/course3.png",
      title: "Lorem Ipsum is simply dummy text",
      rating: 3,
      reviews: 50,
      price: 300,
      category: "Development",
    },
    {
      img: "/course4.png",
      title: "It has survived not only five centuries",
      rating: 4,
      reviews: 150,
      price: 600,
      category: "Marketing",
    },
    {
      img: "/course5.png",
      title: "Contrary to popular belief",
      rating: 5,
      reviews: 300,
      price: 800,
      category: "Education",
    },
    {
      img: "/course6.png",
      title: "Lorem Ipsum is simply dummy text",
      rating: 4,
      reviews: 100,
      price: 400,
      category: "Design",
    },
  ]);

  return (

<div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">
  <div className="max-w-6xl mx-auto">

    <div className="flex gap-3 mb-8">
      <Link href="/profile" className="px-5 py-2 rounded-lg border border-gray-300 bg-white">
        Profile
      </Link>
      <Link href="/courses" className="px-5 py-2 rounded-lg bg-[#0f9b76] text-white">
        Course
      </Link>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} course={course} />
      ))}
    </div>

  </div>
</div>
    );
}