
import { Suspense } from "react";

import Post from "./post";

export default async function DatailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <h1>detalhe do post: {id}</h1>
      <Suspense fallback={<h1>carregando do suspense.. Streaming!</h1>}>
        <Post id={id} />
      </Suspense>
    </div>
  );
}
