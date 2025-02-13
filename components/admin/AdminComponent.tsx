'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
   FaUpload, FaEdit, FaChalkboardTeacher, 
  FaChartBar, FaBuilding, FaUsers, FaLayerGroup 
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { assignStaffToSubject, assignSubjectToClass, AssignTutor, createBatch, createBulkStudent, createBulkSubject, createClass, createDepartment, createStaffBulk, getAllSubject, getBatchdetail, getclassById, getClassDetial, getDepartmentdetail, getStaffs, uploadSemResult } from "@/lib/user.actions";
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import { useDB } from '@/lib/Context';
import StaffListComponent from './StaffListComponent';
import { Input } from '../ui/input';

const AdminComponent = () => {
    const {dbUser,toggle}=useDB();

    //to get depart ment details and batch details
    const [departmentDetails, setDepartmentsDetails] = useState([]);
    const [batchDetails, setbatchDetails] = useState([]);
    const [staffDetails, setstaffDetails] = useState([]);
    const [classDetails, setclassDetails] = useState([]);
    const [subjectDetails, setsubjectDetails] = useState([]);
  
    const [c_d,setc_d]=useState();
  
  
    useEffect(()=>{
         const getDetails=async()=>{
          const b=await getBatchdetail();
          const d=await getDepartmentdetail();
          const s=await getStaffs();
          const c=await getClassDetial();
          const sub=await getAllSubject();
          const cl=await getclassById(dbUser.classId);
          console.log(cl);
          setc_d(cl);
          console.log(s);
          setDepartmentsDetails(d);
          setbatchDetails(b);
          setstaffDetails(s);
          setclassDetails(c);
          setsubjectDetails(sub);
         };
         getDetails();
    },[dbUser,toggle])
  
    const [departName, setDepartName] = useState(""); // Store Department Name
    const [departCode, setDepartCode] = useState(""); // Store Department Code
    const [staffData, setStaffData] = useState([]);
    const [Batch, setBatch] = useState([]);
       // Class form state
       const [selectedBatch, setSelectedBatch] = useState("");
       const [selectedTutor, setSelectedTutor] = useState("");
       const [selectedClass, setSelectedClass] = useState("");
       const [selectedDepartment, setSelectedDepartment] = useState("");
       const [className, setClassName] = useState("");
       const [studentData, setStudentData] = useState([]); // State to store student JSON data
       const [subjectData,setSubjectData]=useState([]);
  
       const [selectedStaffForSubject, setSelectedStaffForSubject] = useState({});
  
    
       // Dialog states
  
    const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
    const [isBulkStaffDialogOpen, setIsBulkStaffDialogOpen] = useState(false);
    const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false);
     const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
     const [isStaffAssignDialogOpen, setIsStaffAssignDialogOpen] = useState(false);
     const [isBulkStudentDialogOpen, setIsBulkStudentDialogOpen] = useState(false);
     const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
     const [isSubjectAssignDialogOpen, setIsSubjectAssignDialogOpen] = useState(false);
     const [isStaffAssigntoSubDialogOpen, setIsStaffAssigntoSubDialogOpen] = useState(false);
     const [isSemResultDialogOpen, setIsSemResultDialogOpen] = useState(false);
     
  
  
   
  
    const openDEPTDialog = () => setIsDeptDialogOpen(true);
    const openBulkStaffDialog = () => setIsBulkStaffDialogOpen(true);
    const openBatchDialogOpen = () => setIsBatchDialogOpen(true);
    
     const openClassDialog = () => setIsClassDialogOpen(true);
     const openStaffAsignDialog = () => setIsStaffAssignDialogOpen(true);
  
     const openBulkStudentDialog = () => setIsBulkStudentDialogOpen(true);
     const openSubjectDialog = () => setIsSubjectDialogOpen(true);
     const openSubjectAssign = () => setIsSubjectAssignDialogOpen(true);
     const openSubjectstaffAssign = () => setIsStaffAssigntoSubDialogOpen(true);
     const openSemResultDialogOpen = () => setIsSemResultDialogOpen(true);
  
     const [semData,setSemData]=useState([]);
     //handel the serult data uplod
     const handleSemResultFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const binaryData = e.target.result;
            const workbook = XLSX.read(binaryData, { type: 'binary' });
      
            // Convert the first sheet to JSON
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            console.log(data);
      
            // Map the data to handle multiple courses dynamically
            const formattedData = data.map((row) => {
              const courses = [];
              // Dynamically extract all course-grade pairs
              for (const key in row) {
                if (key.startsWith('COURSE')) {
                  const gradeKey = `G${key.slice(6)}`; // Extract corresponding grade key
                  courses.push({
                    code: row[key],
                    grade: row[gradeKey] || '',
                  });
                }
              }
      
              return {
                rollNumber: (row.REGISTERNUMBER || '').toString().trim(),
                name: (row.NAME || '').toString().trim(),
                semester: (row.SEM || '').toString().trim(),
                courses, // Include all course-grade pairs
              };
            });
      
            console.log('Formatted Student Data:', formattedData);
            setSemData(formattedData);
          };
          
          reader.readAsBinaryString(file);
          openSemResultDialogOpen();
        } else {
          alert('No file selected.');
        }
      };
  
  
     const handleSubjectFileUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
        
            reader.onload = (e) => {
              const binaryData = e.target.result;
              const workbook = XLSX.read(binaryData, { type: 'binary' });
        
              // Convert the first sheet to JSON
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const data = XLSX.utils.sheet_to_json(sheet);
              console.log(data);
        
              // Map the data to handle multiple courses dynamically
              const formattedData = data.map((row) => ({
                CODE: (row.SUBJECTCODE || '').toString().trim(),
                NAME: (row.SUBJECTNAME || row.NAME || '').toString().trim(),
                CREDIT: (row.CREDIT  || '0').toString().trim(),
                // STAFFID: (row.STAFFID  || '').toString().trim(),
                TYPE: (row.TYPE || '').toString().trim(),
      
              }));
        
              console.log('Formatted Student Data:', formattedData);
              setSubjectData(formattedData);
              openSubjectDialog();
            };
        
            reader.readAsBinaryString(file);
          } else {
            alert('No file selected.');
          }
        };
        
  
  
  
    // Handle file upload and convert to JSON for students
    const handleStudentFileUpload = (event) => {
      try {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const binaryData = e.target.result;
            const workbook = XLSX.read(binaryData, { type: 'binary' });
    
            // Convert the first sheet to JSON
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
    
            // Map the data to ensure it matches the backend schema
            const formattedData = data.map((row) => ({
              rollNumber: (row.REGISTERNUMBER || '').trim(),
              name: (row.NAME || '').trim(),
            }));
    
            // console.log('Formatted Student Data:', formattedData);
            setStudentData(formattedData); // Update state with formatted JSON data
            openBulkStudentDialog();  
          };
    
          reader.readAsBinaryString(file);
        } else {
          alert('No file selected.');
        }
        
      } catch (error) {
         console.log(error)
      }
     
    };
   
    const createbulkStudent=async()=>
    {
            await createBulkStudent(studentData,dbUser.classId);
    }
    const createbulkSubject=async()=>
    {
            await createBulkSubject(subjectData);
    }
     // Function to handle class creation
    const handleCreateClass = async () => {
       if (!selectedBatch || !selectedDepartment || !className) {
         alert("Please fill all fields.");
         return;
       }
   
       const newClass = {
         batchYear: selectedBatch,
         department: selectedDepartment,
         className
       };
      // console.log(newClass);
       await createClass(newClass);
       setIsClassDialogOpen(false);
     };
     
     // Function to handle assin tutor
     const handleAssignTutor = async () => {
        if (!selectedClass || !selectedTutor) {
          alert("Please select a class and a tutor.");
        }
        
        await AssignTutor(selectedTutor,selectedClass);
       
     }
    
  
    
    //staf file handeler
    const handleStaffFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const binaryData = e.target.result;
          const workbook = XLSX.read(binaryData, { type: "binary" });
  
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
  
  
  
          const formattedData = data.map((row) => ({
                      name: (row.NAME ||'').toString().trim(),
                      email: (row.EMAIL || '').toString().trim(),
                    }));
          console.log(formattedData);
          setStaffData(formattedData);
  
          openBulkStaffDialog();
        };
  
        reader.readAsBinaryString(file);
      } else {
        alert("No file selected.");
      }
    };
  
    const createDept = async() => {
        
          await createDepartment(departName,departCode);
    };
  
    const StafBulkCreation=async()=>
    {
      await createStaffBulk(staffData);
    }
  
    const createbatch=async()=>
    {
      await createBatch(Batch);
    }
  
    const tutorActions = [
      { icon: <FaUpload />, label: "Upload Bulk Students", bg: "bg-blue-100", action: () => document.getElementById("studentsInput").click() },
     
     
      { icon: <FaChalkboardTeacher />, label: "Assign Staff to Subject", bg: "bg-orange-100", action: openSubjectstaffAssign },
      { icon: <FaChartBar />, label: "Upload Semester Results", bg: "bg-purple-100", action: () => document.getElementById("SEMInput").click() }, 
    ];
  
    const hodActions = [
      { icon: <FaBuilding />, label: "Create Batch", bg: "bg-indigo-100", action: openBatchDialogOpen },
      { icon: <FaEdit />, label: "Create Class", bg: "bg-teal-100", action: openClassDialog },
      { icon: <FaLayerGroup />, label: "Upload Subjects", bg: "bg-green-100", action: () => document.getElementById("subjectInput").click() },
      { icon: <FaChalkboardTeacher />, label: "Assign Tutor to Class", bg: "bg-pink-100", action: openStaffAsignDialog},
      { icon: <FaChalkboardTeacher />, label: "Assign subject to Class", bg: "bg-yellow-100", action: openSubjectAssign},
    ];
  
    const masterAdminActions = [
      { icon: <FaUsers />, label: "Create Department", bg: "bg-red-100", action: openDEPTDialog }, // ✅ Fixed here
     
      { icon: <FaLayerGroup />, label: "Bulk Staff Creation", bg: "bg-blue-200", action: () => document.getElementById("staffFileInput").click() },
    ];
  
    const renderCarousel = (title, actions) => (
      <div className="my-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {actions.map((action, index) => (
            <Card 
              key={index} 
              className={`min-w-[200px] p-4 rounded-2xl ${action.bg} hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={action.action} 
            >
              <CardHeader className="flex items-center justify-center mb-4">
                <div className="text-4xl text-gray-700">{action.icon}</div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold text-gray-700 text-center">
                  {action.label}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedSemesters, setSelectedSemesters] = useState(); // Holds selected semesters
    const [selectedSemesters2, setSelectedSemesters2] = useState(); // Holds selected semesters
  
    // Handle semester selection (check/uncheck)
    const handleSemesterSelection = (semester) => {
      setSelectedSemesters(semester);
      
    };
    const handleSemesterSelection2 = (semester) => {
      setSelectedSemesters2(semester);
      
    };
  
    // Handle subject selection
    const handleSubjectSelection = (subjectId) => {
      setSelectedSubjects((prevSubjects) =>
        prevSubjects.includes(subjectId)
          ? prevSubjects.filter((id) => id !== subjectId) // Remove if unchecked
          : [...prevSubjects, subjectId] // Add if checked
      );
    };
  
    const assignsubjectToClass=async()=>
    {
     
      await assignSubjectToClass(selectedSemesters,selectedSubjects,selectedClass)
    }
    const assignStaffToSubjects = async () => {
      // Collect the staff assignments for each subject
      const staffAssignments = Object.keys(selectedStaffForSubject).map((subjectId) => ({
        subjectId,
        staffId: selectedStaffForSubject[subjectId],
      }));
    
      try {
        // Call an API to assign the staff to the subjects (replace with actual API)
        // await assignTutorToSubjects(staffAssignments);
        await assignStaffToSubject(staffAssignments,dbUser.classId);
  
        console.log(staffAssignments);
        // alert("Staff assigned to subjects successfully.");
        setIsStaffAssignDialogOpen(false); // Close the dialog after successful assignment
      } catch (error) {
        console.error("Error assigning staff to subjects:", error);
        alert("Failed to assign staff to subjects.");
      }
    };
     
    const handelResultUpload  = async () => {

        if(!selectedSemesters2)
        {
            alert("please select the semseter");
        }
        if(selectedSemesters2)
        {
            await uploadSemResult(selectedSemesters2,semData);
        }
        console.log(selectedSemesters2);

    };

    const [searchTerm,setSearchTerm]=useState('');
  
    return (
      <>
        <div className="min-h-screen p-10">
          <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>
          {renderCarousel("Tutor Admin Actions", tutorActions)}
          {dbUser.ishod&&renderCarousel("HOD Admin Actions", hodActions)}
          {dbUser.ismaster&&renderCarousel("Master Admin Actions", masterAdminActions)}
        </div>
  
        {/* Create Department Modal */}
        <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>
              <DialogDescription>
                Enter details to create a new department.
              </DialogDescription>
            </DialogHeader>
            
            {/* Department Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Department Name</label>
              <input 
                type="text"
                value={departName}
                onChange={(e) => setDepartName(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Department Name"
              />
            </div>
  
            {/* Department Code Input */}
            <div className="flex flex-col gap-2 mt-3">
              <label className="text-sm font-medium text-gray-700">Department Code</label>
              <input 
                type="text"
                value={departCode}
                onChange={(e) => setDepartCode(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Department Code"
              />
            </div>
  
            {/* Submit Button */}
            <button 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" 
              onClick={createDept}
            >
              Create Department
            </button>
          </DialogContent>
        </Dialog>
  
        {/* --- bul staf creatio */}
        <input type="file" id="staffFileInput" className="hidden" accept=".xlsx, .xls" onChange={handleStaffFileUpload} />
         {/* Bulk Staff Data Dialog */}
         <Dialog open={isBulkStaffDialogOpen} onOpenChange={setIsBulkStaffDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bulk Staff Data</DialogTitle>
              <DialogDescription>Review the uploaded staff data</DialogDescription>
              <Button onClick={StafBulkCreation}>Create</Button>
            </DialogHeader>
            <div className="overflow-auto max-h-96">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {staffData.length > 0 &&
                      Object.keys(staffData[0]).map((key) => (
                        <th key={key} className="border border-gray-300 p-2 text-left">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((row, index) => (
                    <tr key={index} className="border border-gray-300">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
  
        {/* Batch creation model */}
        <Dialog open={isBatchDialogOpen} onOpenChange={setIsBatchDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Batch</DialogTitle>
              <DialogDescription>
                  Enter Batch to create...
              </DialogDescription>
            </DialogHeader>
            
            {/* Department Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Batch</label>
              <input 
                type="text"
                value={Batch}
                onChange={(e) => setBatch(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Year"
              />
            </div>
  
           
  
            {/* Submit Button */}
            <button 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" 
              onClick={createbatch}
            >
              Create Department
            </button>
          </DialogContent>
        </Dialog>
  
  
        {/* Create Class Dialog */}
        <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Class</DialogTitle>
              <DialogDescription>Select batch, department, and enter class name.</DialogDescription>
            </DialogHeader>
  
            {/* Select Batch */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Batch Year</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Batch</option>
                {batchDetails.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.year}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Select Department */}
            <div className="flex flex-col gap-2 mt-3">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Department</option>
                {departmentDetails.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Class Name Input */}
            <div className="flex flex-col gap-2 mt-3">
              <label className="text-sm font-medium text-gray-700">Class Name</label>
              <input 
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Class Name"
              />
            </div>
  
            {/* Submit Button */}
            <Button className="mt-4 bg-blue-600 text-white" onClick={handleCreateClass}>
              Create Class
            </Button>
          </DialogContent>
        </Dialog>
  
        {/* ASSIGN A STF TO CLASS AS TUTOR */}
        <Dialog open={isStaffAssignDialogOpen} onOpenChange={setIsStaffAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Tutor</DialogTitle>
              <DialogDescription>Select tutor and class with respective dept.</DialogDescription>
            </DialogHeader>
  
            {/* Select staff */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Batch Year</label>
              <select
                value={selectedTutor}
                onChange={(e) => setSelectedTutor(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Staff</option>
                {staffDetails.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Select class */}
            <div className="flex flex-col gap-2 mt-3">
    <label className="text-sm font-medium text-gray-700">Class</label>
    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select Department</option>
      {classDetails.map((classDetail, key) => (
        <option key={key} value={classDetail.classId}>
          {`${classDetail.className} - ${classDetail.departmentName}`}
        </option>
      ))}
    </select>
  </div>
  
  
  
          
  
            {/* Submit Button */}
            <Button className="mt-4 bg-blue-600 text-white" onClick={handleAssignTutor}>
              Assign Tutor
            </Button>
          </DialogContent>
        </Dialog>
  
        {/* --------uplod a bulk Students------ */}
        <input type="file" id="studentsInput" className="hidden" accept=".xlsx, .xls" onChange={handleStudentFileUpload} />
        <Dialog open={isBulkStudentDialogOpen} onOpenChange={setIsBulkStudentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Student Data</DialogTitle>
              <DialogDescription>Review the uploaded student data</DialogDescription>
              <Button onClick={createbulkStudent}>upload</Button>
            </DialogHeader>
            <div className="overflow-auto max-h-96">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {studentData.length > 0 &&
                      Object.keys(studentData[0]).map((key) => (
                        <th key={key} className="border border-gray-300 p-2 text-left">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr key={index} className="border border-gray-300">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
        {/* --------uplod a bulk Subjects------ */}
        <input type="file" id="subjectInput" className="hidden" accept=".xlsx, .xls" onChange={handleSubjectFileUpload} />
        <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subject Data</DialogTitle>
              <DialogDescription>Review the uploaded subject data</DialogDescription>
              <Button onClick={createbulkSubject}>upload</Button>
            </DialogHeader>
            <div className="overflow-auto max-h-96">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {subjectData.length > 0 &&
                      Object.keys(subjectData[0]).map((key) => (
                        <th key={key} className="border border-gray-300 p-2 text-left">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {subjectData.map((row, index) => (
                    <tr key={index} className="border border-gray-300">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
  
        {/* assign a subject to class */}
       
        <Dialog open={isSubjectAssignDialogOpen} onOpenChange={setIsSubjectAssignDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Assign Subject to class</DialogTitle>
      <DialogDescription>Select class and select the subjects.</DialogDescription>
    </DialogHeader>

    {/* Select Semesters */}
    <div className="flex flex-wrap gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
        <div key={semester} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`sem${semester}`}
            checked={selectedSemesters == semester}
            onChange={() => handleSemesterSelection(semester)}
          />
          <label htmlFor={`sem${semester}`} className="text-sm">
            Sem {semester}
          </label>
        </div>
      ))}
    </div>

    {/* Select Class */}
    <div className="flex flex-col gap-2 mt-3">
      <label className="text-sm font-medium text-gray-700">Class</label>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Class</option>
        {classDetails.map((classDetail) => (
          <option key={classDetail.classId} value={classDetail.classId}>
            {`${classDetail.className} - ${classDetail.departmentName}`}
          </option>
        ))}
      </select>
    </div>

    {/* Search and Select Subjects (Multiple Selection) */}
    <div className="flex flex-col gap-2 mt-3">
      <label className="text-sm font-medium text-gray-700">Subjects</label>
      <Input
        placeholder="Search subjects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />
      <div className="border rounded-lg p-2 max-h-40 overflow-y-auto">
        {subjectDetails
          .filter((subject) =>
            `${subject.code} ${subject.name}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((subject) => (
            <div key={subject._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={subject._id}
                checked={selectedSubjects.includes(subject._id)}
                onChange={() => handleSubjectSelection(subject._id)}
              />
              <label htmlFor={subject._id} className="text-sm">
                {`${subject.code} - ${subject.name}`}
              </label>
            </div>
          ))}
      </div>
    </div>

    {/* Submit Button */}
    <Button className="mt-4 bg-blue-600 text-white" onClick={assignsubjectToClass}>
      Assign Subjects
    </Button>
  </DialogContent>
</Dialog>
  
        {/* assign a subject to staff by class */}
  
    <Dialog open={isStaffAssigntoSubDialogOpen} onOpenChange={setIsStaffAssigntoSubDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Assign Staff to Subject</DialogTitle>
        <DialogDescription>
          Select a subject and assign a tutor.
        </DialogDescription>
      </DialogHeader>
  
      {/* Loop through the subjects of the particular class */}
      <div className="overflow-y-scroll h-[500px]">
  
      {c_d?.subjects?.map((subject, index) => (
        <div key={subject._id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {`${subject?.subjectId?.code} - ${subject?.subjectId?.name}`}
          </label>
  
          {/* Select a tutor for this subject */}
          <select
            value={selectedStaffForSubject[subject.subjectId._id] || ""}
            onChange={(e) =>
              setSelectedStaffForSubject((prevState) => ({
                ...prevState,
                [subject.subjectId._id]: e.target.value,
              }))
            }
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            <option value="">Select Tutor</option>
            {staffDetails.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      </div>
  
      {/* Submit Button */}
      <Button
        className="mt-4 bg-blue-600 text-white"
        onClick={assignStaffToSubjects}
      >
        Assign Staff
      </Button>
    </DialogContent>
  </Dialog>
  
     {/* UPLOD THE SEM RESULTS */}
      {/* --------uplod a bulk Students------ */}
      <input type="file" id="SEMInput" className="hidden" accept=".xlsx, .xls" onChange={handleSemResultFileUpload} />
      <Dialog open={isSemResultDialogOpen} onOpenChange={setIsSemResultDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Semester Data</DialogTitle>
            <DialogDescription>Review data to upload</DialogDescription>
            <Button onClick={handelResultUpload}>Upload</Button>
          </DialogHeader>
          {/* Select Semesters */}
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
          <div key={semester} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`sem${semester}`}
              checked={selectedSemesters2==semester}
              onChange={() => handleSemesterSelection2(semester)}
            />
            <label htmlFor={`sem${semester}`} className="text-sm">
              Sem {semester}
            </label>
          </div>
        ))}
      </div>
          <div className="overflow-auto max-h-96">
            {semData.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Roll Number</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Semester</th>
                    <th className="border border-gray-300 p-2">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {semData.map((row, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 p-2">{row.rollNumber}</td>
                      <td className="border border-gray-300 p-2">{row.name}</td>
                      <td className="border border-gray-300 p-2">{row.semester}</td>
                      <td className="border border-gray-300 p-2">
                        {row.courses.map((course, i) => (
                          <div key={i}>
                            {course?.code}: {course.grade}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
  
  
     {dbUser.ismaster&& <StaffListComponent staffDetails={staffDetails}/>}
      </>
    );
  };
  
  
export default AdminComponent