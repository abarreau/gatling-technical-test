import { FC, useEffect, useState } from 'react';
import { usersToTableDatasource } from './UserList.mapper';
import { Table, TableDatasource } from '../../../components/table/Table';
import { Spinner } from '../../../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, usersSelector } from '../../../redux/users-slice';

export const UserList: FC = () => {
    const users = useSelector(usersSelector);
    const [ dataSource, setDatasource ] = useState<TableDatasource>();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if(users) {
            setDatasource(usersToTableDatasource(users));
        }
    }, [ users ]);

    if(!dataSource) {
        return (<Spinner/>);
    } else {
        return (<Table datasource={dataSource}></Table>);
    }
};