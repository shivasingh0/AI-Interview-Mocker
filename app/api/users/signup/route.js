import { connectToDb } from "@/dbConnection/mongoDb";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connectToDb();

export default async function POST(req, res) {
    try {
        const reqBody = await req.json();
        const { userName, email, password } = reqBody;
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ error: "User already exists" });
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
    }
}
