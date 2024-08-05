import { connectToDb } from "@/src/dbConnection/mongoDb";
import { sendMail } from "@/src/helpers/mailer";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

connectToDb();

export async function POST(req) {

    try {
        const reqBody = await req.json();
        const { userName, email, password, number } = reqBody;
        // console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 401 });
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            number
        });
        const savedUser = await newUser.save();
        // console.log(savedUser);

        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
        return NextResponse.json({ message: "User created successfully", user: savedUser }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, {status: 500});
    }
}
