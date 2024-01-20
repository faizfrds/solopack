"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'

export default function SignIn() {

  const useAuth = useAuthModal();

  return (
    <Button onClick={useAuth.onOpen}>
        Sign In
    </Button>
  )
}
