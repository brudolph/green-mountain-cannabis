import tw, { styled, css, theme } from 'twin.macro';

const PaginationStyles = styled.div(() => [
  tw`text-center grid grid-cols-3 items-stretch justify-center content-center my-8 border border-gray-200 rounded-md`,
  css`
    a[aria-disabled='true'] {
      color: ${theme`colors.primary`};
      pointer-events: none;
    }
  `,
]);

export default PaginationStyles;
