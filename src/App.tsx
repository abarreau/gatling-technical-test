import { Card } from './components/card/Card';
import { PageHeader } from './components/page-header/PageHeader';
import { PageContent } from './components/page-content/PageContent';
import { UserList } from './pages/user-list/UserList';

function App () {
    return (
        <>
            <PageHeader>Gatling Corp Test</PageHeader>
            <PageContent>
                <h1>Users</h1>
                <Card>
                    <UserList></UserList>
                </Card>
            </PageContent>
        </>
    );
}

export default App;
