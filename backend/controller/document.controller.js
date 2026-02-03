import Document from "../models/document.model.js";
import Embedding from "../models/embedding.model.js";

export const deleteDocument = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const doc = await Document.findOne({
        _id: id,
        userId
    });

    if (!doc) {
        return res.status(404).json({
            message: "Document not found"
        });
    }

    await Embedding.deleteMany({ documentId: id });
    await Document.findByIdAndDelete(id);

    res.json({ success: true });
};


export const getUserDocuments = async (req, res) => {
    const userId = req.user.id;

    const docs = await Document.find({ userId })
        .sort({ createdAt: -1 });

    res.json(docs);
};
