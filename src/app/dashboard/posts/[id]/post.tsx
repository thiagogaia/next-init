import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PostProps } from "../page";

export default async function Post({id}: {id: string}) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const response = await fetch("https://dummyjson.com/posts/" + id);
  const post: PostProps = await response.json();
  return (
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
  );
}
