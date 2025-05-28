import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

// @ts-ignore
interface TiptapViewerProps {
  content: any
}

const TiptapViewer: React.FC<TiptapViewerProps> = ({ content }) => {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [
      StarterKit.configure({
        heading: false, // We'll add it separately for better control
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: true }),
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Superscript,
      Subscript,
      TaskList,
      TaskItem,
      Image,
      Blockquote,
      CodeBlock,
      BulletList,
      HorizontalRule,
    ],
  })

  if (!editor) return null

  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto">
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapViewer

