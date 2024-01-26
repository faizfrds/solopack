import {z} from 'zod'

export const SearchValidator = z.object({
    name: z.string().min(1).max(21),
})

export const LocationSubscriptionValidator = z.object({
    locationId: z.string()
})

export type SearchLocationPayload = z.infer<typeof SearchValidator>