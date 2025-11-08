import { type Song, type SongElement, type User, type InsertUser, type InsertSong, type InsertSongElement, type Favorite, songs, songElements, users, favorites } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getSongs(): Promise<Song[]>;
  getSong(id: string): Promise<Song | undefined>;
  getSongElements(songId: string): Promise<SongElement[]>;
  createSong(song: InsertSong): Promise<Song>;
  createSongElement(element: InsertSongElement): Promise<SongElement>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: string): Promise<User | undefined>;
  getFavorites(userId: string): Promise<string[]>;
  addFavorite(userId: string, songId: string): Promise<void>;
  removeFavorite(userId: string, songId: string): Promise<void>;
  isFavorite(userId: string, songId: string): Promise<boolean>;
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

  async createSong(song: InsertSong): Promise<Song> {
    const result = await db.insert(songs).values(song).returning();
    return result[0];
  }

  async createSongElement(element: InsertSongElement): Promise<SongElement> {
    const result = await db.insert(songElements).values(element).returning();
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const isAdmin = user.email === 'bittu15388@gmail.com';
    const result = await db.insert(users).values({ ...user, isAdmin }).returning();
    return result[0];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getFavorites(userId: string): Promise<string[]> {
    const result = await db.select({ songId: favorites.songId }).from(favorites).where(eq(favorites.userId, userId));
    return result.map(f => f.songId);
  }

  async addFavorite(userId: string, songId: string): Promise<void> {
    await db.insert(favorites).values({ userId, songId }).onConflictDoNothing();
  }

  async removeFavorite(userId: string, songId: string): Promise<void> {
    await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.songId, songId)));
  }

  async isFavorite(userId: string, songId: string): Promise<boolean> {
    const result = await db.select().from(favorites).where(and(eq(favorites.userId, userId), eq(favorites.songId, songId)));
    return result.length > 0;
  }
}

export const storage = new DbStorage();
