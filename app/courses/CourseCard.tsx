import Link from "next/link";

interface Course {
  id: number | string;
  name?: string;
  title?: string;
  price?: number | string;
  image?: string;
  img?: string;
  thumbnail?: string;
  [key: string]: any;
}

const API_URL = "https://api.al-muamalat.uz/api";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    console.log("Rendering CourseCard for course:", course);
  const courseId = course?.course_id;
  const title = course?.name_uz || course?.title || "Course";
  const price = course?.price ?? "—";
  const image = course?.images?.[0]?.src
    ? `${API_URL}/uploads/images/${course.images[0].src}`
    : course?.img || course?.thumbnail || null;

  return (
    <div style={styles.card}>
      {/* Image / Banner */}
      <div style={styles.imgWrapper}>
        {image ? (
          <img src={image} alt={title} style={styles.img} />
        ) : (
          <div style={styles.imgPlaceholder}>
            <span style={styles.placeholderText}>
              {title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.title}>{title}</h3>

        <div style={styles.footer}>
          <span style={styles.price}>
            {typeof price === "number"
              ? price.toLocaleString("uz-UZ") + " soums"
              : price}
          </span>
          <Link href={`/courses/${courseId}`} style={styles.btn}>
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  },
  imgWrapper: {
    width: "100%",
    aspectRatio: "16/9",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#1a5c3a",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imgPlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #1a5c3a 60%, #e86c1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: "48px",
    fontWeight: "800",
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "4px",
  },
  body: {
    padding: "18px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    flex: 1,
  },
  title: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.45",
    margin: 0,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  price: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },
  btn: {
    backgroundColor: "#009688",
    color: "#ffffff",
    padding: "10px 22px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
};