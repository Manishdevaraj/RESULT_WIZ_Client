'use client'
import { useDB } from '@/lib/Context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TiThMenuOutline } from "react-icons/ti";
const Nav = () => {
  const router = useRouter();
  const { logout } = useDB();

  return (
    <div className="w-full">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between p-4 bg-blue-700 text-white">
        <div className="flex items-center gap-2">
          <Image src={'/images/skct.webp'} alt="logo" width={40} height={10} />
          <h1 className="text-xl font-bold">SKCT</h1>
        </div>
        <div className="flex justify-end w-full gap-4">
          <NavLink label="Dashboard" onClick={() => router.push('/')} />
          <NavLink label="StudentAnalysis" onClick={() => router.push('/StudentAnalysis')} />
          <NavLink label="ResultAnalysis" onClick={() => router.push('/ResultAnalysis')} />
          <NavLink label="Administration" onClick={() => router.push('/admin')} />
          <NavLink label="LogOut" onClick={logout} />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden w-full items-center justify-between p-4 bg-blue-700 text-white">
        <div className="flex items-center gap-2">
          <Image src={'/images/skct.webp'} alt="logo" width={40} height={10} />
          <h1 className="text-xl font-bold">SKCT</h1>
        </div>
        <Menubar className="bg-transparent border-none">
          <MenubarMenu >
            <MenubarTrigger className="bg-blue-700 text-white hover:bg-transparent"><TiThMenuOutline  /></MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/')}>Dashboard</MenubarItem>
              <MenubarItem onClick={() => router.push('/StudentAnalysis')}>StudentAnalysis</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => router.push('/ResultAnalysis')}>ResultAnalysis</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => router.push('/admin')}>Administration</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={logout}>LogOut</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

const NavLink = ({ label, onClick }) => (
  <p className="text-sm font-bold cursor-pointer hover:text-amber-400" onClick={onClick}>
    {label}
  </p>
);

export default Nav;
