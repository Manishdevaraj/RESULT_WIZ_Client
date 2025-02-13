'use client';
import ClassDropdown from '@/components/classDropdown';
import StudenAnalysis from '@/components/StudentAnalysis/StudenAnalysis';
import { useDB } from '@/lib/Context'


const StudentAnalysis = () => {

  const {dbUser,AllClass}=useDB();

  if(!dbUser)
  {
    return <div>Loading...</div>
  }


  return(
    <div>
      {dbUser.ismaster&& <ClassDropdown classes={AllClass}/>}
       <StudenAnalysis/>
    </div>
  )}
export default StudentAnalysis