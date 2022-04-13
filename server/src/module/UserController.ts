import { PrismaClient } from "@prisma/client";
import express from "express";
import Messages from "../utils/Message";
import uploades from "../utils/UploadFile";
import Authorization from "../utils/Authorization";
const UserRoute = express.Router();
const prisma = new PrismaClient();


UserRoute.get('/all',Authorization, async (req: any, res: any) => {
    const User = await prisma.user.findMany()
    return Messages(0,User,res)
})

UserRoute.get('/me', Authorization, async (req: any, res: any) => {
    const User = await prisma.user.findUnique({
        where: {
            id: req.payload.id
        }
    });
    if(!User) return Messages(1,"Data yang anda cari tidak ditemukan.",res)
    return Messages(0,User,res)
})

UserRoute.get('/detail', Authorization, async (req: any, res: any) => {
    const User = await prisma.user.findUnique({
        where: {
            id: req.payload.id,
        },
        include: {userabout: true}
    });
    if(!User) return Messages(1,"Data yang anda cari tidak ditemukan.",res)
    return Messages(0,User,res)
})


UserRoute.post('/update', Authorization,uploades.single('avatar'), async (req: any, res: any) => {
    const User = await prisma.user.findUnique({
        where: {
            id: req.payload.id
        }
    });
    if (!User) return Messages(1, "Gagal update, pengguna tidak ditemukan", res)

    const form = {
        user_id: req.payload.id
    };
    
    if (req.file) Object.assign(form, { avatar: req.file.filename })
    if (req.body.bio) Object.assign(form, { bio: req.body.bio })
    if (req.body.status) Object.assign(form, { status: req.body.status })
    if (req.body.location) Object.assign(form, { location: req.body.location })
    if (req.body.phone) Object.assign(form, { phone: req.body.phone })

    const updated = await prisma.user_About.upsert({
        where: {
            id: req.payload.id
        },
        update: form,
        create: form
    });
    if (updated) return Messages(0, "Data berhasil di update", res);
    else return Messages(1, "Maaf data gagal diupdate", res);
    
})

export default UserRoute;