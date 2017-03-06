/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const HomePage = () => (
  <h1>
    <FormattedMessage {...messages.header} />
  </h1>
);

export default HomePage;
