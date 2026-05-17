import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";

export const projectsRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        imageUrl: z.string().optional(),
        liveUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        tags: z.array(z.string()),
        order: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.project.create({ data: input });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.project.delete({ where: { id: input.id } });
    }),
});