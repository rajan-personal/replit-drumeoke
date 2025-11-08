import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth, requireAdmin, hashPassword } from "./auth";
import passport from "passport";
import multer from "multer";
import { insertUserSchema, insertSongSchema, insertSongElementSchema } from "@shared/schema";

const upload = multer({ dest: 'public/audio/' });

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Auth routes
  app.post("/api/auth/signup", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error });
      }

      const existingUser = await storage.getUserByEmail(result.data.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await hashPassword(result.data.password);
      const user = await storage.createUser({
        email: result.data.email,
        password: hashedPassword,
      });

      req.login({ id: user.id, email: user.email, isAdmin: user.isAdmin }, (err) => {
        if (err) return next(err);
        res.json({ id: user.id, email: user.email, isAdmin: user.isAdmin });
      });
    } catch (error: any) {
      next(error);
    }
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      return res.json(req.user);
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // Song routes
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

  // Admin song management
  app.post("/api/admin/songs", requireAdmin, async (req, res, next) => {
    try {
      const result = insertSongSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error });
      }

      const song = await storage.createSong(result.data);
      res.json(song);
    } catch (error: any) {
      next(error);
    }
  });

  app.post("/api/admin/songs/:id/elements", requireAdmin, upload.single('audio'), async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Audio file is required" });
      }

      const url = `/public/audio/${req.file.filename}`;
      const element = await storage.createSongElement({
        songId: req.params.id,
        elementType: req.body.elementType,
        url,
      });

      res.json(element);
    } catch (error: any) {
      next(error);
    }
  });

  // Favorites
  app.get("/api/favorites", requireAuth, async (req, res) => {
    const favorites = await storage.getFavorites(req.user!.id);
    res.json(favorites);
  });

  app.post("/api/favorites/:songId", requireAuth, async (req, res, next) => {
    try {
      await storage.addFavorite(req.user!.id, req.params.songId);
      res.json({ message: "Added to favorites" });
    } catch (error: any) {
      next(error);
    }
  });

  app.delete("/api/favorites/:songId", requireAuth, async (req, res, next) => {
    try {
      await storage.removeFavorite(req.user!.id, req.params.songId);
      res.json({ message: "Removed from favorites" });
    } catch (error: any) {
      next(error);
    }
  });

  app.get("/api/favorites/:songId/check", requireAuth, async (req, res) => {
    const isFavorite = await storage.isFavorite(req.user!.id, req.params.songId);
    res.json({ isFavorite });
  });

  const httpServer = createServer(app);

  return httpServer;
}
