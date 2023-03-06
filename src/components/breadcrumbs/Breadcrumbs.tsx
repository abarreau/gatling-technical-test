import { FC } from 'react';
import styles from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';

export const Breadcrumbs: FC<{ segments: BreadcrumbSegment[] }> = ({ segments }) => {
    return (
        <div className={styles.breadcrumbsContainer}>
            {
                segments.map((segment, index) => {
                    return index < segments.length - 1
                        ? <>
                            <Link className={styles.link} to={segment.url}><span className={styles.link} key={index}>{ segment.name }</span></Link>
                            <span className={styles.breadcrumbSeparator}>/</span>
                        </>
                        : <span key={index}>{ segment.name }</span>;
                })
            }
        </div>
    );
};

export type BreadcrumbSegment = {
    url: string,
    name: string
}