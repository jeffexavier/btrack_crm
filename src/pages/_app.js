'use client';

import '@/src/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';


export default function MyApp({ Component, pageProps }) {
  return(
    <NextUIProvider>
      <NextNProgress color="#5941a9"/>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
