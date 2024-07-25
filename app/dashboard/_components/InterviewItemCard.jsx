"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  return (
    <div className="border rounded-lg p-3 shadow-sm">
      <h2 className="font-bold text-blue-600 capitalize">
        {interview?.jobPosition}
      </h2>
      <h2 className=" text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className=" text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>

      <div className="flex justify-between gap-3 mt-2">
        <Button
          size="sm"
          onClick={() =>
            router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
          }
          className="w-full"
          variant="outline"
        >
          Feedback
        </Button>
        <Button
          size="sm"
          onClick={() =>
            router.push(`/dashboard/interview/${interview?.mockId}`)
          }
          className="w-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
