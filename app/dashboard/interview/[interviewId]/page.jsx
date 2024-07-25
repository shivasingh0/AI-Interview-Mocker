"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MpckInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(MpckInterview);
    getInterviewDetails();
  }, []);

  /**
   * Used to get interviewData by mockId
   */
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MpckInterview)
      .where(eq(MpckInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="border p-5 rounded-lg flex flex-col gap-5">
            <h2 className="text-xl">
              <strong>Job Role / Job Position</strong> :{" "}
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-xl">
              <strong>Job Description</strong> : {interviewData?.jobDesc}
            </h2>
            <h2 className="text-xl">
              <strong>Years of Experience</strong> :{" "}
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="font-semibold text-yellow-500">
              {process.env.NEXT_PUBLIC_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          <div className="bg-secondary border rounded-lg p-20 my-7">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{ height: 300, width: 300 }}
                mirrored={true}
              />
            ) : (
              <>
                <WebcamIcon className="h-28 w-full" />
              </>
            )}
          </div>
          {webCamEnabled ? (
            ""
          ) : (
            <div className="flex justify-center">
              <Button variant='ghost' onClick={() => setWebCamEnabled(true)} className="my-2 border">
              Enable Web Cam and Microphone
            </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}><Button>Start Interview <Sparkles className="ms-2" /></Button></Link>
      </div>
    </div>
  );
};

export default Interview;