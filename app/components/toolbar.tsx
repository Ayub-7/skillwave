"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Undo,
    Redo,
} from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
    editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
    const { theme } = useTheme();

    if (!editor) {
        return null;
    }
    // Determine background colors based on theme
    const buttonBaseClass = 'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600';
    const getButtonClass = (isActive: boolean) => {
        const activeBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
        const inactiveBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-transparent';
        return `${buttonBaseClass} ${isActive ? activeBg : inactiveBg}`;
    };

    return (
        <div
            className={`px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-700'}`}
        >
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={getButtonClass(editor.isActive("bold"))}
                >
                    <Bold className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={getButtonClass(editor.isActive("italic"))}
                >
                    <Italic className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={getButtonClass(editor.isActive("strike"))}
                >
                    <Strikethrough className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={getButtonClass(editor.isActive("heading", { level: 2 }))}
                >
                    <Heading2 className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={getButtonClass(editor.isActive("bulletList"))}
                >
                    <List className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={getButtonClass(editor.isActive("orderedList"))}
                >
                    <ListOrdered className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={getButtonClass(editor.isActive("undo"))}
                >
                    <Undo className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={getButtonClass(editor.isActive("redo"))}
                >
                    <Redo className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
