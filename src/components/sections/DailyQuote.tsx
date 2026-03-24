'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './DailyQuote.module.css';

interface Quote {
  text: string;
  author: string;
}

// Fallback quotes when API is unavailable
const fallbackQuotes: Quote[] = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: "The best error message is the one that never shows up.", author: 'Thomas Fuchs' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: 'Harold Abelson' },
  { text: 'The most disastrous thing that you can ever learn is your first programming language.', author: 'Alan Kay' },
  { text: "It's not a bug; it's an undocumented feature.", author: 'Anonymous' },
  { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: 'Chinese Proverb' },
  { text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupéry' },
];

export default function DailyQuote() {
  const { language } = useLanguage();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>('');
  const isZh = language === 'zh';

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      try {
        // Try quotable API first
        const response = await fetch('https://api.quotable.io/random?maxLength=120', {
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const data = await response.json();
          setQuote({ text: data.content, author: data.author });
          setSource('quotable.io');
          setLoading(false);
          return;
        }
      } catch {
        // Try fallback API
      }

      try {
        // Try ZenQuotes
        const response = await fetch('https://zenquotes.io/api/random', {
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const data = await response.json();
          setQuote({ text: data[0].q, author: data[0].a });
          setSource('zenquotes.io');
          setLoading(false);
          return;
        }
      } catch {
        // Use fallback
      }

      // Fallback to local quotes
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
      setSource('local');
      setLoading(false);
    };

    fetchQuote();
  }, []);

  return (
    <motion.section
      className={styles.quote}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <div className={styles.quoteMark}>&ldquo;</div>
        {loading ? (
          <div className={styles.loading}>
            <span className={styles.loadingDot} />
            <span className={styles.loadingDot} />
            <span className={styles.loadingDot} />
          </div>
        ) : quote ? (
          <>
            <p className={styles.quoteText}>{quote.text}</p>
            <div className={styles.quoteFooter}>
              <span className={styles.quoteAuthor}>— {quote.author}</span>
              <span className={styles.quoteSource}>
                {isZh ? '每日名言' : 'Daily Quote'}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </motion.section>
  );
}
