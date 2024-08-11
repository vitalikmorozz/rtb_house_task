import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { userSchema } from "~/server/db/schema";
import { type RandomUser } from "../../../common/types";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({
      uid: z.string().uuid()
    }))
    .query(async ({ input }) => {
      try {
        const res = await db.select().from(userSchema).where(eq(userSchema.uid, input.uid));
        if (res.length !== 0) return res[0];
        return null;
      } catch (error) {
        console.error("[userrRouter.get]: Error occured", error);
        return null;
      }
    }),

  create: publicProcedure
    .input(z.object({}))
    .mutation(async () => {
      try {
        const response = await fetch(`${env.RANDOM_DATA_API_URL}/users`);
        if (response.status !== 200) {
          console.error("[createSession]: Error whil fetching random user", response.statusText);
          return null;
        }
        const randomUser = await response.json() as RandomUser;

        const res = await db
          .insert(userSchema)
          .values({
            uid: randomUser.uid,
            avatar: randomUser.avatar,
            firstName: randomUser.first_name,
            lastName: randomUser.last_name
          })
          .returning();
        return res[0];
      } catch (err) {
        console.error("[createSession]: Error occured", err);
        return null;
      }
    }),
});
