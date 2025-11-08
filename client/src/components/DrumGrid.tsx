import DrumPad from "./DrumPad";

interface DrumGridProps {
  songElements: Record<string, string>;
  onPadPlay: (elementType: string, url: string) => void;
}

const drumLayout = [
  ["crash", "tom1", "ride"],
  ["tom2", "snare", "tom3"],
  ["kick", "hihat", "floortom"]
];

export default function DrumGrid({ songElements, onPadPlay }: DrumGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto p-4">
      {drumLayout.flat().map((drumType) => (
        <DrumPad
          key={drumType}
          label={drumType}
          onPlay={() => {
            const url = songElements[drumType];
            if (url) {
              onPadPlay(drumType, url);
            } else {
              console.log(`No audio for ${drumType}`);
            }
          }}
        />
      ))}
    </div>
  );
}
