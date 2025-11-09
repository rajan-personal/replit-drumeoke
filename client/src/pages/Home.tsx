import { Button } from "@/components/ui/button";
import { Music, Drum, Star } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import heroImage from "@assets/generated_images/Modern_electronic_drum_kit_1aeccf2a.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="glass-regular rounded-3xl p-8 sm:p-12 concentric-outer">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
              Drum Along to Your Favorite YouTube Songs
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Practice your drumming skills with our interactive drum pad. Play along to any YouTube track and feel the rhythm.
            </p>
            <Link href="/songs">
              <Button size="lg" variant="default" className="text-lg btn-capsule glass-glow-sm glass-hover touch-target" data-testid="button-browse-songs-hero">
                Browse Songs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl glass-card glass-hover ramp-animation">
              <div className="h-20 w-20 rounded-full glass-clear flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Choose Your Song</h3>
              <p className="text-muted-foreground font-medium">
                Browse our library of songs with custom drum samples ready to play
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl glass-card glass-hover ramp-animation" style={{ animationDelay: '100ms' }}>
              <div className="h-20 w-20 rounded-full glass-clear flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Drum className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Play the Drum Pad</h3>
              <p className="text-muted-foreground font-medium">
                Use our 3x3 Roland-format drum pad to play along with the music
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl glass-card glass-hover ramp-animation" style={{ animationDelay: '200ms' }}>
              <div className="h-20 w-20 rounded-full glass-clear flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Practice & Improve</h3>
              <p className="text-muted-foreground font-medium">
                Develop your rhythm and timing by playing along to your favorite tracks
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Drumeoke. Drum along to the rhythm.</p>
        </div>
      </footer>
    </div>
  );
}
