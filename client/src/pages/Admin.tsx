import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const drumTypes = ["kick", "snare", "hihat", "tom1", "tom2", "tom3", "crash", "ride", "floortom"];

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [songName, setSongName] = useState("");
  const [ytMusic, setYtMusic] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("");
  const [elementType, setElementType] = useState(drumTypes[0]);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  if (!user || !user.isAdmin) {
    setLocation("/");
    return null;
  }

  const createSongMutation = useMutation({
    mutationFn: async (data: { name: string; ytMusic: string }) => {
      return await apiRequest('/api/admin/songs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (song) => {
      toast({ title: "Song created successfully!" });
      setSelectedSongId(song.id);
      setSongName("");
      setYtMusic("");
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
    },
    onError: () => {
      toast({ title: "Failed to create song", variant: "destructive" });
    },
  });

  const uploadElementMutation = useMutation({
    mutationFn: async (data: { songId: string; elementType: string; file: File }) => {
      const formData = new FormData();
      formData.append('audio', data.file);
      formData.append('elementType', data.elementType);

      const response = await fetch(`/api/admin/songs/${data.songId}/elements`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Drum element uploaded successfully!" });
      setAudioFile(null);
      setElementType(drumTypes[0]);
    },
    onError: () => {
      toast({ title: "Failed to upload drum element", variant: "destructive" });
    },
  });

  const handleCreateSong = (e: React.FormEvent) => {
    e.preventDefault();
    createSongMutation.mutate({ name: songName, ytMusic });
  };

  const handleUploadElement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSongId || !audioFile) {
      toast({ title: "Please select a song and audio file", variant: "destructive" });
      return;
    }
    uploadElementMutation.mutate({ songId: selectedSongId, elementType, file: audioFile });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <h1 className="text-3xl font-serif font-bold">Admin Panel</h1>

        <Card>
          <CardHeader>
            <CardTitle>Add New Song</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSong} className="space-y-4">
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
              <Button type="submit" disabled={createSongMutation.isPending} data-testid="button-create-song">
                {createSongMutation.isPending ? "Creating..." : "Create Song"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Drum Element</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadElement} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="songId">Song ID</Label>
                <Input
                  id="songId"
                  value={selectedSongId}
                  onChange={(e) => setSelectedSongId(e.target.value)}
                  placeholder="Paste song ID here"
                  required
                  data-testid="input-song-id"
                />
                <p className="text-sm text-muted-foreground">
                  Use the ID from the song you just created
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="elementType">Drum Type</Label>
                <Select value={elementType} onValueChange={setElementType}>
                  <SelectTrigger data-testid="select-drum-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drumTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audioFile">Audio File</Label>
                <Input
                  id="audioFile"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  required
                  data-testid="input-audio-file"
                />
              </div>
              <Button type="submit" disabled={uploadElementMutation.isPending} data-testid="button-upload-element">
                {uploadElementMutation.isPending ? "Uploading..." : "Upload Element"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
