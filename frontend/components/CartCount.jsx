import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import tw, { css, styled } from 'twin.macro';

const Dot = tw.div`flex items-center justify-center bg-accent text-white text-xs ml-2 rounded-full w-5 h-5`;

const AnimationStyles = styled.span(() => [
  css`
    position: relative;
    .count {
      display: flex;
      position: relative;
      transition: transform 0.4s;
      backface-visibility: hidden;
    }
    .count-enter {
      transform: scale(4) rotateY(0.5turn);
    }
    .count-enter-active {
      transform: rotateY(0);
    }
    .count-exit {
      top: 0;
      position: absolute;
      transform: rotateY(0);
    }
    .count-exit-active {
      transform: scale(4) rotateY(0.5turn);
    }
  `,
]);

function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}

CartCount.propTypes = {
  count: PropTypes.number,
};

export default CartCount;
