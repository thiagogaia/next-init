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

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: string;
}

interface ResponseProps {
  posts: PostProps[];
}

export default async function PostsPage() {
  const response = await fetch("https://dummyjson.com/posts");
  const data: ResponseProps = await response.json();
  console.log("📢 [page.tsx:36]", data);
  async function handleServer() {
    'use server'
    console.log('server do nada')
    // alert('bah')
  }
  return (
    <>
      <h1>Todos os posts</h1>
      <div>bah meo é o gremio neh</div>
      <ButtonClient />
      <Button onClick={handleServer} type="button">Botão SERVER</Button>
      <>
        {data.posts.map((post) => (
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
