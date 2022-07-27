import Cart from '../components/Cart';
import { Checkout } from '../components/Checkout';
import PleaseSignIn from '../components/PleaseSignIn';

export default function CheckoutPage() {
  return (
    <PleaseSignIn>
      <Checkout />
    </PleaseSignIn>
  );
}
