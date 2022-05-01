import Page from '../components/Page';
import GlobalStyles from '../components/GlobalStyles';

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <GlobalStyles />
      <Component {...pageProps} />
    </Page>
  );
}
