import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonClient from "@/components/button-client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import Link from "next/link";
import ButtonSAve from "@/components/button-save";
import FormList from "./form-list";
import { Suspense } from "react";
import FormList2 from "./form-list2";
export const metadata: Metadata = {
  title: "O gremio",
  description: "o trem funfa.",
  openGraph: {
    title: "é o grêmio neh",
    description: "gremio",
    images: [
      "https://thumbs.dreamstime.com/z/green-landscape-14217007.jpg?ct=jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: string;
}

export interface ResponseProps {
  posts: PostProps[];
  message: string;
  total: number;
}

export default async function PostsPage() {
  /* const response = await fetch("https://dummyjson.com/posts", {
    cache: 'force-cache',
    next: {
      revalidate: 60
    }
  });
  const data: ResponseProps = await response.json(); */
  console.log("📢 [page.tsx:36]", "LOAD");
  async function handleServer() {
    "use server";
    console.log("server do nada");
    const response = await fetch("https://dummyjson.com/posts");
    const data: ResponseProps = await response.json();
    console.log("📢 [page.tsx:53]", data);
    // alert('bah')
  }

  async function handleSearchUsers(formData: FormData) {
    "use server";
    const userId = formData.get("userId");
    console.log(userId, "fala sério...");
    const response = await fetch("https://dummyjson.com/posts/user/" + userId);
    const data: ResponseProps = await response.json();
    console.log("📢 [page.tsx:72]", data);
  }
  return (
    <>
      <h1>Todos os posts</h1>
      <div>bah meo é o gremio neh</div>
      <ButtonClient />
      <Button onClick={handleServer} type="button">
        Botão SERVER
      </Button>

      <Suspense fallback={<h1>Carregando componente...</h1>}>
        <FormList />
      </Suspense>
      {/* <Card>
        <CardHeader>
          <CardTitle>POSTa vei</CardTitle>
          <CardDescription>BAH MEO</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSearchUsers} className="space-y-8">
            <Input
              type="text"
              placeholder="busca então quero vê"
              name="userId"
            />
            {/* <Button type="submit" variant={"secondary"}>
              envia
            </Button> *
            <ButtonSAve />
            {/* <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button> *
          </form>
        </CardContent>
        <CardFooter>tenso: {data.message}</CardFooter>
      </Card> */}

      {/* {data.posts.length && data.posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>BAH MEO</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard/posts/" + post.id}>vai pro post</Link>
            </Button>
          </CardContent>
          <CardFooter>
            <p>usuario: {post.userId}</p>
          </CardFooter>
        </Card>
      ))} */}
    </>
  );
}
