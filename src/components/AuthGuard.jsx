"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import auth from "@/data/api/server/auth";
import Loader from "./Loader";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      auth.logout();
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <Loader />;

  return <>{children}</>;
}
