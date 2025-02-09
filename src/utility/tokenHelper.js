import { jwtVerify, SignJWT } from "jose";
import "@/envConfig"

const env = process.env

const JWT_SECRET = 'apps-key-bKash'
    const JWT_ISSUER="Localhost"
    const JWT_EXPIRE="1h"


// create token 
export async function CreateToken(email, id) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const payload = { email, id };

        let token = new SignJWT(payload)
            .setProtectedHeader({ alg: 'Ha256' })
            .setIssuedAt()
            .setIssuer(JWT_ISSUER)
            .setExpirationTime('1h') // process.JWT_EXPIRE
            .sign(secret)

        return token;
    } catch (error) {
        console.log(error)
    }
}


// token Decoded
export async function TokenDecoded(token) {
    // console.log('dec',JWT_SECRET)
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const decoded = await jwtVerify(token, secret);
        return decoded['payload']
    } catch (error) {
        console.log('token decoded error: ', error)
    }
}