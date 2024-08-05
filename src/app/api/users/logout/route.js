import { NextResponse } from "next/server";


export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires : Date.now(0)
        })
        return response;
    } catch (error) {
        console.error("Error in logout", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}