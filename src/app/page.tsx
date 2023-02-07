'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('');
  const inputProduct = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        return item.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
      }),
    [items, filter]
  );

  useEffect(() => {
    console.log('re-render');
  });

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputProduct.current) return;

    const value = inputProduct.current.value;
    setItems((prev) => [...prev, value]);
    //setFilteredItems((prev) => [...prev, value]);
    inputProduct.current.value = '';
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFilter(value);
    // setFilteredItems(
    //   items.filter((item) =>
    //     item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    //   )
    // );
  };

  return (
    <main className={styles.main}>
      <div>
        <span>Filtro:</span>{' '}
        <input type='text' value={filter} onChange={handleFilter} />
        <button onClick={() => setTemp((prev) => !prev)}>Forçar state</button>
      </div>
      <div>
        <h1>Lista de Produtos:</h1>
        <form onSubmit={handleAddProduct}>
          <span>Produto:</span> <input type='text' ref={inputProduct} />{' '}
          <button>Adicionar Produto</button>
        </form>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
