import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    size: Number,

    chunkCount: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Document", documentSchema);
