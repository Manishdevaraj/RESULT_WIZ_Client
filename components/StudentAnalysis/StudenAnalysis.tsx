'use client';
import { useDB } from '@/lib/Context';
import { getAllStu, getStudenDetails } from '@/lib/user.actions';
import React, { useEffect, useState } from 'react'
const StudenAnalysis = () => {
    const {studentList,setstudentList,dbUser,toggle}=useDB();
    useEffect(()=>{
          const getAllStudents=async()=>
          {
           const res= await getAllStu(dbUser.classId);
           console.log(res?.stus);
           setstudentList(res?.stus);
          
     
           
          }
          getAllStudents()
         // eslint-disable-next-line react-hooks/exhaustive-deps
         },[toggle]);
  // console.log(studentList);
  const [studentDetails,setStudentDetails]=useState([]);
  const [show,setshow]=useState(false);

  const [student,setstudent]=useState(null);
  const handelClick=async(item,id)=>
    {
        const dtails=await getStudenDetails(id);
        console.log(dtails.performanceData);
        setStudentDetails(dtails.performanceData);
        setshow(true);
        setstudent(item);
        console.log(item);
    }
    const toggler=()=>
    {
      setshow(false);
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4" onClick={toggler}>
      {
        studentList?.map((item, index) => (
          <div
            key={index}
            className="md:w-[400px] h-[200px] rounded-2xl flex items-center justify-center shadow-lg cursor-pointer bg-amber-500 p-4"
            onClick={() => handelClick(item, item._id)}
          >
            {/* <Avatar size="2xl" src="" name={item.name} /> */}
            <div className="ml-2 mt-4">
              {/* Name */}
              <div className="flex gap-6">
                <p className="text-lg font-bold text-white">Name</p>
                <p className="text-lg font-bold text-white">{item.name}</p>
              </div>

              {/* Roll Number */}
              <div className="flex gap-3">
                <p className="text-lg font-bold text-white">Roll No</p>
                <p className="text-lg font-bold text-white">{item.rollNumber}</p>
              </div>

              {/* CGPA */}
              <div className="flex gap-14 items-center">
                <p className="text-lg font-bold text-white">CGPA</p>
                <p className="text-lg font-bold text-white">{item.CGPA}</p>
              </div>

              {/* Backlogs */}
              <div className="flex gap-9 items-center">
                <p className="text-lg font-bold text-white">Backlogs</p>
                <p className="text-lg font-bold text-white">
                  {item.backlogs ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        ))}


{show && student && (
  <div
    // ref={pdfRef}
    className="bg-white shadow-xl absolute top-10 md:right-80 rounded-xl p-3 overflow-y-auto scrollbar-hide"
  >
    {/* Download Icon
    <FaCloudDownloadAlt
      onClick={downloadPDF}
      className="ml-auto text-xl text-purple-600 cursor-pointer"
    /> */}

    {/* Student Info */}
    <div className="flex justify-between text-lg">
      <p>Name: {student?.name}</p>
      <p>Roll: {student?.rollNumber}</p>
    </div>

    {/* Table */}
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Semester</th>
            <th className="px-4 py-2 border">Course Code</th>
            <th className="px-4 py-2 border">Subject</th>
            <th className="px-4 py-2 border">Grade</th>
            <th className="px-4 py-2 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails?.map((semesterData, semIndex) =>
            semesterData.subjects.map((subject, subjIndex) => (
              <tr
                key={`${semIndex}-${subjIndex}`}
                className="hover:bg-slate-100"
              >
                <td className="px-4 py-2 border">{semesterData.semester}</td>
                <td className="px-4 py-2 border">{subject.subjectCode}</td>
                <td className="px-4 py-2 border">{subject.subjectName}</td>
                <td className="px-4 py-2 border">{subject.grade}</td>
                <td className="px-4 py-2 border">{subject.marks}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  )
}


export default StudenAnalysis