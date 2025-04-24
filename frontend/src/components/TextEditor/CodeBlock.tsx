
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

export default function CodeBlockComponent(props: NodeViewProps) {
  const {
    node,
    updateAttributes,
    extension,
  } = props;

  const defaultLanguage = node.attrs.language ?? "null";

  return (
    <NodeViewWrapper className="code-block">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
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

