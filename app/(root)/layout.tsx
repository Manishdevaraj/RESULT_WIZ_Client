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
  const { fUser, dbLoader, dbUser } = useDB();
  const router = useRouter();

  useEffect(() => {
    if (!dbLoader && !fUser) {
      router.push('/sign-in');
    }
  }, [dbLoader, fUser, router]);

  if (dbLoader) return <div>Loading...</div>;

  return (

      <div>
        <Nav />
        {children}
      </div>
    
  );
}
