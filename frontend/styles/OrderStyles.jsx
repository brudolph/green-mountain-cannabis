import tw, { styled } from 'twin.macro';

export const PageContainerStyles = styled.div(() => [
  tw`px-4 py-12 mx-auto sm:py-16 sm:px-6 max-w-7xl lg:px-8`,
]);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-8 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);

const OrderStyles = styled.div(() => [tw`max-w-5xl mx-auto `]);

export const OrderDetailsStyles = styled.li(() => []);
export const OrderListStyles = styled.ul(() => []);
export const OrderItemStyles = styled.li(() => []);

//   max-width: 1000px;
//   margin: 0 auto;
//   border: 1px solid var(--offWhite);
//   box-shadow: var(--bs);
//   padding: 2rem;
//   border-top: 10px solid #4a7639;
//   & > p {
//     display: grid;
//     grid-template-columns: 1fr 5fr;
//     margin: 0;
//     border-bottom: 1px solid var(--offWhite);
//     span {
//       padding: 1rem;
//       &:first-child {
//         font-weight: 900;
//         text-align: right;
//       }
//     }
//   }
//   .order-item {
//     border-bottom: 1px solid var(--offWhite);
//     display: grid;
//     grid-template-columns: 300px 1fr;
//     align-items: center;
//     grid-gap: 2rem;
//     margin: 2rem 0;
//     padding-bottom: 2rem;
//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//   }
// `;

// export const OrderListStyles = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//   grid-gap: 4rem;
// `;

// export const OrderItemStyles = styled.li`
//   background-color: white;
//   box-shadow: var(--bs);
//   list-style: none;
//   padding: 2rem;
//   border: 1px solid var(--offWhite);
//   h2 {
//     border-bottom: 2px solid red;
//     margin-top: 0;
//     margin-bottom: 2rem;
//     padding-bottom: 2rem;
//   }

//   .images {
//     display: grid;
//     grid-gap: 10px;
//     grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
//     margin-top: 1rem;
//     img {
//       height: 200px;
//       object-fit: cover;
//       width: 100%;
//     }
//   }
//   .order-meta {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
//     display: grid;
//     grid-gap: 1rem;
//     text-align: center;
//     & > * {
//       margin: 0;
//       background: rgba(0, 0, 0, 0.03);
//       padding: 1rem 0;
//     }
//     strong {
//       display: block;
//       margin-bottom: 1rem;
//     }
//   }
// `;
export default OrderStyles;
