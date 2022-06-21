import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import CommentList from './CommentList';
import CommentsLoadingComponent from './CommentsLoading';

function PostComments(props) {

  const CommentsLoading = CommentsLoadingComponent(CommentList);
  const [commentsState, setCommentState] = useState({
        loading: false,
        comments: null,
    });

    useEffect = () => {
        //fetch comments associated with thing
        setCommentState({ loading:true});
        axiosInstance
            .get(`post/${props.postid}/comments/`)
            .then((comments) => {
                setCommentState({loading: false,comments})
            })
            .catch((error) => {
                console.log(error.message);
                console.log(error);
        });
    };

    return (
        <div>
            <h1>Post Comments</h1>
            <CommentsLoading 
                isLoading = {commentsState.loading}
                posts = {commentsState.posts}
            />
        </div>
    );
}

export default PostComments;