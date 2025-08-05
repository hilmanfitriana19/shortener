import { collection, query, where, limit, getDocs, updateDoc, doc, increment, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from '../types';

export const fetchLinkBySlug = async (slug: string): Promise<Link | null> => {
  const tryQuery = async (field: 'customAlias' | 'shortCode') => {
    const q = query(collection(db, 'links'), where(field, '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      const data = d.data();
      return {
        id: d.id,
        ...data,
        openInNewTab: data.openInNewTab ?? true,
        shortUrl: data.shortUrl,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Link;
    }
    return null;
  };

  return (await tryQuery('customAlias')) || (await tryQuery('shortCode'));
};

export const incrementLinkClicks = async (linkId: string): Promise<void> => {
  await updateDoc(doc(db, 'links', linkId), {
    clicks: increment(1),
    updatedAt: Timestamp.now(),
  });
};
