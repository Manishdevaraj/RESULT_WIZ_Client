"use client";
import { useEffect, useState } from "react";
import { getclassById } from "@/lib/user.actions";
import { useDB } from "@/lib/Context";

// Dynamically import Lottie

const Subjects = () => {
  const { dbUser,classData } = useDB();
  

  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Details</h2>
      
      {classData && classData.subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classData.subjects.map((subject, index) => (
            <div key={subject._id} className="bg-white p-4 shadow-lg rounded-xl">
              <h3 className="text-xl font-bold text-amber-600 mb-2">{subject.subjectId.name}</h3>
              <p className="text-sm text-gray-600">
                <strong>Code:</strong> {subject.subjectId.code}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Semester:</strong> {subject.sem}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {subject.subjectId.type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Credit:</strong> {subject.subjectId.credit}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Staff:</strong> {subject.staffId.length > 0 ? subject.staffId.join(", ") : "Not Assigned"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No subjects found for this class.</p>
      )}
    </div>
  );
};

export default Subjects;
