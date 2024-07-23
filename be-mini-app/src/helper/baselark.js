import { DateCreate } from './time';

export const Base = async (body, restaurant) => {
	// console.log('body :', body);
	const SumPayable = Number(body.SumPayable);
	const completetime = DateCreate();
	return {
		records: [
			{
				fields: {
					idbookcar: body.idbookacar,
					username: body.username,
					restaurant: restaurant,
					addressStart: body.addressStart,
					addressEnd: body.addressEnd,
					vehicletype: body.vehicletype,
					Paymentmethods: body.Paymentmethods,
					SumPayable: SumPayable,
					nameDriver: body.nameDriver,
					completionTime: completetime,
				},
			},
		],
	};
};
