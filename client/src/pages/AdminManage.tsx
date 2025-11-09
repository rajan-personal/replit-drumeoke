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
import { Pencil, Trash2, X, Plus, Upload } from "lucide-react";
import type { Song, SongElement } from "@shared/schema";

const drumTypes = ["kick", "snare", "hihat", "tom1", "tom2", "tom3", "crash", "ride", "floortom"];

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
          <Card className="mb-8 glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Edit Song Details</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
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
                  className="glass-input"
                  data-testid="input-edit-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-yt">YouTube Video ID</Label>
                <Input
                  id="edit-yt"
                  value={editYtMusic}
                  onChange={(e) => setEditYtMusic(e.target.value)}
                  className="glass-input"
                  data-testid="input-edit-youtube"
                />
              </div>
              <Button
                onClick={handleUpdateSong}
                disabled={updateSongMutation.isPending}
                className="btn-capsule glass-glow"
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddElements, setShowAddElements] = useState(false);
  const [newElements, setNewElements] = useState<Record<string, File | null>>({});

  const { data: elements } = useQuery<SongElement[]>({
    queryKey: ['/api/songs', song.id, 'elements'],
    queryFn: async () => {
      const response = await fetch(`/api/songs/${song.id}/elements`);
      if (!response.ok) throw new Error('Failed to fetch elements');
      return response.json();
    },
  });

  const existingTypes = new Set(elements?.map(el => el.elementType) || []);
  const missingTypes = drumTypes.filter(type => !existingTypes.has(type));

  const uploadElementsMutation = useMutation({
    mutationFn: async (files: Record<string, File>) => {
      const uploadPromises = Object.entries(files).map(async ([elementType, file]) => {
        const formData = new FormData();
        formData.append('audio', file);
        formData.append('elementType', elementType);

        const response = await fetch(`/api/admin/songs/${song.id}/elements`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to upload ${elementType}: ${error}`);
        }
        return response.json();
      });

      await Promise.all(uploadPromises);
    },
    onSuccess: () => {
      toast({ title: "Elements uploaded successfully!" });
      setNewElements({});
      setShowAddElements(false);
      queryClient.invalidateQueries({ queryKey: ['/api/songs', song.id, 'elements'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Upload failed", 
        description: error.message || "Failed to upload elements",
        variant: "destructive" 
      });
    },
  });

  const handleFileChange = (type: string, file: File | null) => {
    setNewElements(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleUploadElements = () => {
    const filesToUpload = Object.fromEntries(
      Object.entries(newElements).filter(([_, file]) => file !== null)
    ) as Record<string, File>;

    if (Object.keys(filesToUpload).length === 0) {
      toast({ 
        title: "Please select at least one file to upload", 
        variant: "destructive" 
      });
      return;
    }

    uploadElementsMutation.mutate(filesToUpload);
  };

  return (
    <Card className="glass-card">
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
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="gap-2 btn-capsule glass-hover"
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
                  className="gap-2 btn-capsule glass-hover"
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
      <CardContent className="space-y-4">
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

        {missingTypes.length > 0 && (
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Missing Elements ({missingTypes.length})</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddElements(!showAddElements)}
                className="gap-2 btn-capsule glass-hover"
                data-testid={`button-toggle-add-elements-${song.id}`}
              >
                <Plus className="h-4 w-4" />
                {showAddElements ? "Cancel" : "Add Elements"}
              </Button>
            </div>

            {showAddElements && (
              <div className="space-y-4 p-4 glass-regular rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {missingTypes.map((type) => (
                    <div key={type} className="space-y-2">
                      <Label htmlFor={`add-${song.id}-${type}`} className="capitalize text-sm">
                        {type}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`add-${song.id}-${type}`}
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleFileChange(type, e.target.files?.[0] || null)}
                          data-testid={`input-add-element-${song.id}-${type}`}
                          className="flex-1 text-sm"
                        />
                        {newElements[type] && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleFileChange(type, null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {newElements[type] && (
                        <p className="text-xs text-muted-foreground truncate">
                          {newElements[type]!.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleUploadElements}
                  disabled={uploadElementsMutation.isPending}
                  className="w-full gap-2 btn-capsule glass-glow"
                  data-testid={`button-upload-elements-${song.id}`}
                >
                  {uploadElementsMutation.isPending ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload Selected Elements
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
