import { FC, ReactNode } from 'react';
import styles from './Card.module.css';

export const Card: FC<{ children?: ReactNode }> = ({ children }) => {
    return (<div className={styles.card}>
        { children }
    </div>);
};
