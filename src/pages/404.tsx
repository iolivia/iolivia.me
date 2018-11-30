import * as React from 'react'
import * as styles from './404.module.scss'

import Page from '../components/Page';

export default class IndexPage extends React.Component<{}, {}> {

  private quotes : string[] = [
    "I think you travel to search and you come back home to find yourself there.",
    "I am a pisces, a fish out of water, searching for a way back home.",
    "If you want to find the real competition, just look in the mirror. After awhile you'll see your rivals scrambling for second place.",
    "People who fit don’t seek. The seekers are those that don’t fit.",
    "I believe one has to escape oneself to discover oneself."
  ];

  public render() {
    return (

      <Page>

        <div>

          {/* Heading */}
          <p className={styles.huge}>
            404 - Not found
          </p>

          <h1>
            What you're looking for cannot be found. Search inside your soul.
          </h1>

          {/* Quotes */}
          <div className={styles.quotes}>
            {this.buildQuotes()}
          </div>

        </div>
      </Page>
    )
  }

  private buildQuotes = () => {
    const quoteElements = [];

    for(const quote of this.quotes) {
      quoteElements.push((
        <h3><p>{quote}</p></h3>
      ));
    }

    return quoteElements;
  }
}