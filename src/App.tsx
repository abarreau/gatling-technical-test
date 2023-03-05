import './App.css';
import { Card } from './components/card/Card';
import { PageHeader } from './components/page-header/PageHeader';
import { PageContent } from './components/page-content/PageContent';

function App () {
    return (
        <>
            <PageHeader>Gatling Corp Test</PageHeader>
            <PageContent>
                <h1>Users</h1>
                <Card/>
            </PageContent>
        </>
    );
}

export default App;
