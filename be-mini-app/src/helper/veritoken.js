import { verify } from 'hono/jwt';

export const verifyToken = async (c, next) => {
	try {
		const token = c.req.header('token');
		console.log('token :', token);
		if (!token) {
			return c.json({ success: false, message: 'Không đủ quền truy cập' }, 401);
		}

		const decodedPayload = await verify(token, c.env.SECRET_JWT);
		c.req.decodedPayload = decodedPayload;
		await next();
	} catch (err) {
		return c.json({ success: false, message: 'Token Không hợp lệ' }, 401);
	}
};
