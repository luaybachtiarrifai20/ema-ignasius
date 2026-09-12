import React, { createContext, useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

interface WeddingContextValue {
  /** Slug unik per client, diambil dari URL: /:slug */
  slug: string;
  /** Nama tamu dari query param ?to=nama-tamu */
  guestName: string;
}

const WeddingContext = createContext<WeddingContextValue>({
  slug: '',
  guestName: '',
});

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const guestName = useMemo(() => {
    const toParam = searchParams.get('to');
    if (!toParam) return 'Tamu Terhormat';

    // Ubah slug "budi-santoso" → "Budi Santoso"
    return toParam
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [searchParams]);

  const value = useMemo(() => ({ slug, guestName }), [slug, guestName]);

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
};

/** Hook untuk mengambil slug dan guestName di seluruh komponen */
export const useWedding = (): WeddingContextValue => {
  const ctx = useContext(WeddingContext);
  if (!ctx.slug && import.meta.env.DEV) {
    console.warn('[WeddingContext] slug kosong — pastikan komponen dibungkus <WeddingProvider>');
  }
  return ctx;
};
