"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import Webcam from "react-webcam";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
    console.log(userAnswer);
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const question = mockInterviewQuestion[activeIndex]?.question;
    const correctAns = mockInterviewQuestion[activeIndex]?.answer;
    console.log(correctAns);
    console.log(question);

    if (!question || !correctAns) {
      toast.error("Question or correct answer is missing.");
      setLoading(false);
      return;
    }

    const feedbackPrompt = `Question : ${question}, Correct Answer: ${correctAns}, User Answer : ${userAnswer}, Depends on question, correct answer and user answer for giving interview question. Please give us rating for answer and feedback as area of improvement in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(mockJsonResp);

    let jsonFeedbackResp;
    try {
      jsonFeedbackResp = JSON.parse(mockJsonResp);
    } catch (e) {
      console.error("Failed to parse JSON response", e);
      toast.error("Failed to parse feedback response. Please try again.");
      setLoading(false);
      return;
    }

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: question,
      correctAns: correctAns,
      userAnswer: userAnswer,
      rating: jsonFeedbackResp?.rating,
      feedback: jsonFeedbackResp?.feedback,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    console.log(resp);

    if (resp) {
      toast("User answer recorded successfully!");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" flex flex-col justify-center bg-black items-center mt-20 rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="flex animate-pulse gap-2 items-center text-red-600">
            <StopCircle />
            Stop Recoding
          </h2>
        ) : (
          <h2 className="flex gap-2 items-center text-blue-600">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
