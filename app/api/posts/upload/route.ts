import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validator/post";
import toast from "react-hot-toast";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user){
            return new Response("Unauthorized", {status: 401})
        }

        const body = await req.json()
        console.log(body, "AJF")
        const {title, content, locationId} = PostValidator.parse(body) 

        // const postExists = await db.post.findFirst({
        //     where: {
        //         title: title,
        //         content: content,
        //         locationId: locationId,
        //     },
        // })

        // console.log(postExists)

        // if (postExists) {
        //     return new Response("Post already exists", {status: 409})
        // }

        console.log("HERE")
        const post = await db.post.create({
            data: {
                title,
                content,
                locationId,
                authorId: session.user.id,
            }
        })

        return new Response(post.title)
    } catch (error) {
        // wrong data sent in the parsing
        if (error instanceof z.ZodError){ 
            return new Response(error.message, {status: 422})
        }

        return new Response("Could not create post", {status: 500})
    }
}
