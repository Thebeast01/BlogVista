/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"

import axios from "axios"
import { Input } from "@/components/ui/input"
import { API_URL } from "@/config"
import Swal from "sweetalert2"
import Loading from "@/app/loading"

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  // onSubmit,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  onSubmit: () => void
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)
interface PostData {
  title: string;
  content: any;
  coverImg?: any
}
export function SimpleEditor() {
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<PostData>({
    title: '',
    content: null,
    coverImg: null,
  })
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: data.content,
  })

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])
  const handleSubmit = async () => {
    if (editor) {
      const json = editor.getJSON()
      console.log("Data of the :", data)
      const payload = {
        ...data,
        content: json,
      }
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", JSON.stringify(payload.content));
      if (payload.coverImg) {
        formData.append("coverImg", payload.coverImg);
      }
      console.log("Payload to be sent:", payload);
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/post/createPost`, formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log("Response from server:", response.data)
      setIsLoading(false);
      if (response.status === 201) {
        Swal.fire({
          title: "Post Created",
          text: "Your post has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        })
        console.log("Post created successfully")
      } else {
        console.error("Failed to create post:", response.data)
      }

    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);

    if (!selectedFile) {
      console.warn('No file selected');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Only PNG, JPEG, or WEBP files are allowed.');
      return;
    }



    // Update state
    setData(prev => ({
      ...prev,
      coverImg: selectedFile
    }));
  };
  return (
    <>
      {
        isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Loading />
          </div>
        )
      }
      <EditorContext.Provider value={{ editor }} >
        <div className="flex flex-col md:flex-row justify-between px-8 gap-4 items-center w-full my-2">
          <div className="flex flex-col w-full  gap-2 ">
            <Input type="text" placeholder="Title of the article" className=" mx-auto border-1 border-neutral-500 placeholder:text-2xl placeholder:font-serif placeholder:font-medium  max-w-2xl py-2  h-14 " onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div className="flex  gap-3 items-center">
            <label className="inline-block cursor-pointer  min-w-54 bg-black text-white px-4 py-3 rounded-md hover:bg-neutral-900 transition duration-200">
              Choose Cover Image
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button className="bg-foreground text-background px-6 py-3 rounded-md font-medium " onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <Toolbar
          ref={toolbarRef}
          className={`tiptap-toolbar ${isMobile ? "mobile" : ""}`}
          style={
            isMobile
              ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
              }
              : {}
          }

        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
              onSubmit={handleSubmit}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="content-wrapper h-full w-full ">
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content  "
          />
        </div>
      </EditorContext.Provider >
      {/* <Button className="h-10 w-20 " onClick={handleSubmit}>Submit</Button> */}
    </>
  )
}
