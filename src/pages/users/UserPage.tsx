import { PageContent } from '../../components/page-content/PageContent';
import { Card } from '../../components/card/Card';
import { FC } from 'react';
import { UserList } from './user-list/UserList';

export const UserPage: FC = () => {
    return (
        <PageContent>
            <h1>Users</h1>
            <Card>
                <UserList></UserList>
            </Card>
        </PageContent>
    );
};