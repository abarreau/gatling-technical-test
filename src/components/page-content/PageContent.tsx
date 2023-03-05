import { FC, ReactNode } from 'react';
import styles from './PageContent.module.css';

/**
 * A page content is meant to be the root of your page, just after the PageHeader
 */
export const PageContent: FC<{ children?: ReactNode }> = ({ children }) => {
    return (<div className={styles.mainContent}>{ children }</div>);
};