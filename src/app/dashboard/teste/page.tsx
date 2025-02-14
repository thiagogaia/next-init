"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
export default function PageTeste() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(data => setPosts(data.posts))
  }, [])
  
  return (
    <>
      <h1>Todos os posts</h1>
      <div>bah meo é o gremio neh</div>
      <>
        {posts.map((post: any) => (
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