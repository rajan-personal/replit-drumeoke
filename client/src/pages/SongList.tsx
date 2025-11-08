import { Button } from "@/components/ui/button";
import SongCard from "@/components/SongCard";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Song } from "@shared/schema";

export default function SongList() {
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ['/api/songs'],
  });

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-serif font-bold text-primary">Drumeoke</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8">Song Library</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : songs && songs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <SongCard key={song.id} id={song.id} name={song.name} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No songs available yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
