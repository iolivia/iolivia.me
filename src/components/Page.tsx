import * as React from 'react'

import Header from './Header';
import Footer from './Footer';

export default class Page extends React.Component<{}, {}> {

    public render() {

        return (
            <div>

                {/* Header */}
                <Header />

                {/* Main content */}
                <div>
                    {this.props.children}
                </div>

                {/* Footer */}
                <Footer />
            </div>
        );
    }
}