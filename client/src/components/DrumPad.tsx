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
      className="aspect-square w-full h-full min-h-[80px] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-wide hover-elevate active-elevate-2 transition-transform active:scale-95"
      onMouseDown={handlePlay}
      onTouchStart={handlePlay}
      data-testid={`pad-${label.toLowerCase()}`}
    >
      {label}
    </Button>
  );
}
