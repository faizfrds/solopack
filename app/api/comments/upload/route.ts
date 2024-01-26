import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validator/comment";
import { LocationValidator } from "@/lib/validator/location";
import toast from "react-hot-toast";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user){
            return new Response("Unauthorized", {status: 401})
        }

        const body = await req.json()
        const {content, postId, authorId} = CommentValidator.parse(body) 

        const postExists = await db.post.findFirst({
            where: {
                id: postId,
            },
        })

        if (!postExists) {
            return new Response("Post does not exist", {status: 409})
        }

        const comment = await db.comment.create({
            data: {
                content,
                postId,
                authorId,
            },
        })


        return new Response(comment.authorId)
    } catch (error) {
        // wrong data sent in the parsing
        if (error instanceof z.ZodError){ 
            return new Response(error.message, {status: 422})
        }

        return new Response("Could not create location", {status: 500})
    }
}
