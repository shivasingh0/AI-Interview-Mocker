"use client";
import { db } from "@/utils/db";
import { MpckInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
    console.log(interviewData);
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
        console.log("result", result);
      } else {
        console.error("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  console.log("interviewData", interviewData);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Question section */}
        <div>
          <QuestionSection
            activeIndex={activeIndex}
            mockInterviewQuestion={mockInterviewQuestion}
          />
        </div>
        {/* video section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeIndex={activeIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeIndex > 0 && (
          <Button onClick={() => setActiveIndex(activeIndex - 1)}>
            Previous Question
          </Button>
        )}

        {activeIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveIndex(activeIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
