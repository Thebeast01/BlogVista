// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Menubar from "./Menubar";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import { useEffect } from "react";
 
// interface TextEditorProps{
//   content:string
//   onChange:(content:string)=>void
// }
// const Tiptap = ({content,onChange}:TextEditorProps) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           HTMLAttributes: {
//             class: "list-disc ml-3",
//           },
//         },
//         orderedList: {
//           HTMLAttributes: {
//             class: "list-decimal ml-3",
//           },
//         },
//       }),

//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//         alignments: ["left", "right", "center", "justify"],
//       }),
//       Highlight.configure({
//         HTMLAttributes:{
//            class:"hover:bg-red-500"
//         }
//       }),
//     ],
//     content: content,
//     editorProps: {
//       attributes: {
//         class:
//           "min-h-[150px] border rounded-md bg-slate-600 py-2 px-3 text-white ",
//       },
//     },
//     onUpdate:({editor})=>{
//       onChange(editor.getHTML())
//       // console.log(editor.getHTML())
//     }
//   });
//   useEffect(()=>{
//     if(editor && editor.getHTML()!==content){
//       editor.commands.setContent(content)
//     }
//   },[content,editor])
//   if(!editor) return null
//   return (
//     <>
    
//       <Menubar editor={editor} />
//       <EditorContent editor={editor} />
//     </>
//   );
// };

// export default Tiptap;








"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import Menubar from "./Menubar";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-4" },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-zinc-500 text-black",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] focus:outline-none bg-zinc-900 text-zinc-100 p-4 rounded-md border border-zinc-700 prose prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
