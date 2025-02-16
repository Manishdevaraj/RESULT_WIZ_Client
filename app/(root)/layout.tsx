'use client';
import Nav from "@/components/Nav";
import { useDB } from "@/lib/Context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fUser} = useDB();
  const router = useRouter();

  useEffect(() => {
    if ( !fUser) {
      router.push('/sign-in');
    }
  }, [ fUser, router]);

  if (!fUser) return <div>Loading...</div>;

  return (

      <div>
        <Nav />
        {children}
      </div>
    
  );
}
