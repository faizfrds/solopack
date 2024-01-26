import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
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
        const {name, state, country} = LocationValidator.parse(body) 

        const locationExists = await db.location.findFirst({
            where: {
                name,
                state,
                country,
            },
        })


        if (locationExists) {
            return new Response("Location already exists", {status: 409})
        }

        const location = await db.location.create({
            data: {
                name,
                state,
                country,
                creatorId: session.user.id,
            },
        })

        await db.subscription.create({
            data: {
                userId: session.user.id,
                locationId: location.id,
            },
        })

        return new Response(location.country)
    } catch (error) {
        // wrong data sent in the parsing
        if (error instanceof z.ZodError){ 
            return new Response(error.message, {status: 422})
        }

        return new Response("Could not create location", {status: 500})
    }
}
