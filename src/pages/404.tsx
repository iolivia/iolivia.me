import * as React from 'react'

import Page from '../components/Page';

export default class IndexPage extends React.Component<{}, {}> {

  private quotes: string[] = [
    "I think you travel to search and you come back home to find yourself there.",
    "I am a pisces, a fish out of water, searching for a way back home.",
    "If you want to find the real competition, just look in the mirror. After awhile you'll see your rivals scrambling for second place.",
    "People who fit don’t seek. The seekers are those that don’t fit.",
    "I believe one has to escape oneself to discover oneself."
  ];

  public render() {
    return (

      <Page>

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

        <p>
          The standard Lorem Ipsum passage, used since the 1500s
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </p>

      </Page>
    )
  }

  private buildQuotes = () => {
    const quoteElements = [];

    for (const quote of this.quotes) {
      quoteElements.push((
        <h3><p>{quote}</p></h3>
      ));
    }

    return quoteElements;
  }
}