import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const songs = pgTable("songs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  ytMusic: text("yt_music").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const songElements = pgTable("song_elements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  songId: varchar("song_id").notNull().references(() => songs.id, { onDelete: "cascade" }),
  elementType: text("element_type").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSongSchema = createInsertSchema(songs).omit({
  id: true,
  createdAt: true,
});

export const insertSongElementSchema = createInsertSchema(songElements).omit({
  id: true,
  createdAt: true,
});

export type InsertSong = z.infer<typeof insertSongSchema>;
export type Song = typeof songs.$inferSelect;
export type InsertSongElement = z.infer<typeof insertSongElementSchema>;
export type SongElement = typeof songElements.$inferSelect;
