type loginType = {
    _id: String
    username: String
    email: String
    password: string | CryptoJS.lib.CipherParams
}
export { loginType }