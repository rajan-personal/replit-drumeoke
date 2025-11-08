import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Upload, X } from "lucide-react";

const drumTypes = ["kick", "snare", "hihat", "tom1", "tom2", "tom3", "crash", "ride", "floortom"];

interface DrumElement {
  type: string;
  file: File | null;
}

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [songName, setSongName] = useState("");
  const [ytMusic, setYtMusic] = useState("");
  const [drumElements, setDrumElements] = useState<DrumElement[]>(
    drumTypes.map(type => ({ type, file: null }))
  );

  if (!user || !user.isAdmin) {
    setLocation("/");
    return null;
  }

  const createSongWithElementsMutation = useMutation({
    mutationFn: async (data: { name: string; ytMusic: string; elements: DrumElement[] }) => {
      // First create the song
      const songResponse = await fetch('/api/admin/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, ytMusic: data.ytMusic }),
      });

      if (!songResponse.ok) throw new Error('Failed to create song');
      const song = await songResponse.json();

      // Then upload each drum element
      const uploadPromises = data.elements
        .filter(el => el.file !== null)
        .map(async (element) => {
          const formData = new FormData();
          formData.append('audio', element.file!);
          formData.append('elementType', element.type);

          const response = await fetch(`/api/admin/songs/${song.id}/elements`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to upload ${element.type}: ${error}`);
          }
          return response.json();
        });

      await Promise.all(uploadPromises);
      return song;
    },
    onSuccess: () => {
      toast({ title: "Song and drum elements uploaded successfully!" });
      setSongName("");
      setYtMusic("");
      setDrumElements(drumTypes.map(type => ({ type, file: null })));
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Upload failed", 
        description: error.message || "Failed to create song",
        variant: "destructive" 
      });
    },
  });

  const handleFileChange = (type: string, file: File | null) => {
    setDrumElements(prev => 
      prev.map(el => el.type === type ? { ...el, file } : el)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasAtLeastOneFile = drumElements.some(el => el.file !== null);
    if (!hasAtLeastOneFile) {
      toast({ 
        title: "Please upload at least one drum element", 
        variant: "destructive" 
      });
      return;
    }

    createSongWithElementsMutation.mutate({ 
      name: songName, 
      ytMusic, 
      elements: drumElements 
    });
  };

  const uploadedCount = drumElements.filter(el => el.file !== null).length;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Admin Panel</h1>

        <Card>
          <CardHeader>
            <CardTitle>Add New Song with Drum Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="songName">Song Name</Label>
                  <Input
                    id="songName"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="Never Gonna Give You Up"
                    required
                    data-testid="input-song-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ytMusic">YouTube Video ID</Label>
                  <Input
                    id="ytMusic"
                    value={ytMusic}
                    onChange={(e) => setYtMusic(e.target.value)}
                    placeholder="dQw4w9WgXcQ"
                    required
                    data-testid="input-youtube-id"
                  />
                  <p className="text-sm text-muted-foreground">
                    Just the ID from the YouTube URL (e.g., dQw4w9WgXcQ)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Drum Elements ({uploadedCount}/{drumTypes.length})</Label>
                  <Badge variant="secondary">{uploadedCount} uploaded</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {drumElements.map((element) => (
                    <div key={element.type} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`file-${element.type}`} className="capitalize flex-1">
                          {element.type}
                        </Label>
                        {element.file && (
                          <Badge variant="outline" className="gap-1">
                            <Check className="h-3 w-3" />
                            Ready
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id={`file-${element.type}`}
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleFileChange(element.type, e.target.files?.[0] || null)}
                          data-testid={`input-audio-${element.type}`}
                          className="flex-1"
                        />
                        {element.file && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleFileChange(element.type, null)}
                            data-testid={`button-clear-${element.type}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {element.file && (
                        <p className="text-xs text-muted-foreground truncate">
                          {element.file.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={createSongWithElementsMutation.isPending} 
                className="w-full gap-2"
                data-testid="button-create-song"
              >
                {createSongWithElementsMutation.isPending ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Create Song & Upload Elements
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
