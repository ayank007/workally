import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl, base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export default function CodeBlock({ code, language }: { code: string, language: string }) {
    const sampleJavaCode = `
    import java.util.Scanner;

    public class HelloWorld {
        public static void main(String[] args) {
            // Prints "Hello, World!" to the console
            System.out.println("Hello, World!");

            // Example of a simple loop
            for (int i = 0; i < 5; i++) {
                System.out.println("Loop iteration: " + i);
            }

            // Taking user input
            Scanner scanner = new Scanner(System.in);
            System.out.print("Enter your name: ");
            String name = scanner.nextLine();
            System.out.println("Hello, " + name + "!");
            scanner.close();
        }
        public int add(int a, int b) {
            return a + b;
        }
    }
    `.trim();

    const [theme, setTheme] = useState("dark");
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    },[]);

    const [codeTheme, setCodeTheme] = useState(nightOwl);

    useEffect(() => {
        setCodeTheme(theme === "dark" ? nightOwl : base16AteliersulphurpoolLight);
    },[theme])
    return (
        <SyntaxHighlighter 
            language={language}
            style={codeTheme}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
                borderRadius: '8px',
                padding: '20px',
                fontSize: '14px',
                overflowX: 'auto',
            }}
            className={""}>
                {code}
        </SyntaxHighlighter>
    );
}