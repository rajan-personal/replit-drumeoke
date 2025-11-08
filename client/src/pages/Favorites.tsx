import SongCard from "@/components/SongCard";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import type { Song } from "@shared/schema";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/login");
    return null;
  }

  const { data: favorites, isLoading } = useQuery<Song[]>({
    queryKey: ['/api/favorites'],
  });

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-current" />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">My Favorites</h2>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-serif font-bold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding your favorite songs to see them here!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
