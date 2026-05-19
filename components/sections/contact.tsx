"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);

  const { data, refetch } = trpc.comments.getAll.useQuery({ page });
  const createComment = trpc.comments.create.useMutation({
    onSuccess: () => {
      setComment("");
      refetch();
    },
  });
  const deleteComment = trpc.comments.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment.mutate({ body: comment });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Contact Me</h2>
        <p className="text-gray-500 text-center mb-16">Leave a comment or get in touch</p>
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
          <p className="text-gray-600 mb-4">Feel free to reach out for opportunities or collaborations!</p>
          <p className="text-indigo-600 font-medium">leonardo.luis.medina99@gmail.com</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Comment Board</h3>
          {session ? (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                  {session.user?.name?.[0]}
                </div>
                <span className="text-sm text-gray-600">{session.user?.name}</span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={createComment.isPending}
                className="mt-3 px-6 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition disabled:opacity-50"
              >
                {createComment.isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-gray-500 text-sm mb-3">Log in to leave a comment</p>
              <button
                onClick={() => signIn()}
                className="px-6 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition"
              >
                Login
              </button>
            </div>
          )}
          <div className="space-y-4">
            {data?.comments.length === 0 && (
              <p className="text-gray-400 text-sm text-center">No comments yet. Be the first!</p>
            )}
            {data?.comments.map((c) => (
              <div key={c.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600 flex-shrink-0">
                  {c.author.name?.[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{c.author.name}</span>
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">{c.body}</p>
                  {(session?.user?.id === c.authorId || session?.user?.role === "OWNER") && (
                    <button
                      onClick={() => deleteComment.mutate({ id: c.id })}
                      className="text-xs text-red-400 hover:text-red-600 mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {data && data.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: data.pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm ${page === i + 1 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
