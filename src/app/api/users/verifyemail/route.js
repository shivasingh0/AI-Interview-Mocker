import { connectToDb } from "@/src/dbConnection/mongoDb";
import User from "@/src/models/userModel";
import { NextResponse } from "next/server";

connectToDb();

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        user.isVarified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            { message: "Email verified successfully", success: true },
            { status: 500 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
