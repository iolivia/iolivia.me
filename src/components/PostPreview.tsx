import * as React from 'react'
import * as styles from './PostPreview.module.scss'

import Img from 'gatsby-image'

interface PostPreviewProps {
    imageSizes: object;
    title: string;
    excerpt: string;
    url: string;
}

export default class PostPreview extends React.Component<PostPreviewProps, {}> {

    public render() {
        const { imageSizes, title, excerpt, url } = this.props;

        return (
            <a className={styles.post} href={url}>
                <Img sizes={imageSizes} />
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </a>
        );
    }
}