import { getAuthSession } from '@/lib/auth'
import React from 'react'

export const useUser = async () => {
    const session = await getAuthSession();
    if (session === null){
        throw new Error("No Session Found")
    }

    return session;
}
