"use client";
import React, { useEffect } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  // useEffect(() => {
  //   let cookies = document.cookie("token");
  //   console.log(cookies);
  // }, [cookies]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>

      <div className="my-5 grid grid-cols-1 md:grid-cols-3">
        <AddNewInterview />
      </div>

      {/* Privious interview list */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;
