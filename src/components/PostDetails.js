import React from 'react'
import { useNavigate , useLocation } from 'react-router-dom';
import axiosInstance from '../axios';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostComments from './PostComments';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
    postSubtext: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
	},
}));

const PostDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state.post;
	const classes = useStyles();
    
    const deletePost = () => {
        axiosInstance
            .delete(`post/${post.id}/`)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                console.log(error);
                alert(error.message);
            });
    }

    console.log(location.state.post);
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Card className={classes.card}>
                    <CardHeader
                        avatar = {
                            <Avatar sx = {{ bgcolor: "red"}}>
                            { String(post.author) } 
                            </Avatar>
                        }
                    />
                    <CardMedia
                        className={classes.cardMedia}
                        image={ "https://source.unsplash.com/random" }
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            className={classes.postTitle}
                        >
                            {post.title}
                        </Typography>
                        <div className={classes.postText}>
                            <Typography
                                component="p"
                                color="textPrimary"
                            ></Typography>
                            <Typography variant="body1" color="textSecondary">
                                {post.content}
                            </Typography>
                        </div>
                        <div className={classes.postSubtext}>
                            <Typography variant="body3" color="textSecondary">
                                Activity Type: {post.activity_type}
                            </Typography>
                        </div>
                        <div className={classes.postSubtext}>
                            <Typography variant="body3" color="textSecondary">
                                Activity Distance: {post.activity_distance} {post.distance_type}
                            </Typography>
                        </div>
                        <div className={classes.postSubtext}>
                            <Typography variant="body3" color="textSecondary">
                                Activity Start/End: {post.activity_start} / {post.activity_end}
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                navigate('/edit-post', {state:{post:post}})
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={deletePost}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default PostDetails;