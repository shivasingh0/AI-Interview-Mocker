import { connectToDb } from "@/dbConnection/mongoDb";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not exist" }, { status: 404 });
    }
    console.log(`user`, user);
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    if (user.isVarified === false) {
        return NextResponse.json({ error: "User not verified" }, { status: 402 });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Login successful",
      status: true,
      user
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}