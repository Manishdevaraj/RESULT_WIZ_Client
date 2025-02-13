'use client';
import ClassDropdown from '@/components/classDropdown';
import Grids from '@/components/DashBoard.tsx/Grids'
import StudentList from '@/components/DashBoard.tsx/studentList'
import Subjects from '@/components/DashBoard.tsx/SubjectDetails';
import SubjectHandeled from '@/components/DashBoard.tsx/SubjectHandeled';
import { useDB } from '@/lib/Context';
import { getclassById, getGridData, getstafhandelSubject } from '@/lib/user.actions';
import React, { useEffect } from 'react'

const Page = () => {

const {dbUser, setClassData,setgridData,setsubjectHandeled,AllClass,toggle}=useDB();

  
  useEffect(() => {
    const getDetails = async () => {
      // Fetch class details
      if(dbUser)
      {
        const data = await getclassById(dbUser.classId);
       const d2=await getGridData(dbUser.classId)
       const d3=await getstafhandelSubject(dbUser._id);
      // console.log(data);
      setClassData(data);
      setgridData(d2);
      setsubjectHandeled(d3);
      }
    };
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser,toggle]);

  if(!dbUser) return <div>Loading...</div>
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {dbUser.ismaster&&<ClassDropdown classes={AllClass}/>}
       <div>
          <Grids/>
       </div>

       <div className='w-full md:flex items-center justify-center'>
           <div className='md:w-8/12 md:h-[500px]  overflow-y-auto'>
             <SubjectHandeled/>
           </div>
          <div className=' md:w-3/12  overflow-y-auto'>
           <StudentList/>
          </div>

       </div>

       {/* subject detaisl */}
       <div className='w-full h-full mt-10'>
             <Subjects/>
       </div>


    </div>
  )
}

export default Page