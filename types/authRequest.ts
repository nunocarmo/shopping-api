import { Request } from "express";

type userType = {
    id: String,
    name: String,
}
type authRequest = Request & {
    headers: {
        authorization: String
    },
    user: userType,
}

export { authRequest, userType }