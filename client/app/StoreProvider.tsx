'use client';

import { Provider } from 'react-redux';
import { makeStore,AppStore } from '@/lib/store';
import { useRef } from 'react';

export const  StoreProvider = ({ children }: { children: React.ReactNode })=> {
  const storeRef = useRef<AppStore>();
  if(!storeRef.current){
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
