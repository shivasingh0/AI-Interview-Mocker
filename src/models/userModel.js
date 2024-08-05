import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide username"],
        unique: [true, "This username not available"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Try another email"]
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