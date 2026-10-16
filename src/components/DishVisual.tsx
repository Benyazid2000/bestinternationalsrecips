import React, { useState, useEffect } from 'react';
import { Recipe, Language } from '../types/recipe';
import { Lock, Utensils } from 'lucide-react';

interface DishVisualProps {
  recipe: Recipe;
  lang: Language;
  isUnlocked: boolean;
  className?: string;
  showVesselIllustration?: boolean;
}

export const DishVisual: React.FC<DishVisualProps> = ({
  recipe,
  lang,
  isUnlocked,
  className = 'aspect-[4/3]',
  showVesselIllustration = true,
}) => {
  const fallbackUrl =
    recipe.cuisine === 'moroccan'
      ? '/images/moroccan_tagine.jpg'
      : recipe.cuisine === 'french'
      ? '/images/french_gastronomy.jpg'
      : '/images/chinese_imperial.jpg';

  const [currentSrc, setCurrentSrc] = useState<string>(recipe.photoUrl || fallbackUrl);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(recipe.photoUrl || fallbackUrl);
    setHasError(false);
    setIsLoaded(false);
  }, [recipe.photoUrl, fallbackUrl]);

  const handleError = () => {
    if (currentSrc !== fallbackUrl) {
      // Try cuisine fallback image
      setCurrentSrc(fallbackUrl);
    } else {
      // If even fallback fails, switch to illustrated fallback card
      setHasError(true);
    }
  };

  const canAccess = recipe.isFree || isUnlocked;
  const formattedNum = String(recipe.number).padStart(2, '0');

  return (
    <div
      className={`relative overflow-hidden bg-stone-900 select-none ${className}`}
    >
      {/* Real culinary food photography */}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={recipe.title[lang]}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
        />
      ) : (
        /* Graceful Illustrated Food Card fallback if offline or network failure */
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${recipe.palette.primary}EE, ${recipe.palette.secondary}DD 60%, ${recipe.palette.rim}FF 100%)`,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center mb-2 shadow-inner border border-white/20">
            <VesselSvg
              vessel={recipe.vessel}
              primary="#FFFFFF"
              garnish={recipe.palette.garnish}
              size="w-9 h-9"
            />
          </div>
          <span className="text-white font-bold text-sm tracking-wide max-w-[85%] truncate">
            {recipe.title[lang]}
          </span>
          <span className="text-white/80 text-xs mt-1">
            {recipe.nativePhonetic}
          </span>
        </div>
      )}

      {/* Gentle bottom-only gradient for maximum photo brightness and crisp text readability */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Bespoke Artisan Vessel Emblem in top corner */}
      {showVesselIllustration && (
        <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm border border-white/20 flex items-center justify-center pointer-events-none shadow-md">
          <VesselSvg
            vessel={recipe.vessel}
            primary={recipe.palette.secondary}
            garnish={recipe.palette.garnish}
            size="w-5 h-5"
          />
        </div>
      )}

      {/* Editorial numerical index badge at top-left */}
      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
        <span className="font-mono-num text-xs font-bold tracking-wider text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-white/10">
          #{formattedNum}
        </span>
        {recipe.isFree && (
          <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/75 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm border border-emerald-500/30">
            {lang === 'ar' ? 'مجاني' : 'FREE'}
          </span>
        )}
      </div>

      {/* Lock overlay for premium dishes 6–20 when not yet unlocked */}
      {!canAccess && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity duration-150">
          <div className="w-10 h-10 rounded-full bg-[#FAF8F5]/95 text-[#18181B] flex items-center justify-center shadow-lg mb-2">
            <Lock className="w-4 h-4 text-[#9A3412]" />
          </div>
          <span className="text-xs font-semibold text-white tracking-wide shadow-xs">
            {lang === 'ar' ? 'يُفتح بـ $7 لمرة واحدة' : 'Unlock All · $7 One-Time'}
          </span>
        </div>
      )}

      {/* Bottom dish phonetic & cooking duration inside media frame */}
      <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between gap-2 pointer-events-none">
        <span className="text-xs text-white/95 font-medium truncate drop-shadow-sm">
          {recipe.nativePhonetic}
        </span>
        <span className="text-[11px] font-mono-num text-amber-300 font-semibold shrink-0 drop-shadow-sm">
          {recipe.prepTimeMinutes + recipe.cookTimeMinutes}{' '}
          {lang === 'ar' ? 'د' : 'min'}
        </span>
      </div>
    </div>
  );
};

const VesselSvg: React.FC<{
  vessel: Recipe['vessel'];
  primary: string;
  garnish: string;
  size?: string;
}> = ({ vessel, primary, garnish, size = 'w-6 h-6' }) => {
  switch (vessel) {
    case 'tagine':
    case 'tangia':
      return (
        <svg viewBox="0 0 36 36" className={size}>
          <path d="M6 25h24l-2 4H8l-2-4z" fill={primary} />
          <path d="M8 24L16 10a2 2 0 014 0l8 14H8z" fill={garnish} fillOpacity="0.88" />
          <circle cx="18" cy="8" r="2.2" fill={primary} />
        </svg>
      );
    case 'couscoussier':
    case 'pastilla':
      return (
        <svg viewBox="0 0 36 36" className={size}>
          <ellipse cx="18" cy="22" rx="12" ry="6" fill={primary} />
          <path d="M8 21c2-6 18-6 20 0" fill={garnish} fillOpacity="0.9" />
          <path d="M13 18l5-3 5 3-5 3-5-3z" stroke="#FFF" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'cocotte':
    case 'gratin':
    case 'souffle':
      return (
        <svg viewBox="0 0 36 36" className={size}>
          <rect x="7" y="15" width="22" height="12" rx="3" fill={primary} />
          <path d="M4 18h3M29 18h3" stroke={garnish} strokeWidth="2" strokeLinecap="round" />
          <path d="M9 14h18" stroke={garnish} strokeWidth="2" strokeLinecap="round" />
          <rect x="15" y="11" width="6" height="2" rx="1" fill={garnish} />
        </svg>
      );
    case 'steamer':
    case 'porcelain_bowl':
    case 'claypot':
      return (
        <svg viewBox="0 0 36 36" className={size}>
          <path d="M7 16h22v7a7 7 0 01-7 7h-8a7 7 0 01-7-7v-7z" fill={primary} />
          <circle cx="14" cy="14" r="2.5" fill={garnish} />
          <circle cx="18" cy="13" r="2.5" fill={garnish} />
          <circle cx="22" cy="14" r="2.5" fill={garnish} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" className={size}>
          <path d="M6 17c0 6 5.5 10 12 10s12-4 12-10H6z" fill={primary} />
          <circle cx="18" cy="15" r="4" fill={garnish} fillOpacity="0.9" />
        </svg>
      );
  }
};
