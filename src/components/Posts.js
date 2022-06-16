import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'

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
}));

const CheckComments = styled((props) => {
    const {expand, ...other } = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Posts = (props) => {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Cannot find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
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
										image={ post.image }
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post.title}...
										</Typography>
										<div className={classes.postText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
											<Typography variant="body1" color="textSecondary">
												{post.content}...
											</Typography>
										</div>
									</CardContent>
                                    <CardActions disableSpacing> 
                                        <CheckComments
                                            expand = {expanded}
                                            onClick = {handleExpandClick}
                                            aria-expanded = {expanded}
                                            aria-label = "show more"
                                        >
                                            <ExpandMoreIcon 
                                                alignitems = "right"
                                            />
                                        </CheckComments>
                                    </CardActions>
                                    <Collapse>
                                        <Typography paragraph>
                                            Comments:
                                        </Typography>
                                    </Collapse>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Posts;