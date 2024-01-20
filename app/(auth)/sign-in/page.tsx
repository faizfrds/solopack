import useAuthModal from '@/hooks/useAuthModal'
import React, { useEffect, useLayoutEffect } from 'react'
import AuthModal from '@/components/AuthModal';

export default function SignIn() {


  return (
    <div className='text-black'>
        <AuthModal />
    </div>
  )
}
