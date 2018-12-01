import * as React from 'react'

import Helmet from 'react-helmet'

interface SEOProps {
    description: string;
    title: string;
}

export default class SEO extends React.Component<SEOProps, {}> {

    public render() {

        const { description, title } = this.props;
        
        return (
            <div>

                {/* Helmet */}
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    meta={[{ name: 'description', content: description }]}
                    title={title}
                />

            </div>
        );
    }
}