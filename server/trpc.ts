import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@/lib/auth";

export const createTRPCContext = async () => {
  const session = await auth();
  return { session };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { session: ctx.session } });
});