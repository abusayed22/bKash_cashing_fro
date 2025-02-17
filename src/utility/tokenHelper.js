import { jwtVerify, SignJWT } from "jose";
// import "@/envConfig"

// const env = process.env

const JWT_SECRET = 'apps-key-bKash'
const JWT_ISSUER = "Localhost"
const JWT_EXPIRE = "1h"


// create token 
export async function CreateToken(email, id) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const payload = { email, id };

        let token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER)
            .setExpirationTime(process.env.JWT_EXPIRE) // process.JWT_EXPIRE
            .sign(secret);


        return token;
    } catch (error) {
        console.log(error)
    }
}


// token Decoded
export async function TokenDecoded(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decoded = await jwtVerify(token, secret);
        return decoded['payload']
    } catch (error) {
        console.log('token decoded error: ', error)
    }
}