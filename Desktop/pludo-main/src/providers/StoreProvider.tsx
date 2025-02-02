'use client';
import { AppStore, makeStore } from '@/redux/store';
import React, { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { toggleSidebar } from '../redux/features/chatBox/chatBox'
const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();

        
        // Add initial state
        // storeRef.current.dispatch(add('testproductid'));
    }
    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
