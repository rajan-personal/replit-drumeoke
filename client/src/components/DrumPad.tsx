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
    <Button
      size="lg"
      variant="secondary"
      className="relative aspect-square w-full h-full min-h-[80px] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-white/30 dark:border-white/15 shadow-lg specular-highlight glass-hover glass-active overflow-hidden transition-all duration-200"
      onMouseDown={handlePlay}
      onTouchStart={handlePlay}
      data-testid={`pad-${label.toLowerCase()}`}
    >
      {label}
    </Button>
  );
}
