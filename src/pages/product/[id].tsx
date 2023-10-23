import { useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Skeleton from 'react-loading-skeleton';

import productDetailsStyles from '@/styles/pages/productDetails.module.scss';

import Header from '@/components/header';
import Categories from '@/components/categories';

import api from '@/services/api';
import formatCurrency from '@/utils/formatCurrency';

type ProductResponse = {
  categories: Array<string>;
  item: {
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
    sold_qty: number;
    description: string;
  };
};

export default function ProductDetails() {
  const [product, setProduct] = useState({} as ProductResponse);

  const { query } = useRouter();

  const price = useMemo(() => {
    if (!product?.item?.price?.currency) {
      return undefined;
    }

    return formatCurrency(
      product.item?.price?.amount + product.item?.price?.decimals,
      product.item?.price?.currency
    );
  }, [product]);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await api.get<ProductResponse>(`/items/${query.id}`);

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadItems();
  }, [query.id]);

  return (
    <>
      <NextSeo
        title={`${
          product.item?.title || 'Buscando informações do produto'
        } | Compre agora`}
        description={`Exibindo agora resultados da busca por ${query.query}`}
      />

      <Header />

      <main className={productDetailsStyles.main}>
        {!!product?.item?.id && (
          <div className={productDetailsStyles.content}>
            <Categories data={product?.categories} />

            <div className={productDetailsStyles.details}>
              <section>
                <div className={productDetailsStyles.imageContainer}>
                  <Image
                    src={product.item.picture_url}
                    alt={product.item.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>

                <div className={productDetailsStyles.info}>
                  <span>
                    {product.item.condition === 'new' ? 'Novo' : 'Usado'} -{' '}
                    {product.item.sold_qty > 0
                      ? product.item.sold_qty
                      : 'Nenhum'}{' '}
                    vendido{product.item.sold_qty > 1 ? 's' : ''}
                  </span>

                  <strong>{product.item.title}</strong>

                  <strong>{price}</strong>

                  <button type="button">Comprar</button>
                </div>
              </section>

              {product.item.description && (
                <section className={productDetailsStyles.content}>
                  <h2>Descrição do produto</h2>

                  <p>{product.item.description}</p>
                </section>
              )}
            </div>
          </div>
        )}

        {/* Skeleton load para feedback visual do processamento de dados para o usuário */}
        {!product.item?.id && (
          <Skeleton
            containerClassName={productDetailsStyles.skeletonContainer}
            baseColor="#dddddd"
            width={'100%'}
            height={500}
            style={{
              margin: 0,
              display: 'flex',
              flex: 1,
              minHeight: 500,
            }}
          />
        )}
      </main>
    </>
  );
}
