# 🥚 EASTER_EGGS.md - 彩蛋指南

> **⚠️ AI READ THIS FIRST**
> 
> This document lists all easter eggs in the website and how to add new ones.

## 🎮 Current Easter Eggs

### Implemented
1. **Warp Speed Skip** - Click "Skip" during loader to skip animation
2. **Star Pulse** - The star logo pulses with golden glow
3. **Typewriter Effect** - Hero section has typewriter-style title cycling
4. **Terminal Greeting** - Hero shows terminal-style `> Hello, I'm badhope`
5. **AI Hidden Questions** - Ask the AI about "42", "universe", "passwords", "cats"
6. **Contact Unavailable** - Disabled social links show creative placeholder pages
7. **Dev Notes** - Placeholder pages show developer configuration hints

### Planned (To Be Implemented)
8. **Konami Code** - ↑↑↓↓←→←→BA triggers star explosion
9. **Logo Click 5x** - Click the star logo 5 times for a surprise
10. **Terminal Emulator** - Hidden command-line interface
11. **3AM Mode** - Special content at 3:00 AM
12. **Achievement System** - Unlock badges for exploring
13. **Pixel Mode** - Toggle pixel art style
14. **Music Easter Egg** - Secret background music trigger
15. **Speed Scroll** - Fast scroll triggers warp effect
16. **AI Secret Personality** - Say specific phrases to trigger special AI mode
17. **Matrix Rain** - Toggle matrix-style rain effect
18. **Gravity Flip** - Click+drag to flip page elements
19. **Color Theme Switch** - Hidden theme variations
20. **Star Counter** - Track total stars clicked

## ➕ How to Add New Easter Eggs

### Option 1: Add to AI Knowledge Base

Edit `src/config/knowledge-base.ts`:

```typescript
{
  id: 'easter_egg_new',
  name: '彩蛋：描述',
  keywords: ['trigger_word_1', 'trigger_word_2'],
  answers: [
    { text: '🎉 Surprise response!', style: 'humorous' },
  ],
}
```

### Option 2: Add Interactive Easter Egg

Create a new component in `src/components/easter-eggs/`:

```typescript
'use client';
import { useEffect } from 'react';

export function KonamiCode() {
  useEffect(() => {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === sequence[index]) {
        index++;
        if (index === sequence.length) {
          // Trigger easter egg!
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  
  return null; // This component doesn't render anything
}
```

Then import it in `src/app/page.tsx`.

### Option 3: Add CSS-based Easter Egg

Add to `src/app/globals.css`:

```css
/* Secret class that can be toggled via JavaScript */
.secret-mode {
  filter: hue-rotate(180deg);
  animation: rainbow 3s linear infinite;
}
```

## ⚠️ Guidelines

- Easter eggs should be fun, not annoying
- They should not break any functionality
- They should be discoverable but not obvious
- Always provide a way to disable/revert
- Document new easter eggs in this file
