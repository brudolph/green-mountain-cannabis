import 'twin.macro';
import { MyLink } from '../components/MyLink';
import Search from '../components/Search';

export default function FourOhFour() {
  return (
    <div tw="w-full max-w-3xl mx-auto py-16 text-center">
      <h1>404 - Page Not Found</h1>
      <MyLink href="/" className="button">
        Go back home
      </MyLink>
      <div tw="py-10">
        <p tw="mb-6">Or try a search (case sensative)</p>
        <Search />
      </div>
    </div>
  );
}
