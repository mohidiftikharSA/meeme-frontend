import React from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import classes from "./index.module.scss";

const MemeItemSkeleton = () => {
    return (<>
        <SkeletonTheme baseColor="#c4c4c4" highlightColor="#b2b2b2">
            <div style={{display: 'flex', flexWrap: 'wrap',}}>
                {[...Array(10)].map((_, index) => (<div
                    key={index}
                    style={{
                        width: '50%',
                        justifyContent: 'center',
                        padding: '4px',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                    <Skeleton height={(index == 0 || index == 3 || index == 4 || index == 7) ? 300 : 260} width="95%"
                              style={{borderRadius: "20px"}}/>
                </div>))}
            </div>
        </SkeletonTheme>
    </>);
};

export default MemeItemSkeleton;
