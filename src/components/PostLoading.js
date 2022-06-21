import React from 'react';

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if(localStorage.getItem('access_token') == null)
            return (
                <p 
                    style = {{ fontSize: '25px'}}
                >
                    Log in to see the blog!
                </p>
            );
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

export default PostLoading;