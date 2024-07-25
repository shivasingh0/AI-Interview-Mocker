import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeIndex }) => {
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="border p-5 rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`px-1 py-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeIndex === index
                    ? "bg-[#4845D2] text-white"
                    : "bg-secondary "
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="mt-10 text-sm md:text-lg">
          {mockInterviewQuestion[activeIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer my-5"
          onClick={() =>
            textToSpeach(mockInterviewQuestion[activeIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-blue-100">
          <h2 className="flex gap-2 items-center text-blue-600">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="my-2 text-sm text-blue-600 font-semibold">
            {process.env.NEXT_PUBLIC_RECORD_ANSWER_INFORMATION}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
