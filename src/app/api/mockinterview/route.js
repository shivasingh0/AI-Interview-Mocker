import { connectToDb } from "@/src/dbConnection/mongoDb";
import MockInterview from "@/src/models/mockInterviewModel";
import { NextResponse } from "next/server";

connectToDb();

export async function POST(req) {
    try {
        const reqBody = await req.json();

        const { jsonMockResp } = reqBody;

        // const parseMockRes = JSON.parse(jsonMockResp)
        const parseMockRes = Array.isArray(jsonMockResp) ? jsonMockResp : JSON.parse(jsonMockResp);

        // Create a new MockInterview document
        const newMockInterview = new MockInterview({ ...reqBody, jsonMockResp: parseMockRes });

        // Save the document to the database
        const savedMockInterview = await newMockInterview.save();
        // console.log(`savedMockInterview`, savedMockInterview);

        return NextResponse.json({ success: true, mockId: savedMockInterview.mockId }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// export async function GET(req, { params }) {
//     const { id } = params; // Extract the interview ID from the params
//     try {
//         // const { mockId } = params;

//         // Fetch the MockInterview document from the database
//         const interview = await MockInterview.findOne(id);

//         if (!interview) {
//             return NextResponse.json({ error: "Interview not found" }, { status: 404 });
//         }

//         return NextResponse.json(interview, { status: 200 });

//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }