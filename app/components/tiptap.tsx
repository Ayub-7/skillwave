'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './toolbar'

export default function Tiptap({
    description,
    onChange = () => { },
    canEdit,
}: {
    description: string,
    onChange?: (richText: string) => void,
    canEdit: boolean
}) {
    const handleChange = (newContent: string) => {
        onChange(newContent);
    };

    const editor = useEditor({
        extensions: [StarterKit],
        content: description,
        editable: canEdit,
        editorProps: {
            attributes: {
                class: `w-full min-h-[80px] ${canEdit ? 'max-h-[300px] overflow-y-auto resize-y' : ''} bg-transparent text-foreground box-border rounded-medium ${canEdit ? 'border-2 border-default-200 hover:border-default-400 focus:border-default-400' : ''} focus:outline-none py-2 px-3 transition-all duration-200 ease-in-out text-justify`
            },
        },
        onUpdate({ editor }) {
            handleChange(editor.getHTML());
        }
    })

    return (
        <div className="w-full">
            {canEdit && <Toolbar editor={editor} />}
            <EditorContent editor={editor} className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none" />
        </div>
    )
}
