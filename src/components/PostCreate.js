import React, { useState } from 'react'
import axiosInstance from '../axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
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

export default function PostCreate() {

  const initialFormData = Object.freeze({
		title: '',
    author: localStorage.getItem('user_id'),
		content: '',
    activity_type: '',
    activity_distance: '',
    distance_type: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
    console.log("e", e.target);
    console.log(formData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		//get jwt tokens
		axiosInstance
			.post(`post/`, {
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

  const navigate = useNavigate();
	const classes = useStyles();

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
            onChange={handleChange}
          >
            <MenuItem value={'Miles'}>mi</MenuItem>
            <MenuItem value={'Kilometers'}>km</MenuItem>
          </Select>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
            Create Post
					</Button>
				</form>
    </React.Fragment>

  )
}
