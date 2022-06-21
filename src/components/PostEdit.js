import React, { useState } from 'react'
import axiosInstance from '../axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexdirection: 'column',
        alignitems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%', 
        marginTop: theme.spacing(1),
        flexdirection: 'md',
        alignitems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function PostEdit() {

    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state.post;
	const classes = useStyles();

    const initialFormData = Object.freeze({
        title: post.title,
        author: localStorage.getItem('user_id'),
        content: post.content,
        activity_type: post.activity_type,
        activity_distance: post.activity_distance,
        distance_type: post.distance_type,
    });

    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //get jwt tokens
        axiosInstance
            .put(`post/${post.id}/`, {
                title: formData.title,
                author: formData.author,
                content: formData.content,
                activity_type: formData.activity_type,
                activity_distance: formData.activity_distance,
                distance_type: formData.distance_type,
            })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                console.log(error);
                alert(error.message);
            });
    };

    return (
        <React.Fragment>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Post Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    defaultValue={initialFormData.title}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="content"
                    label="Post Contents"
                    name="content"
                    autoComplete="content"
                    autoFocus
                    defaultValue={initialFormData.content}
                    onChange={handleChange}
                />
                <InputLabel id="activity_type">Activity Type</InputLabel>
                <Select
                    labelId="activity_type"
                    required
                    id="activity_type"
                    value={initialFormData.activity_type}
                    autoComplete="activity_type"
                    label="Activity Type"
                    name="activity_type"
                    autoFocus
                    defaultValue={initialFormData.activity_type}
                    onChange={handleChange}
                >
                    <MenuItem value={'Running'}>Running</MenuItem>
                    <MenuItem value={'Biking'}>Biking</MenuItem>
                    <MenuItem value={'Swimming'}>Swimming</MenuItem>
                </Select>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="activity_distance"
                    label="Activity Distance"
                    name="activity_distance"
                    autoComplete="activity_distance"
                    autoFocus
                    defaultValue={initialFormData.activity_distance}
                    onChange={handleChange}
                />
                <InputLabel id="distance_type">Distance Type</InputLabel>
                <Select
                    labelId="distance_type"
                    required
                    id="distance_type"
                    value={initialFormData.distance_type}
                    autoComplete="distance_type"
                    label="Distance Type"
                    name="distance_type"
                    autoFocus
                    defaultValue={initialFormData.distance_type}
                    onChange={handleChange}
                >
                    <MenuItem value={'Miles'}>Miles</MenuItem>
                    <MenuItem value={'Kilometers'}>Kilometers</MenuItem>
                </Select>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Edit Post
                </Button>
            </form>
    </React.Fragment>

    )
}
