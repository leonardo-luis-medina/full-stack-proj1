import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";

export const commentsRouter = router({
  getAll: publicProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ input }) => {
      const limit = 10;
      const skip = (input.page - 1) * limit;
      const [comments, total] = await Promise.all([
        prisma.comment.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { author: true },
        }),
        prisma.comment.count(),
      ]);
      return { comments, total, pages: Math.ceil(total / limit) };
    }),

  create: protectedProcedure
    .input(z.object({ body: z.string().min(1).max(500) }))
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.create({
        data: {
          body: input.body,
          authorId: ctx.session.user.id,
        },
        include: { author: true },
      });
      return comment;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.findUnique({
        where: { id: input.id },
      });
      if (!comment) throw new Error("Comment not found");
      if (
        comment.authorId !== ctx.session.user.id &&
        ctx.session.user.role !== "OWNER"
      ) {
        throw new Error("Not authorized");
      }
      return prisma.comment.delete({ where: { id: input.id } });
    }),
});