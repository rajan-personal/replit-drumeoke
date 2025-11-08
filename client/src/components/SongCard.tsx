import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import { Link } from "wouter";

interface SongCardProps {
  id: string;
  name: string;
}

export default function SongCard({ id, name }: SongCardProps) {
  return (
    <Link href={`/play/${id}`}>
      <Card className="glass-card cursor-pointer glass-hover glass-active touch-target rounded-3xl" data-testid={`card-song-${id}`}>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
          <div className="h-14 w-14 rounded-full glass-clear flex items-center justify-center flex-shrink-0 shadow-md">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Music className="h-5 w-5 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl font-serif font-bold tracking-tight" data-testid={`text-song-name-${id}`}>
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
