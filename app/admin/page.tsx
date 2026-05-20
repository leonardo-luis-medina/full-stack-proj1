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
      refetch();
    },
  });
  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleSubmit = () => {
    if (!title || !description) return;
    createProject.mutate({
      title,
      description,
      liveUrl: liveUrl || undefined,
      repoUrl: repoUrl || undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: 0,
    });
  };

  if (status === "loading") return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Add Project Form */}
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
            <button
              onClick={handleSubmit}
              disabled={createProject.isPending}
              className="px-6 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition disabled:opacity-50"
            >
              {createProject.isPending ? "Adding..." : "Add Project"}
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Projects</h2>
          {data?.length === 0 && (
            <p className="text-gray-400 text-sm">No projects yet. Add one above!</p>
          )}
          <div className="space-y-4">
            {data?.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.tags.join(", ")}</p>
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
