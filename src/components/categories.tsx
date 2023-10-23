import categoriesStyles from '@/styles/components/categories.module.scss';

type Props = {
  data: string[];
};

export default function Categories({ data }: Props) {
  return (
    <>
      <div className={categoriesStyles.categories}>
        {data.map((category) => (
          <span className={categoriesStyles.category} key={category}>
            {category}
          </span>
        ))}
      </div>
    </>
  );
}
