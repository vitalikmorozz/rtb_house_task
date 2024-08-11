// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
  integer,
  pgEnum,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';

export const createTable = pgTableCreator((name) => `rtb_house_task_${name}`);

export const userSchema = createTable(
  "user",
  {
    uid: uuid("uid").primaryKey(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    avatar: varchar("avatar", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const insertUserSchema = createInsertSchema(userSchema);

export const pageEnum = pgEnum('page', ['home', 'dashboard']);

export const pageVisitsSchema = createTable(
  "pageVisits",
  {
    userUid: uuid("uid").references(() => userSchema.uid).notNull(),
    visits: integer("number_of_visits").default(0).notNull(),
    page: pageEnum("page").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userUid, table.page] }),
    pkWithCustomName: primaryKey({ name: 'page_visits_pk', columns: [table.userUid, table.page] }),
  })
);

export const insertPageVisitsSchema = createInsertSchema(pageVisitsSchema);

export const itemTypesEnum = pgEnum('itemType', ['image']);

export const itemViewsSchema = createTable(
  "itemViews",
  {
    userUid: uuid("uid").references(() => userSchema.uid).notNull(),
    views: integer("views").default(0).notNull(),
    itemId: varchar("item_id", { length: 256 }).notNull(),
    type: itemTypesEnum("type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userUid, table.itemId] }),
    pkWithCustomName: primaryKey({ name: 'item_views_pk', columns: [table.userUid, table.itemId] }),
  })
);

export const insertItemViewsSchema = createInsertSchema(itemViewsSchema);
