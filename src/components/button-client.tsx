"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export default function ButtonClient() {
  const [paranaue, setParanaue] = useState('Paranauê')
  function mudaParanaue() {
    setParanaue("Paraná!")
  }
  return (
    <>
      <p>{paranaue}</p>
      <Button variant={'outline'} onClick={mudaParanaue}>Botão maroto</Button>
    </>
  )
}