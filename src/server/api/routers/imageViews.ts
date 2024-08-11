import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { itemViewsSchema, insertItemViewsSchema } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemViewsRouter = createTRPCRouter({
    addItemView: publicProcedure
        .input(insertItemViewsSchema)
        .mutation(async ({ input }) => {
            try {
                await db
                    .insert(itemViewsSchema)
                    .values({ ...input, views: 1 })
                    .onConflictDoUpdate({ target: [itemViewsSchema.userUid, itemViewsSchema.itemId], set: { views: sql`${itemViewsSchema.views} + 1` } });
                return true;
            } catch (err) {
                console.error("[addItemView]: Error occured", err);
                return false;
            }
        }),

    getViewsStats: publicProcedure
        .query(async () => {
            try {
                return await db.select().from(itemViewsSchema);
            } catch (err) {
                console.error("[getViewsStats]: Error occured", err);
                return null;
            }
        }),
});