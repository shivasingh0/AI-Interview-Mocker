import { connectToDb } from "@/src/dbConnection/mongoDb";
import MockInterview from "@/src/models/mockInterviewModel";
import { NextResponse } from "next/server";

connectToDb();

export async function POST(req) {
    try {
        const reqBody = await req.json();

        // Create a new MockInterview document
        const newMockInterview = new MockInterview(reqBody);

        // Save the document to the database
        const savedMockInterview = await newMockInterview.save();

        return NextResponse.json({ success: true, mockId: savedMockInterview._id }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}