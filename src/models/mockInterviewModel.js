import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const MockInterviewSchema = mongoose.Schema({
    mockId: {
        type: String,
        required: [true, "Json MockId is required"],
        default: uuidv4
    },
    jsonMockResp: {
        type: String,
        required: [true, "Json Mock Response is required"],
    },
    jobPosition: {
        type: String,
        required: [true, "Job position is required"],
    },
    jobDesc: {
        type: String,
        required: [true, "Job Description is required"],
    },
    jobExperience: {
        type: String,
        required: [true, "Job Experience is required"],
    },
    createdBy: {
        type: String,
        // required: true,
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
});

const MockInterview = mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);
export default MockInterview;
