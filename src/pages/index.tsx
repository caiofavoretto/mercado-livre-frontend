import { NextSeo } from 'next-seo';

import Header from '@/components/header';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Mercado Livre | Frete grátis no mesmo dia"
        description="Busque produtos, marcas e muito mais..."
      />

      <Header />

      <main></main>
    </>
  );
}
