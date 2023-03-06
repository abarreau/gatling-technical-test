import { FC } from 'react';
import { Card } from '../../components/card/Card';
import { PageContent } from '../../components/page-content/PageContent';

export const Posts: FC = () => {
    return (<PageContent>
        <h1>Posts from user</h1>
        <Card>
        </Card>
    </PageContent>);
};