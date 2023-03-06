import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usersSelector, usersStoreStatusSelector } from '../../../redux/users-slice';
import styles from './UserStats.module.css';

/**
 * Display the number of users living in suites and apartments.
 * If there is no users in the store, component is hidden.
 */
export const UserStats: FC = () => {
    const users = useSelector(usersSelector);
    const userStateStatus = useSelector(usersStoreStatusSelector);

    const [ userStats, setUserStats ] = useState<{ numberOfSuites: number, numberOfApts: number } | undefined>();

    useEffect(() => {
        if(userStateStatus === 'idle' && users.length > 0) {
            setUserStats({
                numberOfApts: users.filter(user => user.address.suite.toLowerCase().startsWith('apt')).length,
                numberOfSuites: users.filter(user => user.address.suite.toLowerCase().startsWith('suite')).length,
            });
        } else {
            setUserStats(undefined);
        }

    }, [ userStateStatus ]);

    if(!userStats) {
        return null;
    }

    return (<div className={styles.statsContainer}>
        <span className={styles.line}>{ userStats.numberOfApts } { plural('person', 'people', userStats.numberOfApts) } living in an apartment.</span>
        <span>{ userStats.numberOfSuites } { plural('person', 'people', userStats.numberOfSuites) } living in a suite.</span>
    </div>);
};

const plural = (single: string, plural: string, amount: number) => amount > 1 ? plural : single;