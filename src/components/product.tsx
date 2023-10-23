import Image from 'next/image';

import productStyles from '@/styles/components/product.module.scss';

import { ItemData } from '@/pages/search/[query]';

import freeShippingImage from '@/assets/ic_shipping.png';
import formatCurrency from '@/utils/formatCurrency';

type Props = {
  data: ItemData;
};

export default function Product({ data }: Props) {
  const price = formatCurrency(
    data.price.amount + data.price.decimals,
    data.price.currency
  );

  return (
    <>
      <a href={`/product/${data.id}`} className={productStyles.product}>
        <div className={productStyles.imageContainer}>
          <Image
            src={data.picture_url}
            alt={data.title}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={productStyles.info}>
          <strong>
            {price}
            {data.free_shipping && (
              <span>
                <Image src={freeShippingImage} alt="Entrega grátis" />
              </span>
            )}
          </strong>

          <p>{data.title}</p>
        </div>

        <div className={productStyles.condition}>
          {data.condition === 'new' && <strong>Novo</strong>}
          {data.condition !== 'new' && <span>Usado</span>}
        </div>
      </a>
    </>
  );
}
