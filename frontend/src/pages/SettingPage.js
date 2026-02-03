import { useEffect, useState } from "react";
import {
    getDocuments,
    deleteDocument
} from "../services/documentApi";
import styles from "./SettingPage.module.css";
import Upload from "../components/Upload";

export default function SettingsPage() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDocs();
    }, []);

    const handleNewDocument = (doc) => {
        // 🔥 instantly show new document
        setDocs(prev => [doc, ...prev]);
    };

    const loadDocs = async () => {
        const res = await getDocuments();
        setDocs(res);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this document?")) return;
        await deleteDocument(id);
        setDocs(prev => prev.filter(d => d._id !== id));
    };

    return (
        <div className={styles.page}>


            {/* Upload Section */}
            <div className={styles.uploadSection}>
                <div className={styles.uploadCard}>
                    <div className={styles.uploadIcon}>
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <h3 className={styles.uploadTitle}>
                        Query Your Personal Data
                    </h3>
                    <p className={styles.uploadDescription}>
                        Upload your documents and get personalized, context-aware answers based on your own information
                    </p>
                    <Upload onUploadSuccess={handleNewDocument} />
                </div>
            </div>

            <h2>My Documents</h2>

            {loading ? (
                <p>Loading...</p>
            ) : docs.length === 0 ? (
                <p>No documents uploaded</p>
            ) : (
                <div className={styles.list}>
                    {docs.map(doc => (
                        <div
                            key={doc._id}
                            className={styles.row}
                        >
                            <div>
                                <strong>{doc.name}</strong>
                                <p>
                                    {doc.chunkCount} chunks ·{" "}
                                    {new Date(doc.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(doc._id)}
                                className={styles.deleteBtn}
                            >
                                🗑 Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

