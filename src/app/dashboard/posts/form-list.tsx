"use client";
import ButtonSAve from "@/components/button-save";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ResponseProps } from "./page";
import { useFormStatus } from "react-dom";

export default function FormList() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseProps | undefined>(undefined);

  async function fetchData(userId: string = "") {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const url = userId
        ? "https://dummyjson.com/posts/user/" + userId
        : "https://dummyjson.com/posts";
      const response = await fetch(url, {
        cache: "force-cache",
        next: {
          revalidate: 60,
        },
      });

      const responseData: ResponseProps = await response.json();
      console.log("📢 [form-list.tsx:35]", responseData);
      setData(responseData);
    } catch (error) {
      setData(undefined);
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchUsers(formData: FormData) {    
    const userId = formData.get("userId") as string;
    if (!userId) return;
    console.log("📢 [form-list.tsx:44]", userId);
    fetchData(userId);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Card>
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
            <Button type="submit" variant={"default"} disabled={isLoading}>
              {isLoading ? "Carregando..." : "Buscar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>tenso: {data?.message}</CardFooter>
      </Card>

      {isLoading && <h1>Carregado...</h1>}

      {!isLoading && data?.total === 0 && (
        <div className="text-gray-500 text-center mt-4">
          Nenhum resultado encontrado.
        </div>
      )}

      {data?.posts && (
        data.posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>BAH MEO</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
              <Button variant={"default"} asChild>
                <Link href={"/dashboard/posts/" + post.id}>vai pro post</Link>
              </Button>
            </CardContent>
            <CardFooter>
              <p>usuario: {post.userId}</p>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
}
