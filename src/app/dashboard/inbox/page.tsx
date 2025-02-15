// 'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Time from "./time";
// import { useState } from "react";

export const revalidate = 17;
export default function Inbox() {
  const randNumber = Math.random() * 77;
  /* const [relogio, setRelogio] = useState(0);
    setTimeout(() => {
      setRelogio(relogio+1)
    }, 1000) */
  return (
    <>
      <h1>numero randômico do nada: {randNumber}</h1>
      <Button variant={"outline"} asChild>
        <Link href={"/dashboard"}>Vai zé</Link>
      </Button>
      {/* <h1>Tempo passando Page Client: {relogio}s</h1> */}
      <Time />
    </>
  );
}
