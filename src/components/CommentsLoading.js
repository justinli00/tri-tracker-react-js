import React from 'react';

function CommentsLoading(Component) {
    return function CommentsLoadingComponent({ isLoading, ...props }) {
        if(!isLoading)
            return <Component {...props} />;
        else
            return (
                <p 
                    style = {{ fontSize: '25px'}}
                >
                    Waiting for data to load...
                </p>
            );

    };
}

export default CommentsLoading;