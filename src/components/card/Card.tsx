import { FC, ReactNode } from 'react';
import styles from './Card.module.css';

/**
 * A card is a container for text, pictures, etc.
 */
export const Card: FC<{ children?: ReactNode }> = ({ children }) => {
    return (<div className={styles.card}>
        { children }
    </div>);
};
