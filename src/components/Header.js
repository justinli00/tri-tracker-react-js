import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

function Header() {
	const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') != null);
    const user_name = localStorage.getItem('user_name');

    const UserInfo = () => {
        if(loggedIn) 
        {
            return (
                <React.Fragment>
                    <Typography
                        component="h2"
                    >
                        Welcome back, {user_name}!
                    </Typography>
                    <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to="/logout"
                    >
                        Logout
                    </Button>
                </React.Fragment>
            );
        }
        else
        {
            return (
                <React.Fragment>
                    <nav>
                        <Link
                            color="textPrimary"
                            href="#"
                            className={classes.link}
                            component={NavLink}
                            to="/register"
                        >
                            Register
                        </Link>
                    </nav>
                    <Button
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                        component={NavLink}
                        to="/login"
                    >
                        Login
                    </Button>
                </React.Fragment>
            );
        }
    };

    const CreatePostOption = () => {
        //only displays if logged in
        if(loggedIn)
        {
            return (
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    <Link
                        component={NavLink}
                        to="/create-post"
                        underline="none"
                        color="textPrimary"
                    >
                        Create A Post
                    </Link>
                </Typography>
            );
        }
    };

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Blog
						</Link>
					</Typography>
                    <CreatePostOption/>
					<UserInfo/>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;