"use client";
import "./style.scss";
import { checkBasicGrammar } from "@/app/components/utils/GrammarChecker";
import { titleCaseByStyle } from "@/app/components/utils/TitleCase";
import { useMemo, useRef, useState } from "react";

const Page = () => {

    const [titleCaseStyle, setTitleCaseStyle] = useState("AP");
    const [text, setText] = useState("");
    const [output, setOutput] = useState("");

    const outputRef = useRef<HTMLDivElement>(null);

    const stats = useMemo(() => {
        if (!output) {
            return {
                charCount: 0,
                wordCount: 0,
                sentenceCount: 0,
                lineCount: 0,
            };
        }

        // 1. Character Count (includes spaces and newlines)
        const charCount = output.length;

        // 2. Word Count: Split by any sequence of whitespace, filter out empty strings
        const words = output.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // 3. Line Count: Split by newline character
        const lineCount = output.split('\n').length;
        
        // 4. Sentence Count: Split by common sentence-ending punctuation
        const sentences = output.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentenceCount = sentences.length;

        return { charCount, wordCount, sentenceCount, lineCount };
    }, [output]);


    const changeText = (caseType:string) => {
        switch (caseType) {
            case "capitalCase":
                setOutput(text.replace(/\b\w/g, c=>c.toUpperCase()));
                break;
            case "titleCase":
                setOutput(titleCaseByStyle(text, titleCaseStyle));
                break;
            case "lowerCase":
                setOutput(text.toLowerCase().replace(/\bi\b/g, 'I'))
                break;
            case "upperCase":
                setOutput(text.toUpperCase());
                break;
            case "sentenceCase":let tempText = text.toLowerCase();
                
                // 1. Capitalize the first letter of the whole string
                if (tempText.length > 0) {
                    tempText = tempText.charAt(0).toUpperCase() + tempText.slice(1);
                }

                // 2. FIX: Capitalize the standalone pronoun 'i' globally
                tempText = tempText.replace(/\bi\b/g, 'I');

                // 3. Capitalize the first letter after sentence-ending punctuation
                // Finds .?! followed by optional whitespace and then the start of a word (\w)
                tempText = tempText.replace(/([.?!]\s+)([a-z])/g, (_match, separator, letter) => {
                    return separator + letter.toUpperCase();
                });
                
                setOutput(tempText);
                break;
            case "snakeCase":
                setOutput(text.toLowerCase()
                    .replace(/\s+/g, '_') // Replace spaces with underscore
                    .replace(/[^a-z0-9_]+/g, '') // Remove non-alphanumeric except underscore
                    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
                    .replace(/^_|_$/g, '')); // Remove leading/trailing underscores
                break;
            case "camelCase":
                const words = text.toLowerCase().match(/[a-zA-Z0-9]+/g); // Split into words
                if (words) {
                    const result = words.map((word, index) =>
                        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                    ).join('');
                    setOutput(result);
                }
                break;
            case "kebabCase":
                setOutput(text.toLowerCase()
                        .replace(/\s+/g, '-') // Replace spaces with hyphen
                        .replace(/[^a-z0-9-]+/g, '') // Remove non-alphanumeric except hyphen
                        .replace(/-{2,}/g, '-') // Replace multiple hyphens with single
                        .replace(/^-|-$/g, ''));
                break;
            default:
                setOutput(text);
                break;
        }
    }
    
    const [copyMessage, setCopyMessage] = useState("");
    const copyToClipboard = async () => {
        console.log("copyToClipboard");
        
        if (!output) {
            setCopyMessage("Nothing to copy!");
            return;
        }

        let copied = false;
        
        // 1. Attempt modern API (preferred and non-deprecated)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(output);
                copied = true;
            } catch (err) {
                // Modern API failed, but no error message needed here, 
                // as we seamlessly transition to the fallback.
                console.warn('Modern clipboard API failed. Trying execCommand fallback.', err);
            }
        }
        
        // 2. Fallback to deprecated execCommand (Necessary fallback in iFrames)
        if (!copied) {
            const textarea = document.createElement('textarea');
            textarea.value = output;
            
            // Hide the textarea off-screen
            textarea.style.position = 'fixed'; 
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            
            // Select and copy
            textarea.focus();
            textarea.select();

            try {
                copied = document.execCommand('copy');
            } catch (err) {
                console.error('Failed to copy text even with execCommand: ', err);
                copied = false;
            } finally {
                // Clean up by removing the temporary textarea
                document.body.removeChild(textarea);
            }
        }
        
        // 3. Set Message based on outcome
        if (copied) {
            setCopyMessage("✅ Copied to Clipboard!");

            outputRef.current?.classList.add("active");
            setTimeout(() => {
                outputRef.current?.classList.remove("active");
            }, 1000);
        } else {
            setCopyMessage("❌ Copy failed. Please copy manually.");
        }

        setTimeout(() => setCopyMessage(""), 2000); 
    };

    const fixGrammar = () => {
        setOutput(checkBasicGrammar(text));
    }

    return (
        <div className="px-base text-center pt-20 pb-8">
            <h1>Text Convertor</h1>
            <p>Convert text to other formats.</p>
            <div className="divider divider-base w-full"></div>
            <h5>Input Text:</h5>
            <textarea className="w-full h-40 resize-y border border-text-500/50 p-4 mt-2" placeholder={"Write your text here..."} value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className="btns flex gap-4 flex-wrap justify-center items-center mt-4">
                <div className="join">
                    <select className="select select-primary border w-20 join-item" name="titleCase" onChange={(e) => setTitleCaseStyle(e.target.value)}>
                        <option value="AP">AP</option>
                        <option value="APA">APA</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="button" className="btn btn-primary btn-titleCase  join-item" onClick={()=>changeText("titleCase")}>
                        Title Case
                    </button>
                </div>
                <button type="button" className="btn btn-soft btn-secondary btn-camelCase" onClick={()=>changeText("upperCase")}>
                    Upper Case
                </button>
                <button type="button" className="btn btn-soft btn-accent btn-camelCase" onClick={()=>changeText("lowerCase")}>
                    Lower Case
                </button>
                <button type="button" className="btn btn-soft btn-info btn-camelCase" onClick={()=>changeText("sentenceCase")}>
                    Sentence Case
                </button>
                <button type="button" className="btn btn-soft btn-success btn-capitalCase" onClick={()=>changeText("capitalCase")}>
                    Capitalize
                </button>
                <button type="button" className="btn btn-soft btn-primary btn-snakeCase" onClick={()=>changeText("camelCase")}>
                    Camel Case
                </button>
                <button type="button" className="btn btn-soft btn-warning btn-snakeCase" onClick={()=>changeText("snakeCase")}>
                    Snake Case
                </button>
                <button type="button" className="btn btn-soft btn-error btn-kebabCase" onClick={()=>changeText("kebabCase")}>
                    Kebab Case
                </button>
            </div>
            <button type="button" className="btn btn-success mt-4" onClick={fixGrammar}>Fix Basic Grammar</button>
            <h5 className="mt-4 font-bold">Output: (Click Me to Copy)</h5>
            <div className="w-full mt-3 min-h-40 p-4 outputTxt cursor-pointer border border-primary-content-100" onClick={copyToClipboard} ref={outputRef}>{output}</div>
            <div className="mt-4">
                Character Count: <span className="badge badge-primary px-1 text-xl">{stats.charCount}</span>&nbsp; Word Count: <span className="badge badge-secondary px-1 text-xl">{stats.wordCount}</span> &nbsp;Sentence Count: <span className="badge badge-info px-1 text-xl">{stats.sentenceCount}</span>&nbsp; Line Count: <span className="badge badge-success px-1 text-xl">{stats.lineCount}</span>
            </div>
        </div>
    );
}

export default Page;