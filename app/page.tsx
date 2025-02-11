"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard"); // Redirect to /dashboard
  }, [router]); // Agregamos router como dependencia

  return null; // Avoid rendering anything
}
