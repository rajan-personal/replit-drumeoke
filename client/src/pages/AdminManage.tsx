import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Pencil, Trash2, X } from "lucide-react";
import type { Song, SongElement } from "@shared/schema";

export default function AdminManage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editName, setEditName] = useState("");
  const [editYtMusic, setEditYtMusic] = useState("");

  if (!user || !user.isAdmin) {
    setLocation("/");
    return null;
  }

  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ['/api/songs'],
  });

  const deleteSongMutation = useMutation({
    mutationFn: async (songId: string) => {
      return await apiRequest('DELETE', `/api/admin/songs/${songId}`);
    },
    onSuccess: () => {
      toast({ title: "Song deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
    },
    onError: () => {
      toast({ title: "Failed to delete song", variant: "destructive" });
    },
  });

  const updateSongMutation = useMutation({
    mutationFn: async (data: { id: string; name: string; ytMusic: string }) => {
      return await apiRequest('PATCH', `/api/admin/songs/${data.id}`, { 
        name: data.name, 
        ytMusic: data.ytMusic 
      });
    },
    onSuccess: () => {
      toast({ title: "Song updated successfully!" });
      setEditingSong(null);
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
    },
    onError: () => {
      toast({ title: "Failed to update song", variant: "destructive" });
    },
  });

  const deleteElementMutation = useMutation({
    mutationFn: async (elementId: string) => {
      return await apiRequest('DELETE', `/api/admin/elements/${elementId}`);
    },
    onSuccess: () => {
      toast({ title: "Element deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
    },
    onError: () => {
      toast({ title: "Failed to delete element", variant: "destructive" });
    },
  });

  const handleEditClick = (song: Song) => {
    setEditingSong(song);
    setEditName(song.name);
    setEditYtMusic(song.ytMusic);
  };

  const handleUpdateSong = () => {
    if (!editingSong) return;
    updateSongMutation.mutate({
      id: editingSong.id,
      name: editName,
      ytMusic: editYtMusic,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Manage Songs</h1>

        {editingSong && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Edit Song</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingSong(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Song Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  data-testid="input-edit-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-yt">YouTube Video ID</Label>
                <Input
                  id="edit-yt"
                  value={editYtMusic}
                  onChange={(e) => setEditYtMusic(e.target.value)}
                  data-testid="input-edit-youtube"
                />
              </div>
              <Button
                onClick={handleUpdateSong}
                disabled={updateSongMutation.isPending}
                data-testid="button-save-edit"
              >
                {updateSongMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : songs && songs.length > 0 ? (
          <div className="space-y-4">
            {songs.map((song) => (
              <SongManagementCard
                key={song.id}
                song={song}
                onEdit={() => handleEditClick(song)}
                onDelete={() => deleteSongMutation.mutate(song.id)}
                onDeleteElement={(elementId) => deleteElementMutation.mutate(elementId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No songs yet</p>
          </div>
        )}
      </main>
    </div>
  );
}

function SongManagementCard({
  song,
  onEdit,
  onDelete,
  onDeleteElement,
}: {
  song: Song;
  onEdit: () => void;
  onDelete: () => void;
  onDeleteElement: (elementId: string) => void;
}) {
  const { data: elements } = useQuery<SongElement[]>({
    queryKey: ['/api/songs', song.id, 'elements'],
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl font-serif" data-testid={`text-manage-song-${song.id}`}>
              {song.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              YouTube ID: {song.ytMusic}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="gap-2"
              data-testid={`button-edit-${song.id}`}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-testid={`button-delete-${song.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{song.name}" and all its drum elements.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Drum Elements ({elements?.length || 0}/9)</Label>
          <div className="flex flex-wrap gap-2">
            {elements && elements.length > 0 ? (
              elements.map((element) => (
                <Badge key={element.id} variant="secondary" className="gap-2">
                  {element.elementType}
                  <button
                    onClick={() => onDeleteElement(element.id)}
                    className="hover:text-destructive"
                    data-testid={`button-delete-element-${element.id}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No elements uploaded</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
