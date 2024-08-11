import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { insertPageVisitsSchema, pageVisitsSchema } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pageVisitsRouter = createTRPCRouter({
    addPageVisitForUser: publicProcedure
        .input(insertPageVisitsSchema)
        .mutation(async ({ input }) => {
            try {
                await db
                    .insert(pageVisitsSchema)
                    .values({ ...input, visits: 1 })
                    .onConflictDoUpdate({ target: [pageVisitsSchema.userUid, pageVisitsSchema.page], set: { visits: sql`${pageVisitsSchema.visits} + 1` } });
                return true;
            } catch (err) {
                console.error("[addPageVisitForUser]: Error occured", err);
                return false;
            }
        }),

    getVisitStats: publicProcedure
        .query(async () => {
            try {
                return await db.select().from(pageVisitsSchema);
            } catch (err) {
                console.error("[getVisitStats]: Error occured", err);
                return null;
            }
        }),
});