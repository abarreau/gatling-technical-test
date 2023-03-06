import { PageHeader } from './components/page-header/PageHeader';
import { Route, Routes } from 'react-router-dom';
import { UserPage } from './pages/users/UserPage';
import { Posts } from './pages/posts/Posts';
import { NotFound } from './pages/not-found/NotFound';

function App () {
    return (
        <>
            <PageHeader>Gatling Corp Test</PageHeader>

            <Routes>
                <Route index element={<UserPage/>} />
                <Route path="/posts/:userId" element={<Posts />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
