import DrumGrid from '../DrumGrid';

export default function DrumGridExample() {
  const mockSongElements = {
    kick: '/audio/kick.mp3',
    snare: '/audio/snare.mp3',
    hihat: '/audio/hihat.mp3',
    tom1: '/audio/tom1.mp3',
    tom2: '/audio/tom2.mp3',
    tom3: '/audio/tom3.mp3',
    crash: '/audio/crash.mp3',
    ride: '/audio/ride.mp3',
    floortom: '/audio/floortom.mp3'
  };

  return (
    <div className="p-8 bg-background">
      <DrumGrid 
        songElements={mockSongElements}
        onPadPlay={(type, url) => console.log(`Playing ${type} from ${url}`)}
      />
    </div>
  );
}
