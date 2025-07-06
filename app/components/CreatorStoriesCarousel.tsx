import { useRef } from 'react';

const creators = [
  {
    name: 'Sophia Glow',
    video: '/videos/T1.mp4',
    image: '',
    shape: 'circle',
    link: '#'
  },
  {
    name: 'Radiant Mia',
    video: '/videos/T2.mp4',
    image: '',
    shape: 'rounded',
    link: '#'
  },
  {
    name: 'Luminous Ella',
    video: '/videos/T3.mp4',
    image: '',
    shape: 'circle',
    link: '#'
  },
  {
    name: 'Glow Studio',
    video: '/videos/T4.mp4',
    image: '',
    shape: 'rounded',
    link: '#'
  },
  {
    name: 'Fresh Faces',
    video: '/videos/T5.mp4',
    image: '',
    shape: 'circle',
    link: '#'
  },
  {
    name: 'Pure Beauty',
    video: '/videos/T6.mp4',
    image: '',
    shape: 'rounded',
    link: '#'
  },
  {
    name: 'Serene Skin',
    video: '/videos/T7.mp4',
    image: '',
    shape: 'circle',
    link: '#'
  },
  {
    name: 'Radiance Hub',
    video: '/videos/T8.mp4',
    image: '',
    shape: 'rounded',
    link: '#'
  },
  {
    name: 'Blissful Aura',
    video: '/videos/T9.mp4',
    image: '',
    shape: 'circle',
    link: '#'
  },
  {
    name: 'Vivid Glow',
    video: '/videos/t10.mp4',
    image: '',
    shape: 'rounded',
    link: '#'
  },
];

export default function CreatorStoriesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.7;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 text-center tracking-tight">
          Thriving with ViralReach
        </h2>
        <div className="relative">
          {/* Carousel Arrows */}
          <button
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            style={{ left: '-2.5rem' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div
            ref={carouselRef}
            className="flex gap-12 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {creators.map((creator, i) => (
              <div
                key={i}
                className={`flex flex-col items-center min-w-[260px] max-w-[320px] snap-center`}
              >
                <div className={`bg-gray-900 flex items-center justify-center shadow-xl ${creator.shape === 'circle' ? 'rounded-full' : 'rounded-3xl'} overflow-hidden w-64 h-80 mb-4 relative`}
                  style={{ aspectRatio: '3/4' }}
                >
                  {creator.video ? (
                    <video
                      src={creator.video}
                      className="object-cover w-full h-full"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <a href={creator.link} className="mt-2 text-lg font-semibold text-white hover:underline text-center block">
                  {creator.name}
                </a>
              </div>
            ))}
          </div>
          <button
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            style={{ right: '-2.5rem' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
} 