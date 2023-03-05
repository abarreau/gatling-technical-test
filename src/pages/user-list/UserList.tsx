import { FC, useEffect, useState } from 'react';
import { Table, TableDatasource } from '../../components/table/Table';
import axios from 'axios';
import { User, usersToTableDatasource } from './UserList.mapper';
import { Spinner } from '../../components/spinner/Spinner';

export const UserList: FC = () => {
    const [ users, setUsers ] = useState<User[] | undefined>(undefined);
    const [ dataSource, setDatasource ] = useState<TableDatasource>();

    useEffect(() => {
        setTimeout(() => {
            const url = 'https://jsonplaceholder.typicode.com/users';
            axios.get(url)
                .then(response => setUsers(response.data));
        }, 0);
    }, []);

    useEffect(() => {
        if(users) {
            setDatasource(usersToTableDatasource(users));
        }
    }, [ users ]);

    if(!dataSource) {
        return (<Spinner></Spinner>);
    } else {
        return (<Table datasource={dataSource}></Table>);
    }
};