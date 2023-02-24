type registerBodyType = {
    username: String,
    email: String,
    password: string | CryptoJS.lib.WordArray
}
export { registerBodyType }