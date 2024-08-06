import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    number: {
        type: String,
        required: [true, "Please provide an number"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User;