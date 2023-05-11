// 'use client';

import '@/src/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import InternalLayout from '@/src/components/InternalLayout';
import FirstLayout from '@/src/components/FirstLayout';


export default function MyApp({ Component, pageProps }) {
  if(Component.name !== 'Cadastro' && Component.name !== 'Login') {
    return(
      <NextUIProvider>
        <InternalLayout>
          <Component {...pageProps} />
        </InternalLayout>
      </NextUIProvider> 
    )
  } else {
    return(
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    )
  }
}
