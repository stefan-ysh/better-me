"use client";
import { useRouter } from "next/navigation";
const currentDate = new Date();
const dateStr =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  currentDate.getDate().toString().padStart(2, "0");
export const runtime = 'edge' // 'nodejs' (default) | 'edge'
export default function Home() {
  const router = useRouter();
  router.push("/daily/" + dateStr);
  return null;
}
