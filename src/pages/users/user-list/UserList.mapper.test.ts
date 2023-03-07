import { User } from '../../../redux/users-slice';
import { usersToTableDatasource } from './UserList.mapper';

describe('UserList mapper', () => {
    it('should map users to TableDatasource', () => {
        const users: User[] = [
            {
                name: 'Anthony',
                email: 'b-a@g.com',
                username: 'abarreau',
                id: 1,
                address: {
                    street: 'The street',
                    city: 'The city',
                    zipcode: 'The zipcode',
                    suite: 'Apt 3',
                    geo: {
                        lat: '-1',
                        lng: '-2'
                    }
                }
            },
            {
                name: 'Marine',
                email: 'marine@yolo.com',
                username: 'marine',
                id: 2,
                address: {
                    street: 'The street 2',
                    city: 'The city 2',
                    zipcode: 'The zipcode 2',
                    suite: 'Apt 4',
                    geo: {
                        lat: '-3',
                        lng: '-4'
                    }
                }
            }
        ];

        const mappedValue = usersToTableDatasource(users, jest.fn(), {});


        expect(JSON.stringify(mappedValue)).toEqual(JSON.stringify({
            columnHeaders: [ 'Name', 'Username', 'Email', 'Address' ],
            rows: [ {
                columns: [
                    {
                        value: 'Anthony',
                        type: 'editable',
                        metadata: 1,
                        onEdit: () => {}
                    },
                    {
                        value: 'abarreau',
                        type: 'simple',
                    },
                    {
                        value: 'b-a@g.com',
                        type: 'simple',
                    },
                    {
                        value: 'Apt 3 The street The zipcode The city',
                        type: 'simple',
                    },
                    {
                        type: 'action',
                        buttons: [
                            {
                                label: 'See posts',
                                metadata: 1,
                                onClick: () => {}
                            }
                        ]
                    }
                ]
            }, {
                columns: [
                    {
                        value: 'Marine',
                        type: 'editable',
                        metadata: 2,
                        onEdit: () => {}
                    },
                    {
                        value: 'marine',
                        type: 'simple',
                    },
                    {
                        value: 'marine@yolo.com',
                        type: 'simple',
                    },
                    {
                        value: 'Apt 4 The street 2 The zipcode 2 The city 2',
                        type: 'simple',
                    },
                    {
                        type: 'action',
                        buttons: [
                            {
                                label: 'See posts',
                                metadata: 2,
                                onClick: () => {}
                            }
                        ]
                    }
                ]
            } ]
        }));
    });
});

export {};