type loginType = {
    _id: string
    username: string
    email: string
    password: string | CryptoJS.lib.CipherParams
}
export { loginType };