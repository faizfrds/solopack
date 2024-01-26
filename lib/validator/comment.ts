import {z} from "zod"

export const CommentValidator = z.object({
    content: z.string().min(0, {message: "Comment cannot be empty"}).max(500, {message: "Comment cannot exceed 500 characters"}),
    authorId: z.string(),
    postId: z.string(),
})

export const CommentingValidator = z.object({
    locationId: z.string()
})

export type CommentCreationPayload = z.infer<typeof CommentValidator>
export type CommentingValidatorPayload = z.infer<typeof CommentValidator>