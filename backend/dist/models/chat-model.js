import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { timeStamp } from "console";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // This adds `createdAt` and `updatedAt` fields
});
export default chatSchema;
//# sourceMappingURL=chat-model.js.map

