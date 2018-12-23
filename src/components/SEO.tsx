import * as React from 'react'

import Helmet from 'react-helmet'

import favicon16 from "../../static/favicon-16x16.png"
import favicon32 from "../../static/favicon-32x32.png"
import faviconApple from "../../static/apple-touch-icon.png"
import faviconChrome192 from "../../static/android-chrome-192x192.png"
import faviconChrome512 from "../../static/android-chrome-512x512.png"

interface SEOProps {
    description: string;
    title: string;
    siteUrl: string;
}

export default class SEO extends React.Component<SEOProps, {}> {

    public render() {

        const { description, title, siteUrl } = this.props;

        return (
            <div>

                {/* Helmet */}
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    meta={[{ name: 'description', content: description }]}
                    title={title}

                    link={[
                        // favicons
                        { rel: 'icon', type: 'image/png', sizes: "16x16", href: `${favicon16}` },
                        { rel: 'icon', type: 'image/png', sizes: "32x32", href: `${favicon32}` },
                        { rel: 'icon', type: 'image/png', sizes: "192x192", href: `${faviconChrome192}` },
                        { rel: 'icon', type: 'image/png', sizes: "512x512", href: `${faviconChrome512}` },
                        { rel: 'apple-touch-icon', type: 'image/png', sizes: "180x180", href: `${faviconApple}` },

                        // canonical url
                        { rel: 'canonical', href: `${siteUrl}` },
                    ]}
                />

            </div>
        );
    }
}