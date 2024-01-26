import {z} from "zod"

export const PostValidator = z.object({
    title: z.string().min(3, {message: "Title must be longer than 3 characters"}).max(128, {message: "Title cannot exceed 128 characters"}),
    locationId: z.string(),
    content: z.any(),
})

export const PostingValidator = z.object({
    locationId: z.string()
})

export type PostCreationPayload = z.infer<typeof PostValidator>
export type PostingValidatorPayload = z.infer<typeof PostValidator>