import { Button } from "@/components/ui/button";

interface DrumPadProps {
  label: string;
  onPlay: () => void;
}

export default function DrumPad({ label, onPlay }: DrumPadProps) {
  const handlePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onPlay();
  };

  return (
    <div className="relative aspect-square w-full touch-target p-1">
      <Button
        size="lg"
        variant="secondary"
        className="relative w-full h-full rounded-full glass-regular specular-highlight glass-hover glass-active pulse-feedback flex flex-col items-center justify-center font-mono text-sm font-bold uppercase tracking-wider shadow-2xl group overflow-visible"
        onMouseDown={handlePlay}
        onTouchStart={handlePlay}
        data-testid={`pad-${label.toLowerCase()}`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full glass-clear mb-2 flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-primary/40 backdrop-blur-sm" />
          </div>
          <span className="text-foreground/80 group-hover:text-foreground transition-colors">
            {label}
          </span>
        </div>
      </Button>
    </div>
  );
}
