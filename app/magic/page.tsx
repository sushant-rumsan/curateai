"use client"

import Login from '@/components/magic/Login';
import { useState } from 'react';

export default function BlogList() {
    const [token, setToken] = useState('');
    return (
        <>
        <Login token={token} setToken={setToken}/>
        </>
    )
}