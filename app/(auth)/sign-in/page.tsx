'use client';
import React, { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useDB } from '@/lib/Context';

function Signin() {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
  const { fUser } = useDB();
  const router = useRouter();

  useEffect(() => {
    if (userGoogle || fUser) {
      router.push('/'); // Redirect after sign-in
    }
  }, [userGoogle, fUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 hidden md:flex">
          <Image
            src="/images/logo.jpg"
            alt="Sign In Illustration"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Sign-In Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
        <Image
            src="/images/skct.webp"
            alt="Sign In Illustration"
            width={100}
            height={100}
            className="w-[200px] h-full"
          />
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-lg text-gray-600">Sign in to Result Wiz using your Google account</p>

          {/* Google Sign-in Button */}
          <button
            className="flex items-center justify-center w-full bg-red-500 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            disabled={loadingGoogle}
            onClick={() => signInWithGoogle()}
          >
            <FaGoogle className="text-2xl mr-3" />
            {loadingGoogle ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {errorGoogle && <p className="text-red-500 text-sm">{errorGoogle.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signin;
