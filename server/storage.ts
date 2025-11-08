import { type Song, type InsertSong, type SongElement, type InsertSongElement } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getSongs(): Promise<Song[]>;
  getSong(id: string): Promise<Song | undefined>;
  getSongElements(songId: string): Promise<SongElement[]>;
}

export class MemStorage implements IStorage {
  private songs: Map<string, Song>;
  private songElements: Map<string, SongElement>;

  constructor() {
    this.songs = new Map();
    this.songElements = new Map();
  }

  async getSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }

  async getSong(id: string): Promise<Song | undefined> {
    return this.songs.get(id);
  }

  async getSongElements(songId: string): Promise<SongElement[]> {
    return Array.from(this.songElements.values()).filter(
      (element) => element.songId === songId
    );
  }
}

export const storage = new MemStorage();
