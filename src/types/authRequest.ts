import { Request } from 'express';

type userType = {
    id: string,
    name: string,
}
type authRequest = Request & {
    headers: {
        authorization: string
    },
    user: userType,
}

export { authRequest, userType };