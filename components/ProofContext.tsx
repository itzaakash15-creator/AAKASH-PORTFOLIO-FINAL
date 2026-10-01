'use client';

import { createContext, useContext } from 'react';

export const ProofContext = createContext<(key: string) => void>(() => {});
export const useOpenProof = () => useContext(ProofContext);
