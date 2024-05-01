import jwt from 'jsonwebtoken';

export const jwtGenerator = (uid: string) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        if (process.env.SECRETORPRIVATEKEY) {

            jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
        }
    })
}