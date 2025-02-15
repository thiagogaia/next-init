import { cookies, headers } from "next/headers"
import { NextRequest } from "next/server"

export const revalidate = 60
/* app/items/[slug]/route.js	/items/a	Promise<{ slug: 'a' }>
app/items/[slug]/route.js	/items/b	Promise<{ slug: 'b' }>
app/items/[slug]/route.js	/items/c	Promise<{ slug: 'c' }> */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies()
  const cookiesDoNada = cookieStore.getAll()
  const cookiesDoREquest = request.cookies.getAll()

  const headersList = await headers()
  const referer = headersList.get('referer')

  const requestHeaders = new Headers(request.headers)

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.toString()
  return Response.json({
    baah: "Armandinho é o terror neh meo.",
    status: 200,
    cookies: cookiesDoNada,
    cookiesDoRequest: cookiesDoREquest,
    referer: referer,
    requestHeaders: requestHeaders,
    query: query
  })
}

export async function POST(request: Request) {
  const res = await request.json()

  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  
  return Response.json({
    res,
    formatData: formData.toString(),
  })
}