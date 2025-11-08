import DrumPad from '../DrumPad';

export default function DrumPadExample() {
  return (
    <div className="p-8 max-w-xs">
      <DrumPad 
        label="Kick" 
        onPlay={() => console.log('Kick drum played')} 
      />
    </div>
  );
}
