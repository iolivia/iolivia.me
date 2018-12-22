import * as React from 'react'

import Footer from './Footer';
import Header from './Header';

export default class Banner extends React.Component<{}, {}> {

  public render() {

    return (
      <div>

        {/* Header */}
        <Header />

        {/* Footer */}
        <Footer />

      </div>
    );
  }
}