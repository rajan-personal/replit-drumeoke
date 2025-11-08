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
          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
              Drum Along to Your Favorite YouTube Songs
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Practice your drumming skills with our interactive drum pad. Play along to any YouTube track and feel the rhythm.
            </p>
            <Link href="/songs">
              <Button size="lg" variant="default" className="text-lg px-8 glass-glow-sm" data-testid="button-browse-songs-hero">
                Browse Songs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl glass-card transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-md">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Choose Your Song</h3>
              <p className="text-muted-foreground">
                Browse our library of songs with custom drum samples ready to play
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-card transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-md">
                <Drum className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Play the Drum Pad</h3>
              <p className="text-muted-foreground">
                Use our 3x3 Roland-format drum pad to play along with the music
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-card transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Practice & Improve</h3>
              <p className="text-muted-foreground">
                Develop your rhythm and timing by playing along to your favorite tracks
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2024 Drumeoke. Drum along to the rhythm.</p>
        </div>
      </footer>
    </div>
  );
}
