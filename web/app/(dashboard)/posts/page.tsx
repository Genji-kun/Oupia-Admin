
import React, { Suspense } from 'react';
import Loading from './loading';

const PostsPage = () => {
    return (
        <section>
            <Suspense fallback={<Loading />}>

            </Suspense>
        </section>
    );
};

export default PostsPage;