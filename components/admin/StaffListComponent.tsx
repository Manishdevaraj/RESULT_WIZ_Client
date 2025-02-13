import { ishodclick, ismasterclick, updateemail, updatename } from '@/lib/user.actions';
import React, { useEffect, useState } from 'react';

interface StaffMember {
  _id: string;
  name: string;
  email: string;
  ishod: boolean;
  ismaster: boolean;
  istutor: boolean;
}

interface StaffListComponentProps {
  staffDetails: StaffMember[];
}

const StaffListComponent: React.FC<StaffListComponentProps> = ({ staffDetails }) => {
  const [staffData, setStaffData] = useState<StaffMember[]>(staffDetails);

  useEffect(() => {
    setStaffData(staffDetails);
  }, [staffDetails]);

  const handleRoleChange = (id: string, role: string) => {
    setStaffData(prevData =>
      prevData.map(member =>
        member._id === id ? { ...member, [role]: !member[role] } : member
      )
    );
  };

  const onMasterClick = async(id: string) => {
    // console.log(`Master role clicked for ID: ${id}`);
    handleRoleChange(id, 'ismaster');
    await ismasterclick(id);
  };

  const onHodClick = async (id: string) => {
    console.log(`HOD role clicked for ID: ${id}`);
    
    setStaffData(prevData =>
      prevData.map(member =>
        member._id === id ? { ...member, ishod: !member.ishod } : member
      )
    );
  
    await ishodclick(id);
  };
  

  const updateName = async(id: string, newName: string) => {
    setStaffData(prevData =>
      prevData.map(member =>
        member._id === id ? { ...member, name: newName } : member
      )
    );
    await updatename(id, newName);
  };

  const updateEmail = async(id: string, newEmail: string) => {
    setStaffData(prevData =>
      prevData.map(member =>
        member._id === id ? { ...member, email: newEmail } : member
      )
    );
    await updateemail(id,newEmail);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Staff List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">HOD</th>
              <th className="border px-4 py-2">Master Admin</th>
              <th className="border px-4 py-2">Tutor</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map(member => (
              <tr key={member._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateName(member._id, e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateEmail(member._id, e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => onHodClick(member._id)}
                    className={`px-3 py-1 rounded ${
                      member.ishod ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {member.ishod ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => onMasterClick(member._id)}
                    className={`px-3 py-1 rounded ${
                      member.ismaster ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {member.ismaster ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className={`px-3 py-1 rounded ${
                      member.istutor ? 'bg-purple-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {member.istutor ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffListComponent;
