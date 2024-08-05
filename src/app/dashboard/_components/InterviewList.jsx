"use client";

import { db } from "@/src/utils/db";
import { MpckInterview } from "@/src/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(MpckInterview)
      .where(
        eq(MpckInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MpckInterview?.id));
    console.log("Query result: ", result);

    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Previous Mock Interview</h2>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
     {
        interviewList && interviewList.map((interview,index)=>(
            <InterviewItemCard interview={interview} key={index}/>
        ))
      }
     </div>
    </div>
  );
};

export default InterviewList;
