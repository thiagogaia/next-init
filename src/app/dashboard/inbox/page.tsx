import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Inbox() {
  return (
    <>
      <Button variant={'outline'} asChild>
        <Link href={'/dashboard'}>Vai zé</Link>
      </Button>
    </>
  )
}