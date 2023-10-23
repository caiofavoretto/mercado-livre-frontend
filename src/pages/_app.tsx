import '@/styles/globals.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://mercadolivredesafio.com.br',
          siteName: 'Mercado Livre',
        }}
        twitter={{
          handle: '@mercadolivredesafio',
          site: '@mercadolivredesafio',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
