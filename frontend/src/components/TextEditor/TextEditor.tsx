"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import Menubar from "./Menubar";
import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlockComponent from './CodeBlock'
import lowlight from "./lowlight";
interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-4" },
        },
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-zinc-500 text-black",
        },
      }),
      CodeBlockLowlight
        .extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent)
          },
        })
        .configure({ lowlight }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px]  focus:outline-none bg-zinc-900 text-zinc-100 p-4 rounded-md border border-zinc-700 prose prose-invert",
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
      <EditorContent editor={editor} className=" border-1 border-zinc-600 rounded-md   max-h-[500px] overflow-scroll relative" />
    </div>
  );
}







