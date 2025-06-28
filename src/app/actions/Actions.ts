'use server';

import { channel } from "diagnostics_channel";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { get } from "http";


// READ Actions
export async function getChannels() {
    try {
        const channels = await prisma.channel.findMany();
        return channels;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function addChannel(name: string, appId: string) {
    try {
        const channel = await prisma.channel.create({ data: { title: name, appId: appId } });
        revalidatePath("/");
        return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getSubjects(channelId: string) {
    try {
        const subjects = await prisma.subject.findMany({
            where: {
                channelId: channelId
            }
        });
        return subjects;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function addSubject(name: string, channelId: string) {
    try {
        const subject = await prisma.subject.create({ data: { title: name, channelId: channelId } });
        revalidatePath("/");
        return subject;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function getTopics(subjectId: string) {
    try {
        const topics = prisma.topic.findMany({
            where: {
                subjectId: subjectId
            }
        });
        return topics;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function getCheatSheet(subjectId: string) {
    try {
        const cheatSheet = prisma.cheatsheet.findMany({
            where: {
                subjectId: subjectId
            }
        });
        return cheatSheet;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function addTopic(name: string, description: string, testcase: string, code: string, subjectId: string) {
    try {
        const topic = prisma.topic.create({ data: { title: name, description: description, testcase: testcase, code: code, subjectId: subjectId } });
        return topic;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function addCheatSheet(name: string, content: string, subjectId: string) {
    try {
        const cheatSheet = prisma.cheatsheet.create({ data: { title: name, content: content, subjectId: subjectId } });
        return cheatSheet;
    } catch (error) {
        console.log(error);
        throw error;
    }
}