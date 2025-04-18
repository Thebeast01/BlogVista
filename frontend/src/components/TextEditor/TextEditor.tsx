"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
              }),
              Highlight,
        ],
        content: '<p>Hello World!</p>',
        editorProps:{
            attributes:{
                class:'min-h-[150px] border rounded-md bg-slate-100 py-2 px-3 '
            }
        }
      })    
  return (
    <>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;








