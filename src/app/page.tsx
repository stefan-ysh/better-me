"use client";
const currentDate = new Date();
const dateStr =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  currentDate.getDate().toString().padStart(2, "0");
location.href = "/daily/" + dateStr;

export default function Home() {
  return null
}
