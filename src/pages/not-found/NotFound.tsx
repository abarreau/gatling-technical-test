import { FC } from 'react';
import { PageContent } from '../../components/page-content/PageContent';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => {
    return (<PageContent>
        <h1>{'Sorry, the page you\'re looking for was not found.'}</h1>
        <p><Link to='/'>Take me back to somewhere safe !</Link></p>
    </PageContent>);
};