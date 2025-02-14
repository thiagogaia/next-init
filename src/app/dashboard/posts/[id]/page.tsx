import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { PostProps } from "../page";

export default async function DatailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await new Promise(resolve => setTimeout(resolve, 2000))
  const response = await fetch("https://dummyjson.com/posts/" + id);
  const post: PostProps = await response.json();
  return (
    <div>
      <h1>detalhe do post: {id}</h1>
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
    </div>
  );
}
