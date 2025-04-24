'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, initializeStore } from '../lib/store/store'; // Adjust the import path as necessary

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    // Create the store without any preloaded state for initial render
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Initialize the store with localStorage values on client-side only
    if (storeRef.current) {
      initializeStore(storeRef.current);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
