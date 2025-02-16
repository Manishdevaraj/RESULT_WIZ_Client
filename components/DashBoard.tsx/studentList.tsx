'use client';

import { useDB } from '@/lib/Context';
import { getAllStu, getExcel } from '@/lib/user.actions';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

const StudentList = () => {
     
    const {setstudentList,dbUser} =useDB();

    const [sortedStudents,setsortedStudents]=useState<any>([]);
  
   
    useEffect(()=>{
        const getAllStudents=async()=>
        {
         const res= await getAllStu(dbUser.classId);
        //  console.log(res?.stus);
         setstudentList(res?.stus);
        
   
         const s=[...res.stus].sort((a, b) => b.CGPA - a.CGPA);
         setsortedStudents(s)
        }
        getAllStudents()
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[]);

       const ExportData=async()=>
       {
       await getExcel(dbUser.classId)

       }
  return (
    <div className='overflow-y-auto h-[500px]'>
      <Button onClick={ExportData} className='bg-amber-500 hover:bg-amber-400'>Export Data</Button>
                           {/* @ts-ignore */}

         {sortedStudents?.map((item,index)=>
              ( 
                <div key={index} className="w-full h-6 p-4 mt-3 rounded-xl  
                flex justify-between  items-center hover:bg-gray-400
                ">
                  <p>{index+1}</p>
                  <p>{item.name}</p>
                  <p>{item.CGPA}</p>
                </div>
              ))}
    </div>
  )
}

export default StudentList
