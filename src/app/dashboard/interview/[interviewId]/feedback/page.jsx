"use client";
import { db } from "@/src/utils/db";
import { UserAnswer } from "@/src/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer?.mockIdRef, params?.interviewId))
      .orderBy(UserAnswer?.id);

    // console.log(result);

    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + parseFloat(item?.rating),
        0
      );
      const avgRating = totalRating / result.length;
      setAverageRating(parseFloat(avgRating.toFixed(1)));
    }

    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      {feedbackList.length == 0 ? (
        <h2 className="text-blue-600 text-xl font-bold my-3">
          No Interview Feedback Record Found !
        </h2>
      ) : (
        <>
          <h2 className="text-3xl text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-blue-600 text-lg my-3">
            Your overall interview rating: <strong>{averageRating}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-400">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>

          {feedbackList.map((item, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-secondary rounded-lg px-4 my-2 capitalize w-full flex justify-start gap-3">
                  <strong>{index + 1}: </strong>
                  <strong>Question: </strong>
                  {item?.question}
                </AccordionTrigger>
                <AccordionContent className="border rounded-lg p-2 text-red-600">
                  <strong>Rating: </strong>
                  {item?.rating}
                </AccordionContent>
                <AccordionContent className="bg-red-50 p-2 rounded-lg my-2 text-red-900 capitalize">
                  <strong>Your Answer: </strong>
                  {item?.userAnswer}
                </AccordionContent>
                <AccordionContent className="bg-green-50 rounded-lg text-green-900 p-2 capitalize">
                  <strong>Correct Answer: </strong>
                  {item?.correctAns}
                </AccordionContent>
                <AccordionContent className="bg-blue-50 rounded-lg text-blue-900 p-2 capitalize mt-2">
                  <strong>Feedback: </strong>
                  {item?.feedback}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </>
      )}
      <Button className="my-10" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
