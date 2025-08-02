import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bots = pgTable("bots", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  avatar: text("avatar"),
  status: text("status").notNull(), // 'live', 'development'
  rating: integer("rating"), // out of 500 (4.67 * 100 = 467)
  reviewCount: integer("review_count").default(0),
  serverCount: integer("server_count").default(0),
  uptime: integer("uptime"), // percentage
  features: text("features").array(),
  inviteUrl: text("invite_url"),
  voteUrl: text("vote_url"),
  topggId: text("topgg_id"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  botId: varchar("bot_id").references(() => bots.id).notNull(),
  username: text("username").notNull(),
  avatar: text("avatar"),
  rating: integer("rating").notNull(), // 1-5 stars
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertBotSchema = createInsertSchema(bots).omit({
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type InsertBot = z.infer<typeof insertBotSchema>;
export type Bot = typeof bots.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
