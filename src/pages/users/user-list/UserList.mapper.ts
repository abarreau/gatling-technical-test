import { TableDatasource } from '../../../components/table/Table';
import { User, UserAddress } from '../../../redux/users-slice';
import { NavigateFunction } from 'react-router-dom';

export const usersToTableDatasource = (users: User[], navigate: NavigateFunction): TableDatasource | undefined => {
    return users ? {
        columnHeaders: [ 'Name', 'Username', 'Email', 'Address' ],
        rows: users.map(user => ({
            columns: [ {
                value: user.name,
                type: 'editable',
                onEdit: () => true
            }, {
                value: user.username,
                type: 'simple'
            }, {
                value: user.email,
                type: 'simple'
            }, {
                value: addressFormatter(user.address),
                type: 'simple'
            }, {
                type: 'action',
                buttons: [
                    {
                        label: 'See posts',
                        metadata: user.id,
                        onClick: (userId: number) => navigate(`/posts/${userId}`)
                    }
                ]
            } ]
        }))
    } : undefined;

};

const addressFormatter: (address: UserAddress) => string =
    (address: UserAddress) => `${address.suite} ${address.street} ${address.zipcode} ${address.city}`;

