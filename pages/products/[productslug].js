import Head from 'next/head';
import Image from 'next/image'
import styles from '../../styles/Singleproduct.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const singleproduct = ({ product }) => {
   console.log('PPP', product);
   return (
      <div className="container single_container">
         <div className="left-section">
            <Image src={product.image.url} width={300} height={700} className={styles.left_img} alt="flower" />
         </div>
         <div className="right-section">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            {/* <div
               dangerouslySetInnerHTML={{
                  __html: product.description.html,
               }}
            ></div> */}
            <a className="btn">Add to cart 🛒</a>
         </div>
      </div>
   );
  };
  export default singleproduct;

  export async function getStaticProps({ params }) {
   const client = new ApolloClient({
      uri: 'https://api-ca-central-1.hygraph.com/v2/cla5onn824hub01uk65opcycl/master',
      cache: new InMemoryCache(),
   });
  
   const data = await client.query({
      query: gql`
         query Products($slug: String) {
            product(where: { slug: $slug }) {
               id
               name
               price
               slug
               description {
                  html
               }
               image {
                  url
               }
            }
         }
      `,
      variables: {
         slug: params.productslug,
      },
   });
  
   const product = data.data.product;
   return {
      props: {
         product,
      },
   };
  }

  export async function getStaticPaths() {
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
  
   const paths = data.data.products.map((singleProduct) => {
      return {
         params: {
            productslug: singleProduct.slug,
         },
      };
   });
  
   return {
      paths,
      fallback: false,
   };
  }