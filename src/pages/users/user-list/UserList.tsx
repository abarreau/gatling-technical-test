import { FC, useEffect, useState } from 'react';
import { usersToTableDatasource } from './UserList.mapper';
import { Table, TableDatasource } from '../../../components/table/Table';
import { Spinner } from '../../../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, usersSelector, usersStoreStatusSelector } from '../../../redux/users-slice';
import { useNavigate } from 'react-router-dom';

export const UserList: FC = () => {
    const users = useSelector(usersSelector);
    const userStateStatus = useSelector(usersStoreStatusSelector);
    const [ dataSource, setDatasource ] = useState<TableDatasource | undefined>();
    const dispatch = useDispatch<any>(); // any is ugly, but I don't know how to fix the typing issue here
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if(userStateStatus === 'idle') {
            setDatasource(usersToTableDatasource(users, navigate, dispatch));
        } else {
            setDatasource(undefined);
        }
    }, [ userStateStatus ]);

    if(!dataSource) {
        return (<Spinner/>);
    } else {
        return (<Table datasource={dataSource}></Table>);
    }
};