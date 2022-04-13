import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'
import Validation from '../utils/validator'
import express from 'express'
import { generateToken } from '../utils/Jwt'
import Messages from '../utils/Message'

const AuthRoute = express.Router()
const prisma = new PrismaClient()
const salt = bcrypt.genSaltSync(12);



AuthRoute.post('/register', async (req: any, res: any) => {
    const hash = bcrypt.hashSync(req.body.password, salt); // hashing password
    const formData = { // inputan
        username: req.body.username,
        password: hash,
        email: req.body.email,
    }
    await Validation([formData], res) // check validasi

    // buat users
    await prisma.user.create({
        data: Prisma.validator<Prisma.UserCreateInput>()(formData)
    }).then((result) => {
        return Messages(0,"Account berhasil dibuat. Silahkan Login",res)
    }).catch((err) => {
        if (err.code === 'P2002') return Messages(1,"Email yang anda masukan sudah terdaftar.",res)
    });
})

AuthRoute.post('/login', async (req: any, res: any) => {
    const formData = {
        password: req.body.password,
        email: req.body.email,
    }
    await Validation([formData], res)

    await prisma.user.findUnique({
        where: {
            email: formData.email
        }
    }).then((result) => {
        if (result) {
            // samain password
            const password_valid = bcrypt.compareSync(req.body.password, result.password);
            if (password_valid) {
                const accessToken = generateToken(result); // create token
                // update data token
                prisma.user.update({
                    where: { id: result.id },
                    data: { token: accessToken }
                }).then((result) => {
                    return Messages(0,{token: accessToken },res)
                }).catch((err) => {
                    return Messages(1,"token expired. Ulangi Login",res)
                });
            }
            else
                return Messages(1, "Password anda tidak valid", res); // kalau password salah
        } else
            return Messages(1, "Pengguna dengan email tersebut tidak ditemukan", res); // kalau email salah
    }).catch((err) => {
        return Messages(1, "Server failure", res); // server failure
    });
})


export default AuthRoute