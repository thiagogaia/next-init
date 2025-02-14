import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LoginPage from '@/app/login/page'
export default function Home() {
  return (
    <>
      <LoginPage />
      {/* <Button asChild>
        <Link href={'/dashboard'}>Vai Pro Dash</Link>
      </Button> */}
    </>
  );
}
