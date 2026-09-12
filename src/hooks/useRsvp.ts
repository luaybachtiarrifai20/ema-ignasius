import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useWedding } from '../context/WeddingContext';

export interface RsvpEntry {
  id?: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir';
  guestParam?: string;
  createdAt?: Timestamp;
}

export const useRsvp = () => {
  const { slug } = useWedding();
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const getRsvpRef = useCallback(() => {
    return collection(db, 'weddings', slug, 'rsvp');
  }, [slug]);

  const fetchRsvp = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const q = query(getRsvpRef(), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RsvpEntry[];
      setRsvpList(data);
    } catch (err) {
      console.error('[useRsvp] Gagal fetch RSVP:', err);
    } finally {
      setLoading(false);
    }
  }, [slug, getRsvpRef]);

  useEffect(() => {
    fetchRsvp();
  }, [fetchRsvp]);

  const submitRsvp = useCallback(
    async (entry: Omit<RsvpEntry, 'id' | 'createdAt'>) => {
      if (!slug) throw new Error('Slug tidak ditemukan');
      setSubmitting(true);
      try {
        await addDoc(getRsvpRef(), {
          ...entry,
          createdAt: serverTimestamp(),
        });
        await fetchRsvp();
      } catch (err) {
        console.error('[useRsvp] Gagal submit RSVP:', err);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [slug, getRsvpRef, fetchRsvp],
  );

  const attendanceCount = rsvpList.reduce(
    (acc, entry) => {
      if (entry.attendance === 'Hadir') acc.hadir++;
      else if (entry.attendance === 'Tidak Hadir') acc.tidakHadir++;
      return acc;
    },
    { hadir: 0, tidakHadir: 0 },
  );

  return {
    rsvpList,
    loading,
    submitting,
    submitRsvp,
    refetch: fetchRsvp,
    attendanceCount,
  };
};