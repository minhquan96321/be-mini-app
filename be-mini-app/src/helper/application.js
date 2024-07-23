import axios from 'axios';
export const application = async (c, acctoken, body) => {
	const data = {
		// "phone": `84961089613`,
		phone: `${body.phone}`,
		template_id: '343679',
		template_data: {
			order_code: `${body.idbookcar}`,
			customer_phone: `${body.phoneuser}`,
			address_to: `${body.addressEnd}`,
			customer_name: `${body.username}`,
			address_from: `${body.addressStart}`,
		},
		tracking_id: '1',
	};
	const response = await axios.post('https://business.openapi.zalo.me/message/template', data, {
		headers: {
			'Content-Type': 'application/json',
			access_token: `${acctoken}`,
		},
	});
	return response;
};

export const newOrderBookcar = async (c, acctoken, body) => {
	const data = {
		phone: `${c.env.PHONE_ADMIN}`,
		template_id: '348505',
		template_data: {
			order_code: `${body.idbookcar}`,
			order_date: `${body.time}`,
			customer_phone: `${body.userphone}`,
			customer_name: `${body.username}`,
		},
		tracking_id: '1',
	};
	const response = await axios.post('https://business.openapi.zalo.me/message/template', data, {
		headers: {
			'Content-Type': 'application/json',
			access_token: `${acctoken}`,
		},
	});
	return response;
};

export const statusOrder = async (accesstoken, body) => {
	const data = {
		phone: `${body.phone}`,
		template_id: '348415',
		template_data: {
			order_code: `${body.idbookcar}`,
			driver_name: `${body.nameDriver}`,
			order_status: `${body.status}`,
			driver_id: `${body.IDdriver}`,
			phone_number: `${body.phoneDriver}`,
		},
		tracking_id: '1',
	};
	try {
		const response = await axios.post('https://business.openapi.zalo.me/message/template', data, {
			headers: {
				'Content-Type': 'application/json',
				access_token: `${accesstoken}`,
			},
		});
		return response;
	} catch (error) {
		return error;
	}
};
