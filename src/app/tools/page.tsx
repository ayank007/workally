import { tools } from "@/store/tools";
import SubjectTab from "../components/subject/SubjectTab";

const Page = () => {
    return (
        <>
            <h1>Select a Tool</h1>
            <div className="divider w-11/12 divider-base mx-auto"></div>
            <div className="flex mt-3 justify-center gap-3 flex-wrap">
                {tools.map((subject:Pick<Subject, 'id' | 'title'>)=>{
                    return (<div key={subject.id}>
                        <SubjectTab url={"/tools/" + subject.id} name={subject.title} />
                    </div>)
                })
                }
            </div>
        </>
    );
}

export default Page;