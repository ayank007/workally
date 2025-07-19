'use server';

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import {sendMail} from "./mailer";

// function serializeDates<T>(obj: T): T {
//     return obj;
// }
function serializeDates<T>(obj: T): T {
    // If the object is null or not an object, return it as is.
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // If it's a Date object, convert it to an ISO string.
    if (obj instanceof Date) {
        return obj.toISOString() as T;
    }

    // If it's an array, map over its elements and recursively serialize them.
    if (Array.isArray(obj)) {
        return obj.map(item => serializeDates(item)) as T;
    }

    // If it's a plain object, iterate over its keys and recursively serialize values.
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
        // Ensure we only process own properties to avoid issues with prototype chain.
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = serializeDates((obj as any)[key]);
        }
    }
    return newObj as T;
}

// READ Actions
export async function getChannels() {
    try {
        const channels = await prisma.channel.findMany();
        return serializeDates(channels);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}


export async function addChannel(name: string) {
    try {
        const channel = await prisma.channel.create({ data: { title: name, appId: "685da8571ad72d3546581ecf" } });
        revalidatePath("/");
        return serializeDates(channel);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function deleteChannel(id: string) {
    try {
        await prisma.channel.delete({ where: { id: id } });
        revalidatePath("/");
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getSubjects(channelId: string) {
    try {
        const subjects = await prisma.subject.findMany({
            where: {
                channelId: channelId
            }
        });
        return serializeDates(subjects);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function addSubject(name: string, channelId: string) {
    try {
        const subject = await prisma.subject.create({ data: { title: name, channelId: channelId } });
        revalidatePath("/");
        return serializeDates(subject);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function deleteSubject(id: string) {
    try {
        await prisma.subject.delete({ where: { id: id } });
        revalidatePath("/");
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getTopics(subjectId: string) {
    try {
        const topics = await prisma.topic.findMany({
            where: {
                subjectId: subjectId
            }
        });
        return serializeDates(topics);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getCheatSheet(subjectId: string) {
    try {
        const cheatSheet = await prisma.cheatsheet.findMany({
            where: {
                subjectId: subjectId
            }
        });
        return serializeDates(cheatSheet);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function addTopic(name: string, description: string, testcase: string, code: string, subjectId: string) {
    try {
        const topic = await prisma.topic.create({ data: { title: name, description: description, testcase: testcase, code: code, subjectId: subjectId } });
        return serializeDates(topic);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function addCheatSheet(name: string, content: string, subjectId: string) {
    try {
        const cheatSheet = await prisma.cheatsheet.create({ data: { title: name, content: content, subjectId: subjectId } });
        return serializeDates(cheatSheet);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function addUser(name: string, email: string, password: string) {
    try {
        const user = await prisma.users.findFirst({ where: { email: email } });
        if (user) {
            return {
                code: 409,
                message: "User already exists"
            }
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const newUser:User = await prisma.users.create({ data: {
                name: name,
                email: email,
                password: passwordHash,
                isVerified: false,
                isPrime: false,
                isAdmin: false,
                verificationToken: "",
                verificationExpiry: new Date(),
                forgotPasswordToken: "",
                forgotPasswordExpiry: new Date(),
            }
        });

        console.log("User created successfully, now sending email");
        
        console.log(newUser);
        
        // send verification email
        await sendMail(email, "VERIFY", newUser.id);

        return {
            code: 200,
            message: "Your account has been created successfully, please check your email to verify your account."
        };
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function verifyUser(email: string, verifyToken: string) {
    try {
        const user = await prisma.users.findFirst({ 
            where: { 
                email: email, 
                verificationToken: verifyToken, 
                verificationExpiry : { lt: new Date() } 
            }
        });
        return serializeDates(user);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const user = await prisma.users.findFirst({ where: { email: email } });
        if (!user) {
            return {
                code: 404,
                message: "User not found"
            }
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                code: 401,
                message: "Invalid password"
            }
        }
        return {
            code: 200,
            message: "Login successful",
            user: serializeDates(user)
        };
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}