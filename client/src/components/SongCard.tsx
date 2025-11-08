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
      <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid={`card-song-${id}`}>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-6">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-serif font-bold" data-testid={`text-song-name-${id}`}>
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
