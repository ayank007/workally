"use client";

import { StringToURL } from "@/actions/StringToURL";
import SubjectTab from "./SubjectTab";
import { usePathname } from "next/navigation";

function SubjectList ({SubjectList}:{SubjectList:Pick<Subject, 'id' | 'title'>[]}) {
    const pathname = usePathname();
    const channelLink = pathname.split("/")[1];

    const sortSubjects = () => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        const searchValue = searchInput.value.toLowerCase();
        const subjects = document.querySelectorAll('.subjectListTab');
        subjects.forEach(subject => {
            const subjectTitle = subject.querySelector('a')?.textContent?.toLowerCase();
            if (subjectTitle && !subjectTitle.includes(searchValue)) {
                subject.classList.add('hidden');
            } else {
                subject.classList.remove('hidden');
            }
        });
    }

    const sortSubjectsOnEnter = (e:any) => {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) { //Enter keycode                        
            e.preventDefault();
            sortSubjects();
        }
    }
    
    return (
        <ul className="menu bg-base-100 text-base-content min-h-full p-3 flex-nowrap overflow-x-hidden overflow-y-auto">
            <label className="input w-56 min-h-9">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" className="grow" placeholder="Search a Subject" onBlur={sortSubjects} onKeyUp={sortSubjectsOnEnter} />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </label>
            <br />
            {SubjectList.length == 0 ? (
                <div>No Subjects Added for this Channel</div>
            ) : (
                SubjectList.map((subject:Pick<Subject, 'id' | 'title'>)=>{
                    const url = channelLink + "/" + StringToURL(subject.title) + "-" + subject.id;
                    
                    return (<li className="subjectListTab" key={subject.id}>
                        <SubjectTab url={"/" +channelLink + "/" + subject.id} name={subject.title} />
                    </li>)
                })
            )}
            
            <div className="divider lg:divider-horizontal divider-base !h-screen !m-0 !w-px absolute right-0 top-0"></div>
        </ul>
    );
}

export default SubjectList;