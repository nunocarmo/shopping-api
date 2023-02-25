type registerBodyType = {
    username: string,
    email: string,
    password: string | CryptoJS.lib.WordArray
}
export { registerBodyType };