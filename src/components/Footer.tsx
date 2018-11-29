import * as React from 'react'
import * as styles from './Footer.module.scss'

interface FooterProps {
    footerText: string,
    footerMenuOptions: Map<string, string>,
}

export default class Footer extends React.Component<FooterProps, {}> {

    public render() {

        const { footerText, footerMenuOptions } = this.props;

        return (
            <footer className={styles.footer}>

                <div className={`${styles.footerInner} ${styles.innerContainer}`}>

                    <div className={styles.footerSeparator}>
                    </div>

                    <div className={styles.footerCopyright}>
                        {footerText}
                    </div>

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
}