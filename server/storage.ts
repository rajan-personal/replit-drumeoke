import { type Song, type SongElement, songs, songElements } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSongs(): Promise<Song[]>;
  getSong(id: string): Promise<Song | undefined>;
  getSongElements(songId: string): Promise<SongElement[]>;
}

export class DbStorage implements IStorage {
  async getSongs(): Promise<Song[]> {
    return await db.select().from(songs);
  }

  async getSong(id: string): Promise<Song | undefined> {
    const result = await db.select().from(songs).where(eq(songs.id, id));
    return result[0];
  }

  async getSongElements(songId: string): Promise<SongElement[]> {
    return await db.select().from(songElements).where(eq(songElements.songId, songId));
  }
}

export const storage = new DbStorage();
