type userModelType = {
    _id?: String
    username?: String
    email?: String
    password?: string | CryptoJS.lib.CipherParams
    _doc?: any
}
export { userModelType }