import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const SkeletonPostsLoading = () => {
    return (<SkeletonTheme baseColor="#c4c4c4" highlightColor="#b2b2b2">
        <div>
            {[...Array(10)].map((_, index) => (<div key={index} style={{marginTop: '20px'}}>
                <Skeleton height={300} width="100%" style={{marginTop: '10px',borderRadius: '20px'}}/>
            </div>))}
        </div>
    </SkeletonTheme>);
};

export default SkeletonPostsLoading;
