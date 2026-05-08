"use client";

import Link from "next/link";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/request.js";
import { CircularProgress } from "@mui/material";

export default function Courses() {
  const { data: dataCourses, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      request.get("/courses/main").then((res) => res?.data),
  });

  const courses: any[] = dataCourses?.data || [];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Tab buttons */}
        <div style={styles.tabs}>
          <Link href="/profile" style={styles.tabInactive}>
            Profile
          </Link>
          <Link href="/courses" style={styles.tabActive}>
            Courses
          </Link>
        </div>

        {/* States */}
        {isLoading && (
          <div style={styles.center}>
            <CircularProgress sx={{ color: "#009688" }} />
          </div>
        )}

        {isError && (
          <div style={styles.center}>
            <p style={{ color: "#ef4444", fontSize: "15px" }}>
              Ma'lumotlarni yuklashda xato!
            </p>
          </div>
        )}

        {!isLoading && !isError && courses.length === 0 && (
          <div style={styles.center}>
            <p style={{ color: "#6b7280", fontSize: "15px" }}>
              Kurslar topilmadi.
            </p>
          </div>
        )}

        {/* Course Grid */}
        {!isLoading && !isError && courses.length > 0 && (
          <div style={styles.grid}>
            {courses.map((course: any) => (
              <CourseCard key={course?.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "32px 24px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  tabs: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
  },
  tabActive: {
    padding: "10px 24px",
    borderRadius: "999px",
    backgroundColor: "#009688",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "none",
    border: "1.5px solid #009688",
  },
  tabInactive: {
    padding: "10px 24px",
    borderRadius: "999px",
    backgroundColor: "transparent",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "none",
    border: "1.5px solid #d1d5db",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  },
};