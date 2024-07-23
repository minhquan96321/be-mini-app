export const generateRandomCode = () => {
	const digits = '0123456789';

	let code = '';
	for (let i = 0; i < 11; i++) {
		code += digits.charAt(Math.floor(Math.random() * digits.length));
	}

	return code;
};

export const generateRestaurantCode = () => {
	const prefix = 'NH';
	const digits = 10;
	let code = prefix;

	for (let i = 0; i < digits; i++) {
		const randomDigit = Math.floor(Math.random() * 10);
		code += randomDigit;
	}

	return code;
};

export const generateBookingCode = () => {
	const prefix = 'BK';
	const digits = 10;
	let code = prefix;

	for (let i = 0; i < digits; i++) {
		const randomDigit = Math.floor(Math.random() * 10);
		code += randomDigit;
	}

	return code;
};
