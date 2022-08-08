import tw, { styled, css, theme } from 'twin.macro';

const DropDown = styled.div(() => [
  css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    z-index: 2;
    border: 1px solid var(--lightGray);
  `,
]);

const DropDownItem = styled.div(({ highlighted }) => [
  css`
    border-bottom: 1px solid ${theme`colors.gray.500`};
    background: ${highlighted ? '#f7f7f7' : 'white'};
    padding: 1rem;
    transition: all 0.2s;
    ${highlighted ? 'padding-left: 2rem;' : null};
    display: flex;
    align-items: center;
    border-left: 10px solid ${highlighted ? theme`colors.primary` : 'white'};
    img {
      margin-right: 10px;
    }
  `,
]);

const glow = css`
  @keyframes glow {
    from {
      box-shadow: 0 0 0px yellow;
    }

    to {
      box-shadow: 0 0 10px 1px yellow;
    }
  }
`;
const SearchStyles = styled.div(() => [
  css`
    position: relative;
    input {
      width: 100%;
      padding: 10px;
      border: 0;
      font-size: 2rem;
      &.loading {
        animation: ${glow} 0.5s ease-in-out infinite alternate;
      }
    }
  `,
]);

export { DropDown, DropDownItem, SearchStyles };
