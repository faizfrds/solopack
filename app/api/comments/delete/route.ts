import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { LocationSubscriptionValidator } from "@/lib/validator/location";
import { z } from "zod";

export async function POST(req: Request) {
    try {
      const session = await getAuthSession()
  
      if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
      }
  
      const body = await req.json()
      const { id } = body;

      console.log(id)
  
      // check if user has already subscribed or not
    //   const commentExists = await db.comment.findFirst({
    //     where: {
    //       id,
    //     },
    //   })

    //   if (!commentExists) return new Response("No comment found", {status: 500})
  
      await db.comment.delete({
        where: {
          id,
        },
      })

      console.log("SUCEES")
  
      return new Response(id)
    } catch (error) {
      (error)
      if (error instanceof z.ZodError) {
        return new Response(error.message, { status: 400 })
      }
  
      return new Response(
        'Could not unsubscribe from subreddit at this time. Please try later',
        { status: 500 }
      )
    }
  }