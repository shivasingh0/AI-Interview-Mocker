"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { chatSession } from "@/src/utils/GeminiAiModal";
import { LoaderCircle, Sparkles } from "lucide-react";
import { db } from "@/src/utils/db";
import { MpckInterview } from "@/src/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job Role: ${jobRole}, Job Description: ${jobDesc}, Job Experience: ${jobExperience} years. Based on that give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers. Give me all the questions and answers in JSON formate`;
    try {
      const result = await chatSession.sendMessage(inputPrompt);
      console.log(result.response);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log("mockJsonResp", mockJsonResp);

      // Parse JSON response to array
      const parsedMockJsonResp = JSON.parse(mockJsonResp);

      setAiResponse(parsedMockJsonResp);

      const response = await axios.post("/api/mockinterview", {
        jsonMockResp: parsedMockJsonResp, // Send as an array
        jobPosition: jobRole,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        // createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (response.data.success) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${response.data.mockId}`);
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell us more about your job Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your Job position/role, Job description
                    and years of experience.
                  </h2>
                  <div className="mt-7 my-2">
                    <label className="font-bold text-black">
                      Job role / Job position
                    </label>
                    <Input
                      placeholder="Ex. React Developer"
                      className="mt-1"
                      required
                      onChange={(e) => setJobRole(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-2">
                    <label className="font-bold text-black">
                      Job Description / Tech Stack ( in short )
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, Next.js, NodeJS, etc"
                      className="mt-1"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-2">
                    <label className="font-bold text-black">
                      Years of experience
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex. 5"
                      className="mt-1"
                      required
                      max="15"
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button type="submit" disabled={loading} varient="primary">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin me-2" />
                        Generating from AI
                      </>
                    ) : (
                      <>
                        <Sparkles className="me-2" />
                        Start Interview
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
