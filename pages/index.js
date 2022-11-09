import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ allProducts }) {
  return (
       <div className="container">
          <h2 className={styles.title}>
             All Products <span>🌿</span>
          </h2>
          <div className={styles.products_container}>
             {allProducts.map((product) => {
                return (
                   <div className={styles.product_card} key={product.id}>
                      <Link href={`products/${product.slug}`}>
                            <div className={styles.product_img}>
                               {product.image ? <img src={product.image.url} alt={product.name} /> : null }
                            </div>
                      </Link>
                      <div className={styles.product_content}>
                         <h3>{product.name}</h3>
                         <p>${product.price}</p>
                         <button className="btn">Add to cart 🛒</button>
                      </div>
                   </div>
                );
             })}
          </div>
       </div>
  );
}
export async function getStaticProps() {
	const client = new ApolloClient({
		uri: 'https://api-ca-central-1.hygraph.com/v2/cla5onn824hub01uk65opcycl/master',
		cache: new InMemoryCache(),
	});

	const data = await client.query({
		query: gql`
			query ProductsQuery {
				products {
					id
					name
					slug
					price
					image {
						url
					}
				}
			}
		`,
	});

	const allProducts = data.data.products;

	return {
		props: {
			allProducts,
		},
	};
}
