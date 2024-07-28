"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MpckInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

const Interview = ({ params }) => {
  const router = useRouter();
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

  const handleStartInterview = () => {
    if (webCamEnabled) {
      router.push(`/dashboard/interview/${params.interviewId}/start`);
    } else {
      toast("Webcam not enabled");
    }
  };

  return (
    <div className="my-10 px-[100px] flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let&apos;s get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-end gap-10 my-7">
        <div className="flex flex-col gap-10">
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
          <div className="bg-secondary border rounded-lg flex justify-center p-10">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{ height: 300}}
                mirrored={true}
              />
            ) : (
              <>
                <WebcamIcon className="h-28 w-full" />
              </>
            )}
          </div>
          {webCamEnabled ? (
            <div className="flex justify-center my-10">
             <Button onClick={handleStartInterview}>
             Start Interview <Sparkles className="ms-2" />
           </Button>
           </div>
          ) : (
            <div className="flex justify-center my-10">
              <Button
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
                className="my-2 border"
              >
                Enable Web Cam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
