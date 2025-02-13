'use client';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { auth, googleprovider } from "./firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getAllClass, GetUser } from "./user.actions";
import { toast } from "@/hooks/use-toast";

// Define the context type interface
interface DbContextType {
  studentList: any;
  setstudentList: Dispatch<SetStateAction<any>>;
  fUser: any;
  setfUser: Dispatch<SetStateAction<any>>;
  dbUser: any;
  setdbUser: Dispatch<SetStateAction<any>>;
  classData: any;
  setClassData: Dispatch<SetStateAction<any>>;
  gridData: any;
  AllClass: any;
  toggle: any;
  settoggle:Dispatch<SetStateAction<any>>;
  subjectHandeled: any;
  setgridData: Dispatch<SetStateAction<any>>;
  setsubjectHandeled: Dispatch<SetStateAction<any>>;
  setAllClass: Dispatch<SetStateAction<any>>;
  google:()=>void;
  logout:()=>void;
}

// Set default values for the context
const DbContext = createContext<DbContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
}

// FirebaseProvider component
export const DbProvider = ({ children }: FirebaseProviderProps) => {
  const [studentList, setstudentList] = useState<any>(null);
  const [fUser,setfUser]=useState<any>(null);
  const [dbUser,setdbUser]=useState<any>(null);
  const [classData, setClassData] = useState<any>(null);
  const [gridData, setgridData] = useState<any>(null);
  const [subjectHandeled, setsubjectHandeled] = useState<any>(null);
  const [AllClass, setAllClass] = useState<any>(null);
  const [toggle, settoggle] = useState<boolean>(false);

  useEffect(()=>
    {
         const getuser=async()=>
         {
         if(fUser?.email)
         {
          const res=await GetUser(fUser?.email);
          if(res.user===null)
          {
            toast({
              title: "Failure!",
              description: "You are not Autherised by admin!...",
            })
            await logout();
          }
          if(!res.user.ishod)
          {
            if(!res.user.istutor)
              {
                toast({
                  title: "Failure!",
                  description: "You are not tutor to any class please contact your admin!...",
                })
                await logout();
              }
          }
          if(res.user.ishod)
          {
            
            const classea=await getAllClass();
            setAllClass(classea?.classes);
             if(!res.user.classId)
             {
                res.user.classId=classea?.classes[0]?._id;
             }
          }
          console.log(res);
          setdbUser(res.user);
         }
         }
         getuser();
    },[fUser])

  useEffect(()=>
    {
        const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>
            {
              setfUser(currentUser);
                
            })
            return ()=>
                {
                    unsubscribe();
                }
                
            },[])

            async function google()
     {
      signInWithPopup(auth, googleprovider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // setcredentials(credential);
    // const token = credential.accessToken;
    // console.log("Token: "+token);
    // The signed-in user info.
    const user = result.user;
    setfUser(user);
    console.log("user: "+user);

 

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log('errorCode :'+errorCode )

    const errorMessage = error.message;
    console.log('errormessge'+errorMessage) 

    // The email of the user's account used.
    const email = error.customData.email;
    console.log(' email'+ email)

    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('credential'+credential)

  });
     } 
     async function logout()
     {
         try {
             await auth.signOut();
             console.log('User signed out successfully!');
             // Optionally, redirect or perform other actions after logout
           } catch (error) {
             console.error('Error signing out:', error);
             // Handle errors appropriately (e.g., display an error message to the user)
           }
         
     }

  return (
    <DbContext.Provider value={{ studentList, setstudentList,fUser,setfUser,google,logout,dbUser,setdbUser,classData, setClassData,gridData, setgridData,subjectHandeled, setsubjectHandeled,AllClass,setAllClass,toggle, settoggle }}>
      {children}
    </DbContext.Provider>
  );
};

// Custom hook to use DbContext
export const useDB = () => {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error("useDB must be used within a DbProvider");
  }
  return context;
};
