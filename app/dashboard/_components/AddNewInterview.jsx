"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle, Sparkles } from "lucide-react";
import { db } from "@/utils/db";
import { MpckInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobRole, jobDesc, jobExperience);

    const inputPrompt = `Job Role: ${jobRole}, Job Description: ${jobDesc}, Job Experience: ${jobExperience} years. Based on that give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions. Give me all the questions in JSON formate`;

    const result = await chatSession.sendMessage(inputPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(JSON.parse(mockJsonResp));

    setAiResponse(mockJsonResp);

    if (mockJsonResp) {
      const resp = await db
        .insert(MpckInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: mockJsonResp,
          jobDesc: jobDesc,
          jobPosition: jobRole,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MpckInterview.mockId });

      console.log("inserted ID", resp);
      if (resp) {
        setOpenDialog(false);
      }
    } else {
      console.log("ERROR");
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
      <Dialog open={openDialog}>
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
                  <Button
                    variant="secondary"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancle
                  </Button>
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
