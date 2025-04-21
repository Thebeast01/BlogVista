// import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

// export default function CodeBlockComponent({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }){
//     return(
// <>
// <NodeViewWrapper className="code-block">
//     <select contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
//       <option value="null">
//         auto
//       </option>
//       <option disabled>
//         —
//       </option>
//       {extension.options.lowlight.listLanguages().map((lang, index) => (
//         <option key={index} value={lang}>
//           {lang}
//         </option>
//       ))}
//     </select>
//     <pre>
//       <NodeViewContent as="code" />
//     </pre>
//   </NodeViewWrapper>
// </>
//     )
// }





import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";

interface CodeBlockAttributes {
  language: string | null;
}

interface CodeBlockExtension {
  options: {
    lowlight: {
      listLanguages: () => string[];
    };
  };
}

export default function CodeBlockComponent({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: NodeViewProps & {
  node: { attrs: CodeBlockAttributes };
  extension: CodeBlockExtension;
}) {
  return (
    <NodeViewWrapper className="code-block">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage ?? "null"}
        onChange={(event) =>
          updateAttributes({ language: event.target.value })
        }
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}