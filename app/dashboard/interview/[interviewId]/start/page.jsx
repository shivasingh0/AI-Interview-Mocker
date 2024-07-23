"use client";
import { db } from "@/utils/db";
import { MpckInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  /**
   * Used to get interviewData by mockId
   */
  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MpckInterview)
        .where(eq(MpckInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        console.log(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.error("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Question section */}
      <div>
        <QuestionSection
          activeIndex={activeIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />
      </div>
      {/* video section */}
      <RecordAnswerSection/>
    </div>
  );
};

export default StartInterview;
