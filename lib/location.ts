import {z} from 'zod'

export const LocationValidator = z.object({
    name: z.string().min(1).max(21)
})

export const LocationSubscriptionValidator = z.object({
    locationId: z.string()
})

export type CreateLocationPayload = z.infer<typeof LocationValidator>
export type SubscribeToLocationPayload = z.infer<typeof LocationSubscriptionValidator>