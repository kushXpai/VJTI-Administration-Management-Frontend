"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type StudentReviewData = {
  id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  mobile_number: string;
  cet_application_id: string;
  cet_rank: string;
  course: string;
  category: string;
  is_pwd: boolean;
  is_ews: boolean;
  is_religious_minority: boolean;
};

const ReviewApplications = () => {
  const [students, setStudents] = useState<StudentReviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("students").select(
        "id, name, date_of_birth, gender, mobile_number, cet_application_id, cet_rank, course, category, is_pwd, is_ews, is_religious_minority"
      );

      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Student Applications Review</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">CET ID</th>
              <th className="p-2 border">CET Rank</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">PWD</th>
              <th className="p-2 border">EWS</th>
              <th className="p-2 border">Religious Minority</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border">
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.date_of_birth}</td>
                <td className="p-2 border">{student.gender}</td>
                <td className="p-2 border">{student.mobile_number}</td>
                <td className="p-2 border">{student.cet_application_id}</td>
                <td className="p-2 border">{student.cet_rank}</td>
                <td className="p-2 border">{student.course}</td>
                <td className="p-2 border">{student.category}</td>
                <td className="p-2 border">{student.is_pwd ? "Yes" : "No"}</td>
                <td className="p-2 border">{student.is_ews ? "Yes" : "No"}</td>
                <td className="p-2 border">{student.is_religious_minority ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewApplications;
