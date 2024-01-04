import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const SkeletonPostsLoading = () => {
    return (<SkeletonTheme baseColor="#7c7b7c" highlightColor="#969696" >
        <div>
            {[...Array(10)].map((_, index) => (<div key={index} style={{marginTop: '20px'}}>
                <div style={{display: 'flex', marginRight: '10px'}}>
                    <div style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}}>
                        <Skeleton circle={true} height={50} width={50}/>
                    </div>
                    <div style={{marginLeft: '10px'}}>
                        <Skeleton style={{marginTop: '12px'}} height={10} width={130}/>
                        <Skeleton style={{marginTop: '4px'}} height={8} width={90}/>
                    </div>
                </div>
                <div>
                    <Skeleton height={300} width="100%" style={{marginTop: '10px',borderRadius: '20px'}}/>
                </div>
            </div>))}
        </div>
    </SkeletonTheme>);
};

export default SkeletonPostsLoading;
