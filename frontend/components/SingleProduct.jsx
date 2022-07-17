import { gql, useQuery } from '@apollo/client';
import { eachDayOfInterval } from 'date-fns';
import Head from 'next/head';
import { styled } from 'twin.macro';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      strain
      price_threshold {
        weight
        threshold
      }
      photo {
        image {
          publicUrlTransformed
        }
      }
      description
      potency
      environment
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Green Mountain Cannabis | {product.name}</title>
      </Head>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img src={product?.photo?.image?.publicUrlTransformed} />
      <ul>
        <li>{product?.price_threshold[0]?.threshold}</li>
        <li>{product?.strain}</li>
        <li>{product?.potency}</li>
        <li>{product?.environment}</li>
      </ul>
    </ProductStyles>
  );
}
