import { FC, useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import { PageContent } from '../../components/page-content/PageContent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postsSelector, postsStateStatusSelector } from '../../redux/posts-slice';
import { useParams } from 'react-router-dom';
import { fetchUsers, userSelector } from '../../redux/users-slice';
import styles from './Posts.module.css';
import { Breadcrumbs, BreadcrumbSegment } from '../../components/breadcrumbs/Breadcrumbs';
import { Spinner } from '../../components/spinner/Spinner';

export const Posts: FC = () => {
    const [ breadcrumbs, setBreadcrumbs ] = useState<BreadcrumbSegment[]>([]);

    const { userId } = useParams();
    const posts = useSelector(postsSelector);
    const postsStateStatus = useSelector(postsStateStatusSelector);
    const currentUser = useSelector(state => userSelector(state, userId && !isNaN(+userId) ? +userId : undefined));
    const dispatch = useDispatch<any>();  // any is ugly, but I don't know how to fix the typing issue here

    useEffect(() => {
        if(userId) {
            dispatch(fetchPosts(+userId));

            setBreadcrumbs([
                { name: 'Users', url: '/' }, { name: 'Posts from a user', url : '/posts/' + userId }
            ]);
        }
    }, []);

    useEffect(() => {
        if(!currentUser) {
            dispatch(fetchUsers());
        }
    }, [ currentUser ]);

    return (<PageContent>
        <Breadcrumbs segments={breadcrumbs} />
        <h1>Posts from user { currentUser?.name }</h1>
        {
            postsStateStatus === 'pending'
                ? <Spinner />
                : posts.length > 0
                    ? posts.map(post => <Card key={post.id}>
                        <h2 className={styles.postTitle}>{ post.title }</h2>
                        <p className={styles.postContent}>{ post.body }</p>
                    </Card>)
                    : <span>Sorry, no posts</span>
        }
    </PageContent>);
};