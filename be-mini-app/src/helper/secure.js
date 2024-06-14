const jwt = require("@tsndr/cloudflare-worker-jwt");

export default {
    generateJWT(user, secret) {
        return jwt.sign({
            ...user,
            exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60)
        }, secret);
    },
    async verifyJWT(token, secret) {
        let valid = await jwt.verify(token, secret);
        if (!valid) return false;
        return jwt.decode(token).payload;
    }
}