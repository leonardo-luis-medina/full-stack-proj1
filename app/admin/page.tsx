"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  liveUrl: string | null;
  repoUrl: string | null;
  tags: string[];
  imageUrl: string | null;
  order: number;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Add project state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Edit project state
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editRepoUrl, setEditRepoUrl] = useState("");
  const [editTags, setEditTags] = useState("");

  // Reorder state
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [dirty, setDirty] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Protect admin page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session?.user?.role !== "OWNER" && status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  // Get projects
  const { data, refetch } = trpc.projects.getAll.useQuery();

  // Keep the local list in sync with the server (unless mid-reorder)
  useEffect(() => {
    if (data && !dirty) {
      setItems(
        [...(data as ProjectItem[])].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );
    }
  }, [data, dirty]);

  // Create project
  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setLiveUrl("");
      setRepoUrl("");
      setTags("");
      setImageFile(null);
      setImagePreview("");
      refetch();
    },
  });

  // Update project (edit modal)
  const updateProject = trpc.projects.update.useMutation({
    onSuccess: () => {
      setEditing(null);
      refetch();
    },
  });

  // Update project (used only for saving the order)
  const reorderProject = trpc.projects.update.useMutation();

  // Delete project
  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => refetch(),
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Create project
  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    setUploading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: imageFile.name,
            contentType: imageFile.type,
          }),
        });

        if (!res.ok) throw new Error("Failed to get upload URL");

        const { uploadUrl, publicUrl } = await res.json();

        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: imageFile,
          headers: { "Content-Type": imageFile.type },
        });

        if (!uploadResponse.ok) throw new Error("Failed to upload image");

        imageUrl = publicUrl;
      }

      createProject.mutate({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl || undefined,
        liveUrl: liveUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        // new projects go to the end; reorder below if you want them first
        order: items.length,
      });
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setUploading(false);
    }
  };

  // Open edit modal
  const openEdit = (project: ProjectItem) => {
    setEditing(project);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditLiveUrl(project.liveUrl || "");
    setEditRepoUrl(project.repoUrl || "");
    setEditTags(project.tags.join(", "));
  };

  // Update project
  const handleUpdate = () => {
    if (!editing) return;
    if (!editTitle.trim() || !editDescription.trim()) return;

    updateProject.mutate({
      id: editing.id,
      title: editTitle.trim(),
      description: editDescription.trim(),
      liveUrl: editLiveUrl.trim() || undefined,
      repoUrl: editRepoUrl.trim() || undefined,
      tags: editTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  // ---- Reordering ----
  const moveItem = (from: number, to: number) => {
    if (from === to || to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    setDirty(true);
  };

  const resetDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const resetOrder = () => {
    setDirty(false); // effect re-syncs from server data
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      await Promise.all(
        items.map((p, i) =>
          p.order === i
            ? Promise.resolve()
            : reorderProject.mutateAsync({
                id: p.id,
                title: p.title,
                description: p.description,
                liveUrl: p.liveUrl || undefined,
                repoUrl: p.repoUrl || undefined,
                tags: p.tags,
                order: i,
              })
        )
      );
      setDirty(false);
      await refetch();
    } catch (error) {
      console.error("Failed to save order:", error);
    } finally {
      setSavingOrder(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (status !== "authenticated" || session?.user?.role !== "OWNER") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <a
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/10"
          >
            ← Back to site
          </a>
        </div>

        {/* Add Project Form */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Add New Project</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <textarea
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <input
              type="text"
              placeholder="Live URL (optional)"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <input
              type="text"
              placeholder="GitHub URL (optional)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <input
              type="text"
              placeholder="Tags (comma separated e.g. React, Node.js)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Project Image (optional)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:text-black hover:file:bg-gray-200"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 h-32 w-48 rounded-xl object-cover"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={createProject.isPending || uploading}
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-gray-200 disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : createProject.isPending
                ? "Adding..."
                : "Add Project"}
            </button>
          </div>
        </div>

        {/* Projects List (drag to reorder) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Your Projects</h2>

            {dirty && (
              <div className="flex gap-2">
                <button
                  onClick={resetOrder}
                  disabled={savingOrder}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
                >
                  Reset
                </button>
                <button
                  onClick={saveOrder}
                  disabled={savingOrder}
                  className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-gray-200 disabled:opacity-50"
                >
                  {savingOrder ? "Saving..." : "Save Order"}
                </button>
              </div>
            )}
          </div>

          <p className="mb-6 text-xs text-gray-500">
            Drag a project by its handle (or use ▲ ▼ on mobile). The top
            project shows first on the site. Press “Save Order” when done.
          </p>

          {items.length === 0 && (
            <p className="text-sm text-gray-500">No projects yet.</p>
          )}

          <div className="space-y-3">
            {items.map((project, i) => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => {
                  setDragIndex(i);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(i));
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (overIndex !== i) setOverIndex(i);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null) moveItem(dragIndex, i);
                  resetDrag();
                }}
                onDragEnd={resetDrag}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition md:p-4 ${
                  overIndex === i && dragIndex !== null && dragIndex !== i
                    ? "border-indigo-400 bg-indigo-400/10"
                    : "border-white/10 bg-white/5"
                } ${dragIndex === i ? "opacity-40" : ""}`}
              >
                {/* Handle + info */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="cursor-grab select-none px-1 text-lg text-gray-500 active:cursor-grabbing"
                    title="Drag to reorder"
                  >
                    ⠿
                  </span>

                  <span className="w-5 shrink-0 text-center font-mono text-xs text-indigo-400">
                    {i + 1}
                  </span>

                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      draggable={false}
                      className="h-12 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-white">
                      {project.title}
                    </h3>
                    <p className="truncate text-xs text-gray-500">
                      {project.tags.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveItem(i, i - 1)}
                      disabled={i === 0}
                      className="px-2 text-xs text-gray-400 hover:text-white disabled:opacity-20"
                      aria-label="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveItem(i, i + 1)}
                      disabled={i === items.length - 1}
                      className="px-2 text-xs text-gray-400 hover:text-white disabled:opacity-20"
                      aria-label="Move down"
                    >
                      ▼
                    </button>
                  </div>

                  <button
                    onClick={() => openEdit(project)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject.mutate({ id: project.id })}
                    disabled={deleteProject.isPending}
                    className="rounded-full border border-red-400/20 px-4 py-2 text-xs text-red-400 transition hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {deleteProject.isPending ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-white">Edit Project</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              <textarea
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              <input
                type="text"
                placeholder="Live URL (optional)"
                value={editLiveUrl}
                onChange={(e) => setEditLiveUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              <input
                type="text"
                placeholder="GitHub URL (optional)"
                value={editRepoUrl}
                onChange={(e) => setEditRepoUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleUpdate}
                disabled={updateProject.isPending}
                className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition hover:bg-gray-200 disabled:opacity-50"
              >
                {updateProject.isPending ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => setEditing(null)}
                disabled={updateProject.isPending}
                className="rounded-full border border-white/20 px-6 py-2 text-sm text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}