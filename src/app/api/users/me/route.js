import { connectToDb } from "@/src/dbConnection/mongoDb";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import User from "@/src/models/userModel";
import { NextResponse } from "next/server";

connectToDb();

export async function GET(req) {

    try {
        // extract data from token
        const userId = await getDataFromToken(req)
        const user = await User.findOne({ _id: userId }).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        console.log(`user`, user);
        const response = NextResponse.json({
            message: "User found",
            data: user
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        console.log("error");
    }
}