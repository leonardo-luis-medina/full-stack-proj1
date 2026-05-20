"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (session?.user?.role !== "OWNER" && status === "authenticated") router.push("/");
  }, [session, status]);

  const { data, refetch } = trpc.projects.getAll.useQuery();
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
  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title || !description) return;
    setUploading(true);
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
      const { uploadUrl, publicUrl } = await res.json();
      await fetch(uploadUrl, {
        method: "PUT",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });
      imageUrl = publicUrl;
    }
    createProject.mutate({
      title,
      description,
      imageUrl: imageUrl || undefined,
      liveUrl: liveUrl || undefined,
      repoUrl: repoUrl || undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: 0,
    });
    setUploading(false);
  };

  if (status === "loading") return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Project</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <textarea
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
            <input
              type="text"
              placeholder="Live URL (optional)"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="text"
              placeholder="GitHub URL (optional)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="text"
              placeholder="Tags (comma separated e.g. React, Node.js)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div>
              <label className="block text-sm text-gray-600 mb-2">Project Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-900 file:text-white hover:file:bg-gray-700"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded-xl" />
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={createProject.isPending || uploading}
              className="px-6 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : createProject.isPending ? "Adding..." : "Add Project"}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Projects</h2>
          {data?.length === 0 && (
            <p className="text-gray-400 text-sm">No projects yet. Add one above!</p>
          )}
          <div className="space-y-4">
            {data?.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded-lg" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-500">{project.tags.join(", ")}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteProject.mutate({ id: project.id })}
                  className="text-sm text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
