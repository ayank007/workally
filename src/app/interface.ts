interface Channel {
  id: string
  title: string
  appId: String
}
interface Subject {
    id: string
    title: string
    channelId: string
}
interface Topic {
    id: string
    title: string
    description: string
    code: string
    testcase: string
    subjectId: string
}
interface CheatSheet {
    id: string
    title: string
    content: string
    subjectId: string
}