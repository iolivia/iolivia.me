import * as React from 'react';
import * as styles from './Button.module.scss'

export interface ButtonProps {
    text: string;
    href: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ButtonState { }

export class Button extends React.Component<ButtonProps, ButtonState> {
    public render() {
        const { text, href } = this.props;

        return (
            <div className={styles.button}>
                <a href={href}>
                    {text}
                </a>
            </div>
        );
    }
}