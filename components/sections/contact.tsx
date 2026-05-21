"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import Pusher from "pusher-js";

export default function Contact() {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);

  const { data, refetch } = trpc.comments.getAll.useQuery({ page });
  const createComment = trpc.comments.create.useMutation({
    onSuccess: () => { setComment(""); refetch(); },
  });
  const deleteComment = trpc.comments.delete.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("comments");
    channel.bind("new-comment", () => refetch());
    channel.bind("delete-comment", () => refetch());
    return () => { channel.unbind_all(); pusher.disconnect(); };
  }, []);

  return (
    <section id="contact" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
          Contact Me
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm">
          Open to opportunities, collaborations, or just a chat
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <p className="text-gray-400 text-sm mb-2">Feel free to reach out directly:</p>
          <a href="mailto:leonardo.luis.medina99@gmail.com" className="text-white font-medium hover:text-gray-300 transition text-sm">
            leonardo.luis.medina99@gmail.com
          </a>
          <div className="flex gap-4 mt-4">
            <a href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition">LinkedIn</a>
            <a href="https://github.com/leonardo-luis-medina" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition">GitHub</a>
            <span className="text-xs text-gray-600">0966-048-7394</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Comment Board</h3>
          {session ? (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                  {session.user?.name?.[0]}
                </div>
                <span className="text-xs text-gray-400">{session.user?.name}</span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 resize-none"
              />
              <button
                onClick={() => { if (!comment.trim()) return; createComment.mutate({ body: comment }); }}
                disabled={createComment.isPending}
                className="mt-3 px-6 py-2 bg-white text-black text-xs font-medium rounded-full hover:bg-gray-200 transition disabled:opacity-50"
              >
                {createComment.isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-white/5 rounded-xl text-center">
              <p className="text-gray-500 text-xs mb-3">Log in to leave a comment</p>
              <button onClick={() => signIn()} className="px-6 py-2 bg-white text-black text-xs font-medium rounded-full hover:bg-gray-200 transition">
                Login
              </button>
            </div>
          )}
          <div className="space-y-3">
            {data?.comments.length === 0 && (
              <p className="text-gray-600 text-xs text-center">No comments yet. Be the first!</p>
            )}
            {data?.comments.map((c) => (
              <div key={c.id} className="flex gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition group">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {c.author.name?.[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white">{c.author.name}</span>
                    <span className="text-xs text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-400">{c.body}</p>
                  {(session?.user?.id === c.authorId || session?.user?.role === "OWNER") && (
                    <button onClick={() => deleteComment.mutate({ id: c.id })} className="text-xs text-red-500/50 hover:text-red-400 mt-1 transition">
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
                <button key={i} onClick={() => setPage(i + 1)} className={`w-7 h-7 rounded-full text-xs ${page === i + 1 ? "bg-white text-black" : "bg-white/10 text-gray-400 hover:bg-white/20"}`}>
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
