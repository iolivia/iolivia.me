import * as React from 'react'

import Img from 'gatsby-image'

interface PostPreviewProps {
    imageSizes: object;
    title: string;
    excerpt: string;
    url: string;
    date: string;
}

export default class PostPreview extends React.Component<PostPreviewProps, {}> {

    public render() {
        const { imageSizes, title, excerpt, url, date } = this.props;

        return (
            <a href={url}>
                <Img sizes={imageSizes} />
                <div>
                    {date}
                </div>
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </a>
        );
    }
}