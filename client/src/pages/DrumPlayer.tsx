import { Button } from "@/components/ui/button";
import DrumGrid from "@/components/DrumGrid";
import Header from "@/components/Header";
import { useParams } from "wouter";
import { ExternalLink, Heart } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Song, SongElement } from "@shared/schema";

export default function DrumPlayer() {
  const { id } = useParams<{ id: string }>();
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [loadedAudio, setLoadedAudio] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: song, isLoading: songLoading } = useQuery<Song>({
    queryKey: ['/api/songs', id],
  });

  const { data: elements, isLoading: elementsLoading } = useQuery<SongElement[]>({
    queryKey: ['/api/songs', id, 'elements'],
  });

  const { data: favoriteData } = useQuery<{ isFavorite: boolean }>({
    queryKey: ['/api/favorites', id, 'check'],
    enabled: !!user,
  });

  const isFavorite = favoriteData?.isFavorite || false;

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        return await apiRequest('DELETE', `/api/favorites/${id}`);
      } else {
        return await apiRequest('POST', `/api/favorites/${id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites', id, 'check'] });
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
      });
    },
  });

  const songElements = elements?.reduce((acc, element) => {
    acc[element.elementType] = element.url;
    return acc;
  }, {} as Record<string, string>) || {};

  useEffect(() => {
    if (elements) {
      elements.forEach((element) => {
        if (!audioRefs.current.has(element.elementType)) {
          const audio = new Audio(element.url);
          audio.preload = 'auto';
          audio.addEventListener('canplaythrough', () => {
            setLoadedAudio(prev => new Set(prev).add(element.elementType));
          });
          audioRefs.current.set(element.elementType, audio);
        }
      });
    }

    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current.clear();
    };
  }, [elements]);

  const handlePadPlay = (elementType: string, url: string) => {
    const audio = audioRefs.current.get(elementType);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error('Audio play error:', err));
    }
  };

  const isLoading = songLoading || elementsLoading;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-8">
            <div className="h-12 bg-muted animate-pulse rounded-lg max-w-md" />
            <div className="h-96 bg-muted animate-pulse rounded-lg max-w-2xl mx-auto" />
          </div>
        ) : song ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-wrap">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold" data-testid="text-song-title">
                {song.name}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {user && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavoriteMutation.mutate()}
                    data-testid="button-favorite"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                )}
                {song.ytMusic && (
                  <a
                    href={`https://www.youtube.com/watch?v=${song.ytMusic}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2" data-testid="button-youtube-link">
                      <ExternalLink className="h-4 w-4" />
                      Watch on YouTube
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="py-8">
              <DrumGrid songElements={songElements} onPadPlay={handlePadPlay} />
            </div>

            {elements && elements.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Click the drum pads to play along with the song!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Song not found</p>
          </div>
        )}
      </main>
    </div>
  );
}
