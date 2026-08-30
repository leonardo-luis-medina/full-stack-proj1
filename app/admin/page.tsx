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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editRepoUrl, setEditRepoUrl] = useState("");
  const [editTags, setEditTags] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (session?.user?.role !== "OWNER" && status === "authenticated") router.push("/");
  }, [session, status]);

  const { data, refetch } = trpc.projects.getAll.useQuery();
  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      setTitle(""); setDescription(""); setLiveUrl("");
      setRepoUrl(""); setTags(""); setImageFile(null); setImagePreview("");
      refetch();
    },
  });
  const updateProject = trpc.projects.update.useMutation({
    onSuccess: () => { setEditing(null); refetch(); },
  });
  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleImageChange = (e) => {
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
        body: JSON.stringify({ filename: imageFile.name, contentType: imageFile.type }),
      });
      const { uploadUrl, publicUrl } = await res.json();
      await fetch(uploadUrl, { method: "PUT", body: imageFile, headers: { "Content-Type": imageFile.type } });
      imageUrl = publicUrl;
    }
    createProject.mutate({
      title, description,
      imageUrl: imageUrl || undefined,
      liveUrl: liveUrl || undefined,
      repoUrl: repoUrl || undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: 0,
    });
    setUploading(false);
  };

  const openEdit = (project) => {
    setEditing(project);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditLiveUrl(project.liveUrl || "");
    setEditRepoUrl(project.repoUrl || "");
    setEditTags(project.tags.join(", "));
  };

  const handleUpdate = () => {
    if (!editing) return;
    updateProject.mutate({
      id: editing.id,
      title: editTitle,
      description: editDescription,
      liveUrl: editLiveUrl || undefined,
      repoUrl: editRepoUrl || undefined,
      tags: editTags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  if (status === "loading") return <p className="p-8 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Add Project Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Add New Project</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
            <textarea placeholder="Project description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none" />
            <input type="text" placeholder="Live URL (optional)" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
            <input type="text" placeholder="GitHub URL (optional)" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
            <input type="text" placeholder="Tags (comma separated e.g. React, Node.js)" value={tags} onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project Image (optional)</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-gray-200" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded-xl" />}
            </div>
            <button onClick={handleSubmit} disabled={createProject.isPending || uploading}
              className="px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition disabled:opacity-50">
              {uploading ? "Uploading..." : createProject.isPending ? "Adding..." : "Add Project"}
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Your Projects</h2>
          {data?.length === 0 && <p className="text-gray-500 text-sm">No projects yet.</p>}
          <div className="space-y-4">
            {data?.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-4">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded-lg" />
                  )}
                  <div>
                    <h3 className="font-medium text-white text-sm">{project.title}</h3>
                    <p className="text-xs text-gray-500">{project.tags.join(", ")}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(project)}
                    className="text-xs px-4 py-2 border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition">
                    Edit
                  </button>
                  <button onClick={() => deleteProject.mutate({ id: project.id })}
                    className="text-xs px-4 py-2 text-red-400 border border-red-400/20 rounded-full hover:bg-red-400/10 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold text-white mb-6">Edit Project</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <textarea placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none" />
              <input type="text" placeholder="Live URL (optional)" value={editLiveUrl} onChange={(e) => setEditLiveUrl(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <input type="text" placeholder="GitHub URL (optional)" value={editRepoUrl} onChange={(e) => setEditRepoUrl(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <input type="text" placeholder="Tags (comma separated)" value={editTags} onChange={(e) => setEditTags(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleUpdate} disabled={updateProject.isPending}
                className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition disabled:opacity-50">
                {updateProject.isPending ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setEditing(null)}
                className="px-6 py-2 border border-white/20 text-gray-300 text-sm rounded-full hover:bg-white/10 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
