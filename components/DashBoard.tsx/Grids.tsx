"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import mem from "@/public/animation/mem.json";
import a1 from "@/public/animation/a1.json";
import a2 from "@/public/animation/a2.json";
import CountUp from "react-countup";
import { getclassById } from "@/lib/user.actions";
import { useDB } from "@/lib/Context";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const DashboardStats = () => {

  const {gridData}=useDB();

  // console.log(gridData);
  
 

//   useEffect(()=>{
//     const getDetails = async () => {
//       //get class details
//       const data=await getclassById(dbUser.classId);
//       console.log(data);
//   } 
//   getDetails();
// },[dbUser.classId])
  const totalstudents=gridData?.students.length;
  const arrearstudents=gridData?.arrearCount;
  const passstudents=gridData?.students.length-gridData?.arrearCount;

  return (
    <div className="md:ml-10 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Total Students */}
      <div className="bg-amber-500 md:w-[400px] h-[200px] rounded-2xl flex items-center justify-center shadow-lg p-4">
        <div className="flex items-center gap-4 text-gray-600">
          <Lottie animationData={mem}  loop={true} autoplay={true} className="w-[200px] h-[200px]" />
          <div>
            <p className="text-lg font-bold text-white">Total Students</p>
            <CountUp start={0} end={totalstudents} duration={3} separator="," className="text-3xl font-bold text-center text-white" />
          </div>
        </div>
      </div>

      {/* Without Backlog */}
      <div className="bg-amber-500 md:w-[400px] h-[200px] rounded-2xl flex items-center justify-center shadow-lg p-4">
        <div className="flex items-center gap-4 text-gray-600">
          <Lottie animationData={a2}  loop={true} autoplay={true} className="w-[200px] h-[200px]" />
          <div>
            <p className="text-lg font-bold text-white">Without Backlog</p>
            <CountUp start={0} end={passstudents} duration={3} separator="," className="text-3xl font-bold text-center text-white" />
          </div>
        </div>
      </div>

      {/* With Backlog */}
      <div className="bg-amber-500 md:w-[400px] h-[200px] rounded-2xl flex items-center justify-center shadow-lg p-4">
        <div className="flex items-center gap-4 text-gray-600">
          <Lottie animationData={a1}  loop={true} autoplay={true} className="w-[200px] h-[200px]" />
          <div>
            <p className="text-lg font-bold text-white">With Backlog</p>
            <CountUp start={0} end={arrearstudents} duration={3} separator="," className="text-3xl font-bold text-center text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
