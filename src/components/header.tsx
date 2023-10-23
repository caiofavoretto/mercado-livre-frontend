import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import headerStyles from '@/styles/components/header.module.scss';

import MeliLogoImg from '@/assets/Logo_ML.png';
import SearchImg from '@/assets/ic_Search.png';

export default function Header() {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  function handleClickSearchButton(e: any) {
    e.preventDefault();

    if (!searchText) {
      return;
    }

    router.push(`/search/${searchText}`);
  }

  return (
    <>
      <header className={`${headerStyles.main}`}>
        <div className={headerStyles.content}>
          <div className={headerStyles.imgContainer}>
            <Link href="/">
              <Image src={MeliLogoImg} alt="Mercado Livre logo" />
            </Link>
          </div>
          <form
            className={headerStyles.searchInput}
            onSubmit={handleClickSearchButton}
          >
            <input
              placeholder="Buscar produtos, marcas e muito mais..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" onClick={handleClickSearchButton}>
              <Image src={SearchImg} alt="Imagem pesquisar" />
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
