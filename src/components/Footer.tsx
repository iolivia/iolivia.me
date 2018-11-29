import * as React from 'react'
import * as styles from './Footer.module.scss'

export interface FooterProps {
    footerText: string,
    footerMenuOptions: Map<string, string>, // key to link
    footerSocialLinks: Map<string, string>, // key to link
}

export default class Footer extends React.Component<FooterProps, {}> {

    public render() {

        const { footerText, footerMenuOptions } = this.props;

        return (
            <footer className={`${styles.footer} ${styles.pattern}`}>

                <div className={`${styles.footerInner} ${styles.innerContainer}`}>

                    <div className={styles.footerSeparator} />

                    {/* Social links */}
                    <ul className={styles.footerSocialIcons}>
                        {this.buildSocialLinks()}
                    </ul>

                    {/* Copyright */}
                    <div className={styles.footerCopyright}>
                        {footerText}
                    </div>

                    {/* Footer links */}
                    <div className={styles.footerLinks}>
                        {this.buildFooterLinks()}
                    </div>
                </div>

            </footer>
        );
    }

    private buildFooterLinks = () => {
        const { footerMenuOptions } = this.props;
        const links = [];

        for (const key of footerMenuOptions.keys()) {
            links.push(<a key={key} href={footerMenuOptions.get(key)}>{key}</a>);
        }

        return links;
    }

    private buildSocialLinks = () => {
        const { footerSocialLinks } = this.props;
        const links = [];

        for (const key of footerSocialLinks.keys()) {

            const href = footerSocialLinks.get(key);

            links.push((
                <li className={styles.footerSocialIconsItem}>
                    <a href={href} title={key} target="_blank">
                        <i className={`fab fa-${key} fa-lg`} />
                    </a>
                </li>
            ));
        }

        return links;
    }
}