'use client';
import ClassDropdown from '@/components/classDropdown';
import ResultComponent from '@/components/ResultAnalysis/ResultComponent';
import { useDB } from '@/lib/Context';
import React from 'react';




const PageComponent = () => {
  const { dbUser,AllClass } = useDB();

  if (!dbUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {dbUser.ismaster&&<ClassDropdown classes={AllClass}/>}
      <ResultComponent />
    </div>
  );
};

export default PageComponent;
