```tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

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
  const [editing, setEditing] = useState<
    {
      id: string;
      title: string;
      description: string;
      liveUrl: string | null;
      repoUrl: string | null;
      tags: string[];
      imageUrl: string | null;
      order: number;
    } | null
  >(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editRepoUrl, setEditRepoUrl] = useState("");
  const [editTags, setEditTags] = useState("");

  // Protect admin page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (
      session?.user?.role !== "OWNER" &&
      status === "authenticated"
    ) {
      router.push("/");
    }
  }, [session, status, router]);

  // Get projects
  const { data, refetch } = trpc.projects.getAll.useQuery();

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

  // Update project
  const updateProject = trpc.projects.update.useMutation({
    onSuccess: () => {
      setEditing(null);
      refetch();
    },
  });

  // Delete project
  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => refetch(),
  });

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

      // Upload image if one was selected
      if (imageFile) {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: imageFile.name,
            contentType: imageFile.type,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to get upload URL");
        }

        const { uploadUrl, publicUrl } = await res.json();

        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: imageFile,
          headers: {
            "Content-Type": imageFile.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

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
        order: 0,
      });
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setUploading(false);
    }
  };

  // Open edit modal
  const openEdit = (project: NonNullable<typeof data>[number]) => {
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

    if (!editTitle.trim() || !editDescription.trim()) {
      return;
    }

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

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (
    status !== "authenticated" ||
    session?.user?.role !== "OWNER"
  ) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Add Project Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Add New Project
          </h2>

          <div className="space-y-4">

            {/* Title */}
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            {/* Description */}
            <textarea
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
            />

            {/* Live URL */}
            <input
              type="text"
              placeholder="Live URL (optional)"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            {/* GitHub URL */}
            <input
              type="text"
              placeholder="GitHub URL (optional)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            {/* Tags */}
            <input
              type="text"
              placeholder="Tags (comma separated e.g. React, Node.js)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            {/* Image */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Project Image (optional)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-gray-200"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-48 h-32 object-cover rounded-xl"
                />
              )}
            </div>

            {/* Add Button */}
            <button
              onClick={handleSubmit}
              disabled={
                createProject.isPending || uploading
              }
              className="px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : createProject.isPending
                ? "Adding..."
                : "Add Project"}
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Your Projects
          </h2>

          {data?.length === 0 && (
            <p className="text-gray-500 text-sm">
              No projects yet.
            </p>
          )}

          <div className="space-y-4">
            {data?.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                {/* Project Information */}
                <div className="flex items-center gap-4">

                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h3 className="font-medium text-white text-sm">
                      {project.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {project.tags.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  {/* Edit */}
                  <button
                    onClick={() => openEdit(project)}
                    className="text-xs px-4 py-2 border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      deleteProject.mutate({
                        id: project.id,
                      })
                    }
                    disabled={deleteProject.isPending}
                    className="text-xs px-4 py-2 text-red-400 border border-red-400/20 rounded-full hover:bg-red-400/10 transition disabled:opacity-50"
                  >
                    {deleteProject.isPending
                      ? "Deleting..."
                      : "Delete"}
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
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditing(null);
            }
          }}
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg">

            <h2 className="text-xl font-bold text-white mb-6">
              Edit Project
            </h2>

            <div className="space-y-4">

              {/* Edit Title */}
              <input
                type="text"
                placeholder="Title"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              {/* Edit Description */}
              <textarea
                placeholder="Description"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              />

              {/* Edit Live URL */}
              <input
                type="text"
                placeholder="Live URL (optional)"
                value={editLiveUrl}
                onChange={(e) =>
                  setEditLiveUrl(e.target.value)
                }
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              {/* Edit GitHub URL */}
              <input
                type="text"
                placeholder="GitHub URL (optional)"
                value={editRepoUrl}
                onChange={(e) =>
                  setEditRepoUrl(e.target.value)
                }
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              {/* Edit Tags */}
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={editTags}
                onChange={(e) =>
                  setEditTags(e.target.value)
                }
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3 mt-6">

              {/* Save */}
              <button
                onClick={handleUpdate}
                disabled={updateProject.isPending}
                className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition disabled:opacity-50"
              >
                {updateProject.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              {/* Cancel */}
              <button
                onClick={() => setEditing(null)}
                disabled={updateProject.isPending}
                className="px-6 py-2 border border-white/20 text-gray-300 text-sm rounded-full hover:bg-white/10 transition disabled:opacity-50"
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
```
