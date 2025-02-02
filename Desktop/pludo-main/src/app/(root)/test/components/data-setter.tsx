'use client';
import { add } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';

const DateSetter = ({ data }: { data: any }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(add(data));
    }, [data, dispatch]);

    return <></>;
};

export default DateSetter;