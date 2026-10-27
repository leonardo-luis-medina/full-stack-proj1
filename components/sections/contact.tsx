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
    onSuccess: () => {
      setComment("");
      refetch();
    },
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
    return () => {
      channel.unbind_all();
      pusher.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="h-full overflow-y-auto overscroll-contain px-4 lg:overflow-hidden">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center py-6 lg:h-full lg:min-h-0">
        <div className="mb-5 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Get in touch
          </p>
          <h2 className="mb-2 text-3xl font-black text-white md:text-4xl">
            Contact Me
          </h2>
          <p className="text-xs text-gray-500 md:text-sm">
            Open to opportunities, collaborations, or just a chat
          </p>
        </div>

        <div className="grid min-h-0 grid-cols-1 gap-5 lg:flex-1 lg:grid-cols-5">
          {/* Direct contact */}
          <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur lg:col-span-2">
            <p className="mb-2 text-sm text-gray-400">
              Feel free to reach out directly:
            </p>
            <a
              href="mailto:leonardo.luis.medina99@gmail.com"
              className="break-all text-sm font-medium text-white transition hover:text-indigo-300"
            >
              leonardo.luis.medina99@gmail.com
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 transition hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/leonardo-luis-medina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 transition hover:text-white"
              >
                GitHub
              </a>
              <span className="text-xs text-gray-600">0966-048-7394</span>
            </div>
          </div>

          {/* Comment board */}
          <div className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur lg:col-span-3">
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
              Comment Board
            </h3>

            {session ? (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                    {session.user?.name?.[0]}
                  </div>
                  <span className="text-xs text-gray-400">
                    {session.user?.name}
                  </span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment..."
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-indigo-400/50 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!comment.trim()) return;
                    createComment.mutate({ body: comment });
                  }}
                  disabled={createComment.isPending}
                  className="mt-2 rounded-full bg-white px-6 py-2 text-xs font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                >
                  {createComment.isPending ? "Posting..." : "Post Comment"}
                </button>
              </div>
            ) : (
              <div className="mb-4 rounded-xl bg-white/5 p-4 text-center">
                <p className="mb-3 text-xs text-gray-500">
                  Log in to leave a comment
                </p>
                <button
                  onClick={() => signIn()}
                  className="rounded-full bg-white px-6 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
                >
                  Login
                </button>
              </div>
            )}

            <div className="max-h-72 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1 lg:max-h-none">
              {data?.comments.length === 0 && (
                <p className="text-center text-xs text-gray-600">
                  No comments yet. Be the first!
                </p>
              )}
              {data?.comments.map((c) => (
                <div
                  key={c.id}
                  className="group flex gap-3 rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                    {c.author.name?.[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium text-white">
                        {c.author.name}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="break-words text-xs text-gray-400">
                      {c.body}
                    </p>
                    {(session?.user?.id === c.authorId ||
                      session?.user?.role === "OWNER") && (
                      <button
                        onClick={() => deleteComment.mutate({ id: c.id })}
                        className="mt-1 text-xs text-red-500/50 transition hover:text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data && data.pages > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {Array.from({ length: data.pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-7 w-7 rounded-full text-xs ${
                      page === i + 1
                        ? "bg-white text-black"
                        : "bg-white/10 text-gray-400 hover:bg-white/20"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}