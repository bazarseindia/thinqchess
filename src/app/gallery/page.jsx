"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, Heart, MessageCircle } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useTheme } from '@/components/ThemeProvider';

// Fallback gallery data (used if DB is empty)
const fallbackGalleryData = [
  { id: 1, type: 'image', src: '/assets/home/IMG_3874.jpeg', alt: 'Championship Winning Moment', category: 'Tournaments', likes: '1.2k', comments: '124', size: 'large' },
  { id: 2, type: 'image', src: '/assets/home/Internal Tournament.jpeg', alt: 'Internal Tournament Focus', category: 'Events', likes: '456', comments: '32', size: 'small' },
  { id: 3, type: 'image', src: '/assets/home/Monthly Award.jpeg', alt: 'Monthly Award Ceremony', category: 'Awards', likes: '892', comments: '56', size: 'small' },
  { id: 4, type: 'image', src: '/assets/home/Academy photo.jpeg', alt: 'Academy Session in Progress', category: 'Training', likes: '345', comments: '12', size: 'medium' },
  { id: 5, type: 'image', src: '/assets/home/Course completion photo 1.jpeg', alt: 'Foundation Course Completed', category: 'Graduation', likes: '567', comments: '45', size: 'small' },
  { id: 6, type: 'image', src: '/assets/home/Course completion photo 2.jpeg', alt: 'Intermediate Course Completed', category: 'Graduation', likes: '432', comments: '28', size: 'small' },
  { id: 7, type: 'image', src: '/assets/home/IMG_7387.jpeg', alt: 'Tactics Class Live', category: 'Training', likes: '2.1k', comments: '312', size: 'large' },
  { id: 8, type: 'image', src: '/assets/home/Course completion photo 3.jpeg', alt: 'Advanced Course Completed', category: 'Graduation', likes: '678', comments: '50', size: 'small' },
  { id: 9, type: 'image', src: '/assets/home/Practice time.jpeg', alt: 'Serious Practice Session', category: 'Training', likes: '890', comments: '76', size: 'medium' },
  { id: 10, type: 'image', src: '/assets/home/Thinq Chess Tournament.jpeg', alt: 'Annual Grand Tournament', category: 'Events', likes: '3.4k', comments: '450', size: 'small' },
  { id: 11, type: 'image', src: '/assets/home/IMG_8149.JPG', alt: 'Kids Playing State Match', category: 'Tournaments', likes: '1.1k', comments: '89', size: 'small' },
  { id: 12, type: 'image', src: '/assets/home/IMG_8293.JPG', alt: 'Concentration at its Peak', category: 'Events', likes: '567', comments: '21', size: 'medium' },
];

const defaultCategories = ['All', 'Tournaments', 'Events', 'Training', 'Graduation', 'Awards'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [allData, setAllData] = useState(fallbackGalleryData);
  const [items, setItems] = useState(fallbackGalleryData);
  const [categories, setCategories] = useState(defaultCategories);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Fetch gallery items from DB
    (async () => {
      try {
        const r = await fetch('/api/public/gallery');
        const d = await r.json();
        if (d.success && d.items?.length > 0) {
          const mapped = d.items.map((item, i) => ({
            id: item.id,
            type: item.type || 'image',
            src: item.url,
            alt: item.caption || 'Gallery Item',
            category: item.category || 'Events',
            likes: '0',
            comments: '0',
            size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small'
          }));
          setAllData(mapped);
          setItems(mapped);
          const cats = ['All', ...new Set(mapped.map(i => i.category).filter(Boolean))];
          setCategories(cats);
        }
      } catch (e) { }
    })();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setItems(allData);
    } else {
      setItems(allData.filter(item => item.category === activeCategory));
    }
  }, [activeCategory, allData]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextItem = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevItem = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Instagram Explore sizing logic
  const getGridClass = (size) => {
    switch (size) {
      case 'large': return 'col-span-2 row-span-2';
      case 'medium': return 'col-span-2 row-span-1 md:col-span-1 md:row-span-2';
      case 'small': default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500 flex flex-col items-center ${isDark ? 'bg-[#0A1128] text-white' : 'bg-[#FAFAFA] text-[#2B3AA0]'}`}>
      <div className="w-full max-w-[1200px]">

        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm"
          >
            The Visual Legacy
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 italic leading-none"
          >
            ACADEMY <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFB31A] to-orange-500">MOMENTS.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-base md:text-lg max-w-2xl mx-auto font-medium italic ${isDark ? 'text-gray-400' : 'text-slate-500'}`}
          >
            Through the lens: Witness the journey of strategic growth, competitive triumphs, and everyday brilliance at ThinQ Chess Academy.
          </motion.p>
        </div>

        {/* Dynamic Categories (Insta Story Style Chips) */}
        <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-2 mb-10 pb-2">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * idx }}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                ? 'bg-[#FFB31A] text-[#2B3AA0] border-[#FFB31A] shadow-[0_5px_15px_rgba(255,179,26,0.3)]'
                : isDark
                  ? 'bg-[#111B3A] text-gray-400 border-white/5 hover:bg-white/5 hover:text-white'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-[#2B3AA0]'
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Instagram Explore Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 auto-rows-[150px] md:auto-rows-[250px]">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: 'spring' }}
                className={`relative group overflow-hidden cursor-pointer bg-black ${getGridClass(item.size)} ${isDark ? 'border-white/5 ring-1 ring-white/10' : 'border-slate-200 shadow-sm'
                  }`}
                onMouseEnter={() => item.type === 'video' && setHoveredVideo(item.id)}
                onMouseLeave={() => item.type === 'video' && setHoveredVideo(null)}
                onClick={() => openLightbox(index)}
              >
                <div className="absolute inset-0 w-full h-full">
                  {item.type === 'video' ? (
                    <>
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        ref={(el) => {
                          if (el) {
                            if (hoveredVideo === item.id) el.play().catch(() => { });
                            else el.pause();
                          }
                        }}
                      />
                      {/* Video Indicator Icon */}
                      <div className="absolute top-3 right-3 z-10">
                        <Play className="w-5 h-5 text-white drop-shadow-md fill-white" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={item.size === 'large'}
                    />
                  )}
                </div>

                {/* Instagram Style Hover Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/40 backdrop-blur-[2px]`}>
                  <div className="flex gap-6 text-white text-lg font-bold">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-white" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 fill-white" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Lightbox */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-[1100] flex items-center justify-center p-0 md:p-4 backdrop-blur-2xl ${isDark ? 'bg-black/95' : 'bg-white/95'
                }`}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-50 transition-colors rounded-full p-2.5 ${isDark ? 'text-white/70 hover:text-white bg-white/10 hover:bg-white/20' : 'text-[#2B3AA0] hover:text-[#FFB31A] bg-slate-100 hover:bg-slate-200'
                  }`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Controls */}
              <button onClick={(e) => { e.stopPropagation(); prevItem(); }} className={`absolute left-2 md:left-8 z-50 transition-colors rounded-full p-3 ${isDark ? 'text-white/70 hover:text-white bg-black/50 hover:bg-black/80' : 'text-[#2B3AA0] hover:text-[#FFB31A] bg-white/80 hover:bg-white shadow-lg'
                }`}>
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button onClick={(e) => { e.stopPropagation(); nextItem(); }} className={`absolute right-2 md:right-8 z-50 transition-colors rounded-full p-3 ${isDark ? 'text-white/70 hover:text-white bg-black/50 hover:bg-black/80' : 'text-[#2B3AA0] hover:text-[#FFB31A] bg-white/80 hover:bg-white shadow-lg'
                }`}>
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>

              <motion.div
                key={currentIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full h-full md:w-auto md:h-auto md:max-w-5xl md:max-h-[85vh] flex flex-col items-center justify-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full md:h-auto flex items-center justify-center bg-black md:rounded-2xl overflow-hidden shadow-2xl pointer-events-auto">
                  {items[currentIndex].type === 'video' ? (
                    <div className="w-full h-full md:h-[80vh] md:aspect-[9/16] lg:aspect-video flex items-center justify-center">
                      {mounted && (
                        <ReactPlayer
                          url={items[currentIndex].src}
                          width="100%"
                          height="100%"
                          controls={true}
                          playing={true}
                          style={{ objectFit: 'contain' }}
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      src={items[currentIndex].src}
                      alt={items[currentIndex].alt}
                      className="w-full h-full object-contain md:max-w-full md:max-h-[85vh] md:rounded-2xl"
                    />
                  )}
                </div>

                {/* Bottom Details Bar */}
                <div className={`absolute bottom-0 md:-bottom-16 left-0 right-0 p-4 md:p-0 text-center flex flex-col items-center bg-gradient-to-t md:bg-none from-black/80 to-transparent ${isDark ? 'text-white' : 'text-white md:text-[#2B3AA0]'}`}>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight">{items[currentIndex].alt}</p>
                  <p className="text-[#FFB31A] text-xs font-bold uppercase tracking-widest mt-1 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md inline-block">{items[currentIndex].category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
