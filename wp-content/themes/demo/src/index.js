import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { getURLParam } from './assets/js/functions';

import Blog from './pages/blog/blog';

import './assets/scss/index.scss';

const client = new ApolloClient({
  link: '/index.php?graphql',
  cache: new InMemoryCache(),
});

const Base = () => {
  const { href: currentURL } = window.location;
  const post_type = getURLParam(currentURL, 'post_type', null);
  const id = getURLParam(currentURL, 'p', null);
  const preview = getURLParam(currentURL, 'preview', false) === 'true';

  if (preview) {
    switch (post_type) {
      case 'blog' : return <Blog blogId={id} />
      default: {
        return null;
      }
    }
  }
  
  return null;
};

const App = () => {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.ctrlKey && e.keyCode === 71) {
        document.body.classList.toggle('show-grid');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/blog/:slug" component={Blog} />
          <Route exact path="/" component={Base} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
};

if (document.getElementById('main')) {
  ReactDOM.render(<App />, document.getElementById('main'));
}