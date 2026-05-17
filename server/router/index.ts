import { router } from "../trpc";
import { commentsRouter } from "./comments";
import { projectsRouter } from "./projects";

export const appRouter = router({
  comments: commentsRouter,
  projects: projectsRouter,
});

export type AppRouter = typeof appRouter;