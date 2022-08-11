import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import GlobalStyles from '../components/styles/GlobalStyles';
import { CartStateProvider } from '../context/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CacheProvider value={cache}>
        <CartStateProvider>
          <Page>
            <GlobalStyles />
            <Component {...pageProps} />
          </Page>
        </CartStateProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

App.propTypes = {
  Component: PropTypes.node,
  apollo: PropTypes.any,
  pageProps: PropTypes.any,
};

export default withData(App);
