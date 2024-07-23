const encryption = {
    async encryptPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);

        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },

    async decryptPassword(hashedPassword, inputPassword) {
        // Mã hóa input password và so sánh với mật khẩu đã mã hóa
        const inputHash = await encryption.encryptPassword(inputPassword);
        return inputHash === hashedPassword;
    }
}

export default encryption