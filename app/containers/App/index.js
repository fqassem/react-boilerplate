/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

const App = ({ children }) => (
  <div>
    {React.Children.toArray(children)}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
