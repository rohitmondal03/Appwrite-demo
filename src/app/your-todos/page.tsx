"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ToDosForm from "@/components/todos";
import { useAuth } from "@/hooks/use-auth";


export default function ToDosPage() {
  const router= useRouter();
  const { isSession } = useAuth();


  useEffect(() => {
    if(!isSession) router.push("/log-in")
  }, [isSession, router]) 


  return (
    <section>
      <ToDosForm />
    </section>
  )
}
