import axios from 'axios';
export const refreshToken = async (c, refreshToken) => {
	const data = {
		app_id: c.env.APPID,
		grant_type: c.env.REFRESH_TOKEN,
		refresh_token: refreshToken,
	};
	const response = await axios.post('https://oauth.zaloapp.com/v4/oa/access_token', data, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			secret_key: c.env.SECRET_KEY,
		},
	});
	// console.log("okokokok", response)

	return response;
};
