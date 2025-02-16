'use client';
import { useDB } from '@/lib/Context';
import React from 'react';

const SubjectHandeled = () => {
  const { subjectHandeled } = useDB();

  console.log(subjectHandeled);

  if (!subjectHandeled?.subjectsHandled?.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <h2 className="text-2xl text-gray-500">No Subjects Assigned</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6">Subjects Handled</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* @ts-ignore */}
        {subjectHandeled?.subjectsHandled?.map((item,index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {item.subjectId?.name || 'Subject Not Found'}
            </h3>
            <p className="text-gray-600 mt-1">
              <strong>Code:</strong> {item.subjectId?.code || 'N/A'}
            </p>
            <p className="text-gray-600 mt-1">
              <strong>Class:</strong> {item.classId?.name || 'Class Not Assigned'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectHandeled;
