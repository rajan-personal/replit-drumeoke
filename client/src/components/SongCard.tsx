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
      <Card className="glass-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/30" data-testid={`card-song-${id}`}>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-6">
          <div className="h-10 w-10 rounded-md bg-primary/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-sm">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-serif font-bold tracking-tight" data-testid={`text-song-name-${id}`}>
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
