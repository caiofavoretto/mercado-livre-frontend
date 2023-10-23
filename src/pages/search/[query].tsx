import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Skeleton from 'react-loading-skeleton';

import searchStyles from '@/styles/pages/search.module.scss';

import Header from '@/components/header';
import Categories from '@/components/categories';
import Product from '@/components/product';

import api from '@/services/api';

export type ItemData = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture_url: string;
  condition: string;
  free_shipping: boolean;
};

type SearchResponse = {
  query: string;
  categories: Array<string>;
  items: ItemData[];
};

export default function Search() {
  const [searchResult, setSearchResult] = useState({} as SearchResponse);

  const { query } = useRouter();

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await api.get<SearchResponse>('/items', {
          params: {
            search: query.query,
          },
        });

        setSearchResult(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadItems();
  }, [query.query]);

  return (
    <>
      <NextSeo
        title={`Resultados da busca por | ${query.query}`}
        description={`Exibindo agora resultados da busca por ${query.query}`}
      />

      <Header />

      <main className={searchStyles.main}>
        <section className={searchStyles.content}>
          {!!searchResult?.query && (
            <>
              <Categories data={searchResult?.categories} />

              <div className={searchStyles.productContainer}>
                {searchResult.items.map((item) => (
                  <Product key={item.id} data={item} />
                ))}
              </div>
            </>
          )}

          {/* Skeleton load para feedback visual do processamento de dados para o usuário */}
          {!searchResult?.query &&
            Array.from(Array(10).keys()).map((value) => (
              <Skeleton
                key={value}
                containerClassName={searchStyles.skeletonContainer}
                baseColor="#dddddd"
                width={'100%'}
                height={124}
                style={{
                  margin: 0,
                  display: 'flex',
                  flex: 1,
                  minHeight: 124,
                }}
              />
            ))}
        </section>
      </main>
    </>
  );
}
