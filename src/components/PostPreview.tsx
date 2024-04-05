import * as React from 'react'
import styled from "styled-components"

import Img from 'gatsby-image'

interface PostPreviewProps {
    imageSizes: object;
    title: string;
    excerpt: string;
    url: string;
    date: string;
}

const Card = styled.div`
width: 85%;
height: 100%;
min-height: 200px;
margin-bottom: 25px;
display: block;
`

const Thumbnail = styled.div`
width: 200px;
height: 200px;
float: left;
margin-right: 20px;

@media (max-width: 550px) {
    display: none;
}
`

const Title = styled.h3`
    margin-bottom: 5px;
`

const Metadata = styled.div`
    margin-bottom: 15px;
`

export default class PostPreview extends React.Component<PostPreviewProps, {}> {

    public render() {
        const { imageSizes, title, excerpt, url, date } = this.props;

        return (
            <Card>
                <Thumbnail>
                    <Img fluid={imageSizes} alt={title} title={title} />
                </Thumbnail>
                <a href={url}>
                    <Title>{title}</Title>
                </a>
                <Metadata>{date}</Metadata>
                <p>{excerpt}</p>
            </Card>
        );
    }
}