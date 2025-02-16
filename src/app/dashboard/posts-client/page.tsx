"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { create } from "@/app/dashboard/posts-client/actionsServer";
import { PostProps } from "../posts/page";
export default function PageTeste() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  function armandinhoEhOTerror() {
    create();
    console.log("bahmeo");
  }
  return (
    <>
      <h1>Todos os posts</h1>
      <div>bah meo é o gremio neh</div>
      <Button onClick={() => alert("BAH. Armandinho é o terror neh meo.")}>
        alert do nada para component client
      </Button>
      <Button variant={"outline"} onClick={armandinhoEhOTerror}>
        o meuzinho;
      </Button>
      <>
        {!posts.length && <>carrega ae...</>}
        {posts.length > 0 &&
          posts.map((post: PostProps) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>BAH MEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.body}</p>
              </CardContent>
              <CardFooter>
                <p>usuario: {post.userId}</p>
              </CardFooter>
            </Card>
          ))}
      </>
    </>
  );
}
