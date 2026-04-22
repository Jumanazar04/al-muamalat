// "use client";

// import {
//   Avatar,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Paper,
//   Grid,
// } from "@mui/material";
// import { FiSave } from "react-icons/fi";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function ProfilePage() {
//   const pathname = usePathname();

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
//       <div className="w-full max-w-5xl">
        
//         {/* Tabs */}
//         <div className="flex gap-3 mb-8">
//           <Link href="/profile">
//             <Button
//               variant={pathname === "/profile" ? "contained" : "outlined"}
//               sx={tabStyle(pathname === "/profile")}
//             >
//               Profile
//             </Button>
//           </Link>
//           <Link href="/courses">
//             <Button
//               variant={pathname === "/courses" ? "contained" : "outlined"}
//               sx={tabStyle(pathname === "/courses")}
//             >
//               Courses
//             </Button>
//           </Link>
//         </div>

//         {/* Card */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: "16px",
//             border: "1px solid #e5e7eb",
//             p: { xs: 3, md: 5 },
//             boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 2,
//               mb: 4,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Avatar
//                 src="/avatar.jpg"
//                 alt="User"
//                 sx={{ width: 64, height: 64 }}
//               />
//               <Box>
//                 <Typography variant="h6" fontWeight={600}>
//                   Alexa Rawles
//                 </Typography>
//               </Box>
//             </Box>

//             <Button
//               variant="contained"
//               startIcon={<FiSave />}
//               sx={{
//                 borderRadius: "10px",
//                 textTransform: "none",
//                 backgroundColor: "#0f9b76",
//                 px: 3,
//                 py: 1,
//                 "&:hover": { backgroundColor: "#0d8a69" },
//               }}
//             >
//               Save
//             </Button>
//           </Box>

//           {/* Form */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Box>
//               <Typography sx={labelStyle}>First Name</Typography>
//               <TextField placeholder="Your First Name" fullWidth sx={inputStyle} />
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box>
//               <Typography sx={labelStyle}>Last Name</Typography>
//               <TextField placeholder="Your First Name" fullWidth sx={inputStyle} />
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box>
//               <Typography sx={labelStyle}>Address</Typography>
//               <TextField placeholder="Enter Your Address" fullWidth sx={inputStyle} />
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box>
//               <Typography sx={labelStyle}>Birthday</Typography>
//               <TextField placeholder="Enter Your Birthday" fullWidth sx={inputStyle} />
//             </Box>
//           </Grid>
//         </Grid>
//         </Paper>
//       </div>
//     </div>
//   );
// }

// const tabStyle = (active) => ({
//   borderRadius: "10px",
//   textTransform: "none",
//   fontWeight: 500,
//   backgroundColor: active ? "#0f9b76" : "white",
//   borderColor: active ? "#0f9b76" : "#ddd",
//   color: active ? "white" : "#555",
//   px: 3,
//   "&:hover": {
//     backgroundColor: active ? "#0d8a69" : "#f9fafb",
//     borderColor: "#0f9b76",
//   },
// });

// const labelStyle = {
//   mb: "6px",
//   fontSize: "14px",
//   fontWeight: 500,
//   color: "#374151",
// };

// const inputStyle = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#fafafa",
//     "& fieldset": { borderColor: "#e5e7eb" },
//     "&:hover fieldset": { borderColor: "#0f9b76" },
//     "&.Mui-focused fieldset": { borderColor: "#0f9b76" },
//   },
// };