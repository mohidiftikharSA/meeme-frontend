import React from 'react';
import PropTypes from 'prop-types';
import classes from './SearchResult.module.scss';
import {useNavigate} from "react-router-dom";

const SearchResult = ({results, clearResult}) => {
    const navigate = useNavigate();
    const onClickUserProfile = (id) => {
        clearResult();
        navigate(`/otherProfile/${id}`)
    }
    return (<div className={classes.searchResults}>
        <div>
            {results.map((result, index) => (<div key={`user_search_result_${index}`}
                                                  onClick={() => onClickUserProfile(result.id)}
                                                  className={classes.resultItem}>
                <div
                    className={classes.resultDetails}>
                    <div className={classes.resultTitle}>{result.username}</div>
                    <div className={classes.resultDescription}>{result.email}</div>
                </div>
            </div>))}
        </div>
    </div>);
};
export default SearchResult;
