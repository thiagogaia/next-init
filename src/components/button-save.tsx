"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function ButtonSAve() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"secondary"} disabled={pending}>
      {pending ? 'Carregando...' : 'Salvar'}
    </Button>
  );
}
