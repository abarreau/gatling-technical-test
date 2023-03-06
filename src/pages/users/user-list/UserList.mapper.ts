import { TableDatasource } from '../../../components/table/Table';

export const usersToTableDatasource = (users: User[]): TableDatasource | undefined => {
    return users ? {
        columnHeaders: [ 'Name', 'Username', 'Email', 'Address' ],
        rows: users.map(user => ({
            columns: [ {
                value: user.name,
                isEditable: true,
                onEdit: () => true
            }, {
                value: user.username,
                isEditable: false
            }, {
                value: user.email,
                isEditable: false
            }, {
                value: addressFormatter(user.address),
                isEditable: false
            } ]
        }))
    } : undefined;

};

const addressFormatter: (address: UserAddress) => string =
    (address: UserAddress) => `${address.suite} ${address.street} ${address.zipcode} ${address.city}`;

export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: UserAddress
}

export type UserAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: LatLng
};

export type LatLng = { lat: string, lng: string };