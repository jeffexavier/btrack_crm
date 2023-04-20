'use client';

import '@/styles/globals.css'

import { NextUIProvider } from '@nextui-org/react';
import Layout from './components/Layout';

export default function MyApp({ Component, pageProps }) {
  return(
    <NextUIProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </NextUIProvider> 
  )
}
