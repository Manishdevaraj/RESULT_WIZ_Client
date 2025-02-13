"use client";
import AdminComponent from "@/components/admin/AdminComponent";
import ClassDropdown from "@/components/classDropdown";
import { useDB } from "@/lib/Context";

const Admin = () => {

  const {dbUser,AllClass}=useDB();
  console.log(dbUser);

  if(!dbUser)
  {
    return <div>Loading...</div>
  }

  return(
    <>
      {dbUser.ismaster&&<ClassDropdown classes={AllClass}/>}

    <AdminComponent/>
    </>
  )

}
export default Admin;
