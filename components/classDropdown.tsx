import { useDB } from "@/lib/Context";
import { useState } from "react";

const ClassDropdown = ({ classes }: { classes: any[] }) => {
  

  const {dbUser,toggle, settoggle}=useDB();

  const [selectedClass,setselectedClass]=useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = event.target.value;
                          //  * @ts-ignore 
    setselectedClass(classId);
   
    console.log("Selected Class ID:", classId);
    dbUser.classId=classId;
    settoggle(!toggle);
  };
  
//   console.log(classes);
  return (
    <div className="w-64 mx-auto mt-5">
      <select
        className="w-full p-2 b rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={selectedClass}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a class
        </option>
        {classes?.map((classItem) => (
          <option key={classItem._id} value={classItem._id}>
            {classItem.name} ({classItem.batchId.year})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassDropdown;
