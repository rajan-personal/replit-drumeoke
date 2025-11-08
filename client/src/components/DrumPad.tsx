import { Button } from "@/components/ui/button";

interface DrumPadProps {
  label: string;
  onPlay: () => void;
}

export default function DrumPad({ label, onPlay }: DrumPadProps) {
  return (
    <Button
      size="lg"
      variant="secondary"
      className="aspect-square w-full h-full min-h-[80px] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-wide hover-elevate active-elevate-2 transition-transform active:scale-95"
      onClick={onPlay}
      data-testid={`pad-${label.toLowerCase()}`}
    >
      {label}
    </Button>
  );
}
