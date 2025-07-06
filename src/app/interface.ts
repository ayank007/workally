interface Channel {
    id: string
    title: string
    appId: String
    createdAt: Date
    updatedAt: Date
    subjects?: Subject[]
}
interface Subject {
    id: string
    title: string
    channelId: string
    createdAt: Date
    updatedAt: Date
    topics?: Topic[]
    cheatSheet?: CheatSheet[]
}
interface Topic {
    id: string
    title: string
    description: string
    code: string
    testcase: string
    subjectId: string
    createdAt: Date
    updatedAt: Date
}

interface CheatSheet {
    id: string
    title: string
    content: string
    subjectId: string
    createdAt: Date
    updatedAt: Date
}