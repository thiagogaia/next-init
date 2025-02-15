'use client'

import { useState } from "react";

export default function Time() {
  const [relogio, setRelogio] = useState(0);
  setTimeout(() => {
    setRelogio(relogio+1)
  }, 1000)
  return (
    <h1>Tempo passando Component Client: {relogio}s</h1>
  );
}