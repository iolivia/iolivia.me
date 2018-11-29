import * as React from 'react'
import * as styles from './PostPreview.module.scss'

interface PostPreviewProps {
    imageUrl: string;
    title: string;
    excerpt: string;
    url: string;
}

export default class PostPreview extends React.Component<PostPreviewProps, {}> {

    public render() {
        const { imageUrl, title, excerpt, url } = this.props;

        return (
            <a className={styles.post} href={url}>
                <img src={imageUrl} />
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </a>
        );
    }
}