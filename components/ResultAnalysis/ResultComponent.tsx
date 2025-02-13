'use client';

import { useDB } from "@/lib/Context";
import { getResult } from "@/lib/user.actions";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import ExaminationDetails from "./ExamDetails";
const ResultComponent = () => {

    const {dbUser}=useDB();
    
     
    const [selectedSemester, setSelectedSemester] = useState(null);
  const [resultData1, setResultData1] = useState(null);
  const [resultData2, setResultData2] = useState(null);
  const [resultData3, setResultData3] = useState(null);
  const [resultData4, setResultData4] = useState(null);
  const [resultData5, setResultData5] = useState(null);
  const [resultData7, setResultData7] = useState(null);

  const handleCheckboxChange = async (semester) => {
    console.log(`Selected Semester: ${semester}`);
    setSelectedSemester(semester);

    try {
      const { a1, a2, a3, a4, a5, a7 } = await getResult(semester, dbUser.classId);
      setResultData1(a1);
      setResultData2(a2);
      setResultData3(a3);
      setResultData4(a4);
      setResultData5(a5);
      setResultData7(a7);
      // console.log(a5);
  //  console.log(resultData5);

    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const studentMap = new Map();

  resultData4?.subjectArrears.forEach(subject => {
    subject.failedStudents.forEach(student => {
      if (!studentMap.has(student.rollNumber)) {
        studentMap.set(student.rollNumber, {
          name: student.studentName,
          arrears: [],
        });
      }
      studentMap.get(student.rollNumber).arrears.push(`${subject.subjectCode} - ${subject.subjectName}`);
    });
  });

  const studentList = Array.from(studentMap, ([rollNumber, data], index) => ({
    sn: index + 1,
    rollNumber,
    name: data.name,
    arrears: data.arrears.join(", "),
    count:data.arrears.length
  }));

   


  //  const contentRef = useRef<HTMLDivElement>(null);
   const contentRef1 = useRef<HTMLDivElement>(null);
   const contentRef2 = useRef<HTMLDivElement>(null);
   const contentRef3 = useRef<HTMLDivElement>(null);
   const contentRef4 = useRef<HTMLDivElement>(null);
   const contentRef5 = useRef<HTMLDivElement>(null);
   const contentRef6 = useRef<HTMLDivElement>(null);
   const contentRef7 = useRef<HTMLDivElement>(null);

//    const downloadPDF = () => {
//      const input = a1.current;
//      if (!input) return;
 
//      html2canvas(input).then((canvas) => {
//        const imgData = canvas.toDataURL('image/png');
//        const pdf = new jsPDF('p', 'mm', 'a4');
//        const imgProps = pdf.getImageProperties(imgData);
//        const pdfWidth = pdf.internal.pageSize.getWidth();
//        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
 
//        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//        pdf.save(`ResultAnalysis.pdf`);
//      });
//    };
   const reactToPrintFn1 = useReactToPrint({ contentRef:contentRef1 });
   const reactToPrintFn2 = useReactToPrint({ contentRef:contentRef2 });
   const reactToPrintFn3 = useReactToPrint({ contentRef:contentRef3 });
   const reactToPrintFn4 = useReactToPrint({ contentRef:contentRef4 });
   const reactToPrintFn5 = useReactToPrint({ contentRef:contentRef5 });
   const reactToPrintFn7 = useReactToPrint({ contentRef:contentRef7 });

   const [examinationTime,setexaminationTime]=useState("END SEMESTER EXAMINATIONS -");
   const [deptName,setdeptName]=useState("DEPARTMENT OF CSE (IOT)");
   const [year,setyear]=useState("YEAR AND SEMESTER: II AND IV");
  
   const [c,setc]=useState("SRI KRISHNA COLLEGE OF TECHNOLOGY, COIMBATORE – 641042");



  return (
    <>
        <div>
        <ExaminationDetails
        examinationTime={examinationTime}
        setExaminationTime={setexaminationTime}
        deptName={deptName}
        setDeptName={setdeptName}
        year={year}
        setYear={setyear}
        c={c}
        setC={setc}
      />
    
  </div>
      
    
  
     <div className="mb-4" >
      <h2 className="text-xl font-semibold mb-4">Select Semester:</h2>
      <div className="flex space-x-2">
        {[...Array(8)].map((_, index) => {
          const semester = index + 1;
          return (
            <label
              key={semester}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSemester === semester}
                onChange={() => handleCheckboxChange(semester)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Semester {semester}</span>
            </label>
          );
        })}
      </div>
    </div>

     <div  className="flex flex-col items-center justify-center w-full">
      
     {resultData1&&<>
      <Button onClick={()=>reactToPrintFn1()}>Print</Button>
      {/* Results Table A1 */}

    <div ref={contentRef1} className="w-[1000px] p-5">
    <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A1</p>
            </div>
        <div className="flex flex-col items-center justify-center">

        
      {resultData1 && (
        <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
            <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>
      )}

      {/* Results Data Table */}
      {resultData1 && (
        <table className="table-auto w-full mt-5 text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">Sl.No.</th>
              <th className="border border-gray-300 px-3 py-2">Name of the Subject</th>
              <th className="border border-gray-300 px-3 py-2">Name of the Faculty Members</th>
              <th className="border border-gray-300 px-3 py-2">Class strength
                (a)

</th>
              <th className="border border-gray-300 px-3 py-2">Number of students opted for withdrawal
(b)

</th>
              <th className="border border-gray-300 px-3 py-2">Number of students absent for the exam
(c)
</th>
              <th className="border border-gray-300 px-3 py-2">
              Total no. of students appeared for the exam
(d) =
(a)-(b)-(c)
</th>
              <th className="border border-gray-300 px-3 py-2">Total number of students passed in the exam
(e)
</th>
              <th className="border border-gray-300 px-3 py-2">Total number of students failed in the exam
(f)
</th>
              <th className="border border-gray-300 px-3 py-2">Pass percentage
(g) = (e)/(d) x 100
</th>
            </tr>
          </thead>
          <tbody>
            {resultData1?.subjects.map((subject, index) => (
              <tr key={subject.subjectCode} className="border-b">
                <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-3 py-2">{`${subject.subjectCode}-${subject.subjectName}`}</td>
                <td className="border border-gray-300 px-3 py-2">{subject.facultyMembers}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.classStrength}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.numWithdrawn || 0}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.numAbsent || 0}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.numAppeared}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.numPassed}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.numFailed}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{subject.passPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      </div>
      {/* Overall Statistics */}
      {resultData1 && (
        <div className="mt-5 p-4">
          <p className="font-bold">
            Total Number of Students Appeared for All Exams:{" "}
            {resultData1.totalAppeared / resultData1.subjects.length}
          </p>
          <p className="font-bold">Total Number of Students Cleared All Subjects: {resultData2.totalPassedAllSubjects}</p>
          <p className="font-bold">Overall Pass Percentage: {((resultData2.totalPassedAllSubjects/(resultData1.totalAppeared / resultData1.subjects.length))*100).toFixed()}%</p>
        </div>
      )}

      <div className="p-4 w-full mt-[100px] flex justify-between items-center">
           <p>Tutor</p>
           <p>Programme Coordinator</p>
           <p>Dean /SOC</p>
           <p>Principal</p>
      </div>
    </div></>}
     
        {/* Results Table A2 */}
        {resultData2&&<>
        <Button onClick={()=>reactToPrintFn2()}>Print</Button>
    <div ref={contentRef2}   className="w-[1000px] p-5">
    <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A2</p>
            </div>
        {/* Results Table A2 part 1 */}
        
{resultData2 && (
  <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
          <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>

    <table className="w-full table-auto border-collapse border border-gray-300">
      <tbody>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of students passed in all the Subjects</td>
          <td className="border border-gray-300 p-2">{resultData2.totalPassedAllSubjects}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Numbers of Students not having History of Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.totalNoHistoryOfArrears}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having History of Arrears but not Standing Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.totalHistoryButNoStandingArrears}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number students having CGPA more than 8.5</td>
          <td className="border border-gray-300 p-2">{resultData2.CGPA_Above_8_5}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having CGPA between 7.5 and 8.5</td>
          <td className="border border-gray-300 p-2">{resultData2.CGPA_7_5_To_8_5}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having CGPA between 6.5 and 7.5</td>
          <td className="border border-gray-300 p-2">{resultData2.CGPA_6_5_To_7_5}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having CGPA less than 6.5</td>
          <td className="border border-gray-300 p-2">{resultData2.CGPA_Below_6_5}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having Standing Arrears (at the end of Exam)</td>
          <td className="border border-gray-300 p-2">{resultData2.totalPassedAllSubjects}</td>
        </tr>
      </tbody>
    </table>

    <p className="text-center font-bold mt-4 text-gray-700">Details of Number of students having arrears as on now</p>

    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
      <tbody>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 1 Arrear</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["1"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 2 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["2"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 3 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["3"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 4 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["4"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 5 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["5"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 8 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["8"]}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Number of Students having 12 Arrears</td>
          <td className="border border-gray-300 p-2">{resultData2.arrearCounts["12"]}</td>
        </tr>
      </tbody>
    </table>
    <div className="p-4 w-full mt-[100px] flex justify-between items-center">
           <p>Tutor</p>
           <p>Programme Coordinator</p>
           
      </div>
  </div>
)}

    </div></>}

        {/* Results Table A3 */}
        {resultData3&&<>
        <Button onClick={()=>reactToPrintFn3()}>Print</Button>
    <div ref={contentRef3}  className="w-[1000px] p-5">
    <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A3</p>
            </div>
    <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
          <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>

        

{resultData3 && (
  <table className="w-full mt-5 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Name of the Subject</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Number of Students Having Arrear (Including WH)</th>
      </tr>
    </thead>
    <tbody>
      {resultData3.subjectArrears.map((data, key) => (
        <tr key={key}>
          <td className="border border-gray-300 px-4 py-2">{data.semester}</td>
          <td className="border border-gray-300 px-4 py-2">{`${data.subjectcode}-${data.subjectName}`}</td>
          <td className="border border-gray-300 px-4 py-2">{data.arrearCount}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

<div className="p-4 w-full mt-[100px] flex justify-between items-center">
           <p>TUTOR</p>
           <p>PROGRAMME CO ORDINATOR</p>
          
      </div>
    </div>
    </>}

            {/* Results Table A4 */}
            {resultData4&&<>
            <Button onClick={()=>reactToPrintFn4()}>Print</Button>
        <div ref={contentRef4}  className="w-[1000px] p-5">
        <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A4</p>
            </div>
        <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
          <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>
        <p className="font-bold text-center">
        DETAILS OF ARREARS SUBJECT WISE AND STUNDETS NAME WISE
              
            </p>
        {resultData4 && (
  <table className="w-full mt-5 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Name of the Subject</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Register Number</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Name of the Students Having Arrear</th>
      </tr>
    </thead>
    <tbody>
      {resultData4.subjectArrears.map((subject, subjectIndex) => (
        subject.failedStudents.map((student, studentIndex) => (
          <tr key={`subject-${subjectIndex}-student-${studentIndex}`}>
            {studentIndex === 0 && (
              <>
                <td className="border border-gray-300 px-4 py-2" rowSpan={subject.failedStudents.length}>
                  {subject.semester}
                </td>
                <td className="border border-gray-300 px-4 py-2" rowSpan={subject.failedStudents.length}>
                  {`${subject.subjectCode}-${subject.subjectName}`}
                </td>
              </>
            )}
            <td className="border border-gray-300 px-4 py-2">{student.rollNumber}</td>
            <td className="border border-gray-300 px-4 py-2">{student.studentName}</td>
          </tr>
        ))
      ))}
    </tbody>
  </table>
)}
<div className="p-4 w-full mt-[100px] flex justify-between items-center">
<p>TUTOR</p>
<p>PROGRAMME CO ORDINATOR</p>
      </div>

        
        </div></>}
            {/* Results Table A5*/}
            {resultData5&&<>
            <Button onClick={()=>reactToPrintFn5()}>Print</Button>
         <div ref={contentRef5}  className="w-[1000px] p-5">
         <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A5</p>
            </div>
         <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
          <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
          </div>
         
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>
        <p className="font-bold text-center">
          DETAILS OF ARREARS - STUNDETS WISE
              
            </p>

{studentList.length > 0 && (
  <div className="overflow-x-auto mt-8">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left font-bold">Sl. No</th>
          <th className="border border-gray-300 px-4 py-2 text-left font-bold">Name of the Student</th>
          <th className="border border-gray-300 px-4 py-2 text-left font-bold">Number of Arrears</th>
          <th className="border border-gray-300 px-4 py-2 text-left font-bold">Name of The Subject(s) in which the Student is Having the Arrear</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student, index) => (
          <tr key={student.rollNumber} className="border-b border-gray-300">
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{student.name}</td>
            <td className="border border-gray-300 px-2 py-1 text-center">{student.count}</td>
            <td className="border border-gray-300 px-4 py-2">{student.arrears}</td>
            {/* <td className="border border-gray-300 px-4 py-2">{student.subjects?.join(', ')}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

<div className="p-4 w-full mt-[100px] flex justify-between items-center">
<p>TUTOR</p>
<p>PROGRAMME CO ORDINATOR</p>
          
      </div>

         </div></>}

            {/* Results Table A5 */}
         {/* <div className="w-[1000px]">
         <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A5</p>
            </div>
         <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
            <p className="font-bold text-2xl">
              SRI KRISHNA COLLEGE OF TECHNOLOGY, COIMBATORE – 641042
            </p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (IOT)
            </p>
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>

{resultData5 && (
  <div className="mt-5">
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1 font-semibold">S.No</th>
          <th className="border border-gray-300 px-2 py-1 font-semibold">Register Number</th>
          <th className="border border-gray-300 px-2 py-1 font-semibold">Full Name of the Student</th>
          <th className="border border-gray-300 px-2 py-1 font-semibold">No. of Arrear</th>
        </tr>
      </thead>
      <tbody>
        {resultData5?.studentArrears.map((subject, index) => (
          <tr key={index} className="odd:bg-gray-100">
            <td className="border border-gray-300 px-2 py-1 text-center">{index + 1}</td>
            <td className="border border-gray-300 px-2 py-1 text-center">{subject.rollNumber}</td>
            <td className="border border-gray-300 px-2 py-1 text-center">{subject.studentName}</td>
            <td className="border border-gray-300 px-2 py-1 text-center">{subject.arrearCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

         </div> */}

            {/* Results Table A7 */}
            {resultData7&&<>
            <Button onClick={()=>reactToPrintFn7()}>Print</Button>
         <div ref={contentRef7}  className="w-[1000px] p-5">
            <div className="w-full flex justify-end">
                <p className="text-xl font-bold">RA / A 7</p>
            </div>
         <div className="flex  items-center ">
          <Image
            src="/images/skct.webp"
            alt="SKCT Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <div className="text-center">
          <p className="font-bold text-2xl">
              {c}
            </p>
            <p className="font-bold">{examinationTime}</p>
            <p className="font-bold">RESULTS ANALYSIS</p>
            <p className="font-bold">
              {deptName}
            </p>
            <p className="font-bold">
              {year}
            </p>
            
          </div>
          <Image
          width={100}
          height={100}
            src="/images/skct11.png"
            alt="College Logo"
            className="w-24 h-24 mt-4"
          />
        </div>
        <p className="font-bold text-center">
              DETAILS OF COACHING CLASS PLANNED
              
            </p>

{resultData7 && (
  <div className="mt-5 overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name of the Arrear Subject</th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Name of the Faculty Member who will conduct the coaching class
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name of the Students having arrear</th>
        </tr>
      </thead>
      <tbody>
      {resultData7.subjects.map((subject, subjectIndex) => (
  <React.Fragment key={subjectIndex}>
    <tr>
      <td className="border border-gray-300 px-4 py-2" rowSpan={subject.students.length || 1}>
        {`${subject.subjectCode} - ${subject.subjectName}`}
      </td>
      <td className="border border-gray-300 px-4 py-2" rowSpan={subject.students.length || 1}>
        {subject.handledBy.map(faculty => faculty.name).join(', ')}
      </td>
      {/* Render first student row directly */}
      <td className="border border-gray-300 px-4 py-2">{subject.students[0]?.studentName || '-'}</td>
    </tr>
    {/* Render remaining student rows if any */}
    {subject.students.slice(1).map((student, studentIndex) => (
      <tr key={`subject-${subjectIndex}-student-${studentIndex + 1}`}>
        <td className="border border-gray-300 px-4 py-2">{student.studentName}</td>
      </tr>
    ))}
  </React.Fragment>
))}


      </tbody>
    </table>
  </div>
)}

         <div className="p-4 w-full mt-[100px] flex justify-between items-center">
         <p>TUTOR</p>
         <p>PROGRAMME CO ORDINATOR</p>
          
      </div>
         </div>

</>}
         </div>

    </>
  )
}

export default ResultComponent