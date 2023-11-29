import React from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import classes from "./index.module.scss";

const MemeItemSkeleton = ({explore}) => {
    return (<>
        <SkeletonTheme baseColor="#c4c4c4" highlightColor="#b2b2b2">
            <div className={`${classes.flexBox}  ${explore ? classes.exploreBox : ""}`}>
                {[...Array(10)].map((_, index) => (<div
                    className={classes.imgBox}
                    key={index}>
                    <Skeleton height={(index == 0 || index == 3 || index == 4 || index == 7) ? 300 : 260}
                              width="95%"
                              style={{borderRadius: "20px"}}/>
                </div>))}
            </div>
        </SkeletonTheme>
    </>);
};

export default MemeItemSkeleton;
