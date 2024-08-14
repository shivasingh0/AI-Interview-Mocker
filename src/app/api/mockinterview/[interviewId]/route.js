import { connectToDb } from "@/src/dbConnection/mongoDb";
import MockInterview from "@/src/models/mockInterviewModel";
import { NextResponse } from "next/server";

connectToDb();

export async function GET(req, { params }) {
    try {
        const { interviewId } = params; // Use interviewId instead of mockId
        // const { mockId } = params; // Use interviewId instead of mockId
        console.log(`interviewId`, interviewId);
        // console.log(`mockId`, mockId);

        // Fetch the MockInterview document from the database
        const interview = await MockInterview.findOne({ mockId: interviewId });
        console.log("interview line 14", interview);


        if (!interview) {
            return NextResponse.json({ error: "Interview not found" }, { status: 404 });
        }

        return NextResponse.json(interview, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}