import { FC, ReactNode } from 'react';
import styles from './PageHeader.module.css';

/**
 * A page header is meant to be displayed on top of each page for app names, nav buttons, etc
 */
export const PageHeader: FC<{ children?: ReactNode }> = ({ children }) => {
    return (<div className={styles.mainHeader}>{ children }</div>);
};