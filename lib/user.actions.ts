import { toast } from '@/hooks/use-toast';
import axios from 'axios';
const url="http://localhost:5000"
// const url="http://172.19.57.226:5000"

export const getResult=async(sem:number,classId:string)=>
    {
        try
            {
                  // Create a new FormData object
           let a1={};
           let a2={};
           let a3={};
           let a4={};
           let a5={};
           let a7={};
            const res1 = await axios.post(`${url}/staff/result/a1`,{
                classId, sem 
            });
                // console.log("stus",res1);
              a1=res1.data;  

              //
              const res2 = await axios.post(`${url}/staff/result/a2`,{
                classId, sem 
            });
                // console.log("stus",res2);
              a2=res2.data; 

              //
              const res3 = await axios.post(`${url}/staff/result/a3`,{
                classId, sem 
            });
                // console.log("stus",res3);
              a3=res3.data; 

              //
              const res4 = await axios.post(`${url}/staff/result/a4`,{
                classId, sem 
            });
                // console.log("stus",res4);
              a4=res4.data; 

              //
              const res5 = await axios.post(`${url}/staff/result/a5`,{
                classId, sem 
            });
                // console.log("stus",res5);
              a5=res5.data; 

              //
              const res7 = await axios.post(`${url}/staff/result/a7`,{
                classId, sem 
            });
                // console.log("stus",res7);
              a7=res7.data;    
              
              return {a1,a2,a3,a4,a5,a7};
            }
            catch(err)
            {
                console.log("Error while sending message",err)
            }
    }
export const getStudenDetails=async(id:string)=>
    {
        try
            {
                  // Create a new FormData object
          
            const res = await axios.post(`${url}/staff/get/students/performance`,{
                studentId:id
            });
                // console.log("stus",res);
                return res.data;        
            }
            catch(err)
            {
                console.log("Error while sending message",err)
            }
    }
export const getAllStu=async(id:string)=>
    {
        try
            {
                  // Create a new FormData object
          
            const res = await axios.post(`${url}/staff/get/students`,{
                classId:id
            });
                // console.log("stus",res);
                return res.data;        
            }
            catch(err)
            {
                console.log("Error while sending message",err)
            }
    }
    
export const getAllClass=async()=>
{
    try
        {
              // Create a new FormData object
      
        const res = await axios.get(`${url}/staff/all/class`);
            console.log("classes",res);
            return res.data;        
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }
}


export const createDepartment = async (departmentName: string, departmentCode: string) => {
  try {
    const res = await axios.post(`${url}/admin/create/department`, {
      departments: [
        {
          Name: departmentName,
          Code: departmentCode,
        },
      ],
    });

    toast({
        title: "Success!",
        description: "Department is created...",
      })
      
    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
};

export const createStaffBulk = async (data) => {
  try {
    const res = await axios.post(`${url}/admin/create/staff/bulk`,{
        staffList:data
    });

    toast({
        title: "Success!",
        description: "Bulk Staff is created...",
      })

    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
};


export const createBatch = async(year)=>
{
    try {
        const res = await axios.post(`${url}/admin/create/batch`,{
            year
        });
    
        toast({
            title: "Success!",
            description: "Batch is created...",
          })
    
        return res.data;
      } catch (err) {
        console.error("Error while sending request:", err);
        throw err; // Optionally rethrow the error to handle it further up the call chain
      }
}
export const getBatchdetail = async()=>
{
    try {
        const res = await axios.get(`${url}/admin/get/all/batches`,);
        return res.data;
      } catch (err) {
        console.error("Error while sending request:", err);
        throw err; // Optionally rethrow the error to handle it further up the call chain
      }
}
export const getDepartmentdetail = async()=>
{
    try {
        const res = await axios.get(`${url}/admin/get/all/department`,);
        return res.data;
      } catch (err) {
        console.error("Error while sending request:", err);
        throw err; // Optionally rethrow the error to handle it further up the call chain
      }
}

export const createClass = async (data) => {
  try {
    const res = await axios.post(`${url}/admin/create/class`,{
      name:data.className, batchId:data.batchYear, departmentId:data.department
    });

    toast({
        title: "Success!",
        description: "Class is created...",
      })

    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
};
export const getStaffs = async () => {
  try {
    const res = await axios.get(`${url}/admin/get/all/staff`);

    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
};
export const getClassDetial = async () => {
  try {
    const res = await axios.get(`${url}/admin/get/all/class/dept`);

    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
};

export const AssignTutor = async(tutorid,classid)=>
  {
      try {
          const res = await axios.post(`${url}/admin/update/class/tutor`,{
            tutorId:tutorid, classId:classid
          });
      
          toast({
              title: "Success!",
              description: "Tutor is assigned to class...",
            })
      
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
 
export const createBulkStudent = async( students, ClassId)=>
  {
      try {
          const res = await axios.post(`${url}/admin/create/bulk/students`,{
            students, ClassId
          });
      
          toast({
              title: "Success!",
              description: "Student is uploaded...",
            })
      
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const createBulkSubject = async( subjects)=>
  {
      try {
          const res = await axios.post(`${url}/admin/create/subject`,{
            subjects
          });
      
          toast({
              title: "Success!",
              description: "Subject is uploaded...",
            })
      
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const assignSubjectToClass = async(sem,subjects,classId )=>
  {
      try {
          const res = await axios.post(`${url}/admin/assign/subject/class`,{
            classId,subjects,sem
          });
      
          toast({
              title: "Success!",
              description: "Subjects assigned to class...",
            })
      
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const getAllSubject = async()=>
  {
      try {
          const res = await axios.get(`${url}/admin/get/all/subject`);
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
 
export const getclassById = async(id)=>
  {
      try {
          const res = await axios.post(`${url}/staff/get/class`,{
            id
          });
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
 
export const assignStaffToSubject = async(data,classId)=>
    {
        try {
            const res = await axios.post(`${url}/admin/assign/subject/staff`,{
              classId,data
            });
        
            toast({
                title: "Success!",
                description: "Staff assigned to subjects...",
              })
        
            return res.data;
          } catch (err) {
            console.error("Error while sending request:", err);
            throw err; // Optionally rethrow the error to handle it further up the call chain
          }
    }
export const GetUser  =async(email:string)=>{

  try {
    const res = await axios.post(`${url}/staff/getuser`,{
      email
    });
    return res.data;
  } catch (err) {
    console.error("Error while sending request:", err);
    throw err; // Optionally rethrow the error to handle it further up the call chain
  }
}  

export const uploadSemResult = async(sem,data )=>
  {
      try {
          const res = await axios.post(`${url}/staff/update/marks`,{
            jsonData:data,semester:sem
          });
      
          toast({
              title: "Success!",
              description: "Sem result is updated to studens you can dounlod the excel on dashboard...",
            })
      
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }

export const updatename=async(id,name )=>
  {
      try {
          const res = await axios.post(`${url}/staff/updatename`,{
            id,name
          });
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const updateemail=async(id,email )=>
  {
      try {
          const res = await axios.post(`${url}/staff/updateemail`,{
            id,email
          });
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const ishodclick=async(id)=>
  {
      try {
          const res = await axios.post(`${url}/staff/ishodclick`,{
            id
          });
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }
export const ismasterclick=async(id)=>
  {
      try {
          const res = await axios.post(`${url}/staff/ismasterclick`,{
            id
          });
          return res.data;
        } catch (err) {
          console.error("Error while sending request:", err);
          throw err; // Optionally rethrow the error to handle it further up the call chain
        }
  }

export const getGridData=async(classId)=>
{
      const res2 = await axios.post(`${url}/staff/get/grid/data`,{
       id:classId,
    });
    // console.log("stus",res2);
  return res2.data; 
}

export const getstafhandelSubject=async(id)=>
  {
  const res2 = await axios.post(`${url}/staff/get/staff/subjecthandeled`,{
   id,
  });
  // console.log("stus",res2);
  return res2.data; 
  
}
export const getExcel = async (id: string) => {
  try {
    const response = await axios.post(`${url}/staff/download/excel`, { id }, {
      responseType: 'blob', // This is the key change
    });

    const blob = response.data; // response.data contains the blob when responseType is set to 'blob'
    const urls = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urls;
    link.setAttribute('download', 'students.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading Excel file:', error);
  }
};
