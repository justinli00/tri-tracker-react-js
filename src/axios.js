//handles api class via axios

import axios from 'axios';

const baseURL = 'https://tri-tracker-backend.azurewebsites.net/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout:5000, //disconnect after a certain amount of time
    headers: {
        Authorization: localStorage.getItem('access_token')     //get jwt token if provided
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json', //send/recieve jsons
        accept: 'application/json'
    },
})

//more robust error handling
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},

    //error handling
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

        //prevent looping through errors
		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		//if error response data is undefined
		if(error.response.data == null)
		{
			console.log("An error with no response data has occurred.");
			return Promise.reject(error);
		}
		if(error.response.data.code == null)
		{
			console.log("An undefined error has occurred.");
			return Promise.reject(error);
		}

        //if token expires
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
            //try to use refresh token to get a new access token
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;