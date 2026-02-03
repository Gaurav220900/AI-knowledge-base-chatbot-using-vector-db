import { useState } from "react";
import axios from "axios";

export default function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState();

  const uploadPdf = async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      form,
      {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem(
              "token"
            )
        }
      }
    );

    if (onUploadSuccess) {
      onUploadSuccess(res?.data?.document);
    }

    alert("Uploaded!");
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={e =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadPdf}
      >
        Upload PDF
      </button>
    </div>
  );
}
