import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/songs", async (_req, res) => {
    const songs = await storage.getSongs();
    res.json(songs);
  });

  app.get("/api/songs/:id", async (req, res) => {
    const song = await storage.getSong(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  });

  app.get("/api/songs/:id/elements", async (req, res) => {
    const elements = await storage.getSongElements(req.params.id);
    res.json(elements);
  });

  const httpServer = createServer(app);

  return httpServer;
}
