// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
  integer,
  pgEnum,
  serial,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `rtb_house_task_${name}`);

export const userInfo = createTable(
  "user_info",
  {
    uid: uuid("uid").primaryKey(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    avatar: varchar("avatar", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const pageEnum = pgEnum('page', ['home', 'dashboard']);

export const pageVisits = createTable(
  "pageVisits",
  {
    id: serial("id").primaryKey(),
    userUid: uuid("uid").references(() => userInfo.uid),
    numberOfVisits: integer("number_of_visits"),
    page: pageEnum("page")
  }
);

export const imageViews = createTable(
  "pageVisits",
  {
    id: serial("id").primaryKey(),
    userUid: uuid("uid").references(() => userInfo.uid),
    numberOfVisits: integer("number_of_visits"),
    imageId: varchar("image_id", { length: 256 }),
  }
);

