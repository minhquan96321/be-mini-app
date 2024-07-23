const { format } = require('date-fns');

export const TimeCreate = () => {
	const now = new Date();
	const options = {
		timeZone: 'Asia/Bangkok',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	};
	const timeInUTC7 = now.toLocaleTimeString('en-GB', options);

	let [hours, minutes] = timeInUTC7.split(':');
	let formattedTime = `${hours}:${minutes}`;

	const day = format(now, 'dd-MM-yyyy', { timeZone: 'Asia/Bangkok' });

	return `${day} ${formattedTime}`;
};

export const DateCreate = () => {
	const now = new Date();
	const options = {
		timeZone: 'Asia/Bangkok',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat('en-GB', options);
	const [day, month, year] = formatter.format(now).split('/');

	const formattedDate = `${day}/${month}/${year}`;

	return formattedDate;
};
