import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { LocationValidator } from "@/lib/validator/location";
import { SearchValidator } from "@/lib/validator/search";
import toast from "react-hot-toast";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get(`q`)

  if (!q) return new Response(`Invalid query`, {status: 400})
  // const body = await req.json()
  // const {name} = SearchValidator.parse(body) 

  const res = await db.location.findMany({
      where: {
        name: {
          startsWith: q,
        },
      },
      take: 5,
    });
  return new Response(JSON.stringify(res))

}
