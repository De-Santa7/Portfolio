"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "uploading" | "success" | "error";

interface UploadCardProps {
  title: string;
  subtitle: string;
  accept: string;
  acceptLabel: string;
  endpoint: string;
  fieldName: string;
  blobKey: string;
  successMessage: string;
  maxSizeMB?: number;
  previewImage?: boolean;
}

function UploadCard({
  title,
  subtitle,
  accept,
  acceptLabel,
  endpoint,
  fieldName,
  blobKey,
  successMessage,
  maxSizeMB = 4,
  previewImage = false,
}: UploadCardProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleFile(f: File | null) {
    if (!f) return;
    setFile(f);
    setStatus("idle");
    setMessage("");
    if (previewImage) setPreview(URL.createObjectURL(f));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  async function handleUpload() {
    if (!file) return;
    setStatus("uploading");
    setMessage("");

    const form = new FormData();
    form.append(fieldName, file);

    try {
      const res = await fetch(endpoint, { method: "POST", body: form });
      if (res.status === 401) { router.refresh(); return; }
      const data = await res.json().catch(() => ({ error: `Server error (${res.status})` }));

      if (res.ok) {
        setStatus("success");
        setMessage(successMessage);
        setFile(null);
        if (previewImage) setPreview(null);
      } else {
        setStatus("error");
        setMessage(data.error ?? "Upload failed");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-blob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: blobKey }),
      });
      if (res.status === 401) { router.refresh(); return; }
      const data = await res.json().catch(() => ({ error: `Server error (${res.status})` }));

      if (res.ok) {
        setStatus("success");
        setMessage(`${title} deleted.`);
      } else {
        setStatus("error");
        setMessage(data.error ?? "Delete failed");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-6 shadow-card flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragging ? "border-accent/60 bg-accent/5" : "border-white/10 hover:border-white/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        {previewImage && preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="mx-auto h-24 w-24 rounded-full object-cover border border-white/10" />
        ) : file ? (
          <div>
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-zinc-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-zinc-400">
              Drop {acceptLabel} here or <span className="text-accent">browse</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1">Max {maxSizeMB} MB</p>
          </div>
        )}
      </div>

      {message && (
        <p className={`text-xs ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || status === "uploading"}
        className="w-full bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors"
      >
        {status === "uploading" ? "Uploading…" : `Upload ${title}`}
      </button>

      {/* Delete */}
      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 flex-1">Delete current {title.toLowerCase()}?</span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 font-medium transition-colors"
          >
            {deleting ? "Deleting…" : "Yes, delete"}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setConfirmDelete(true); setMessage(""); }}
          className="text-xs text-zinc-600 hover:text-red-400 transition-colors text-left"
        >
          Delete current {title.toLowerCase()}
        </button>
      )}
    </div>
  );
}

export default function UploadForm() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Manage your live portfolio assets</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <UploadCard
          title="Photo"
          subtitle="Your profile / About section photo"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          acceptLabel="a photo"
          endpoint="/api/upload-image"
          fieldName="avatar"
          blobKey="avatar"
          successMessage="Photo updated! Refresh the homepage to see it."
          maxSizeMB={4}
          previewImage
        />
        <UploadCard
          title="CV"
          subtitle="PDF, Word, or any document format"
          accept=""
          acceptLabel="your CV"
          endpoint="/api/upload-cv"
          fieldName="cv"
          blobKey="cv"
          successMessage="CV updated successfully!"
          maxSizeMB={4}
        />
      </div>
    </div>
  );
}
