import { useEffect, useState } from 'react';
import { createEditor, $getRoot, $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";


const NOTES_API = "http://localhost:8080/notes"

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
}


function createPostRequestOptions(title, body) {

  const noteData = {
    title: title,
    body: body
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  };

  return requestOptions;
}

export default function Editor({ note }) {

  const [editorState, setEditorState] = useState();
  // const [editorConfig, setEditorConfig] = useState({
  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    editorState: note.body,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  }
  // });

  function onChange(editorState) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));

    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log("Reading");
      console.log(selection);
    });

    fetch(NOTES_API, createPostRequestOptions(note.title, JSON.stringify(editorStateJSON)))
      .then(response => response.json())

    console.log(editorState)

    console.log("This is the editor state", JSON.stringify(editorStateJSON))
  }

  const editor = createEditor()

  // var editorState = "testing editor"

  console.log("Editory body ", note.body)


  // useEffect(() => {

  //   console.log("Calling useEffect", body)
  //   var tmpEditorConfig = {
  //     // The editor theme
  //     theme: ExampleTheme,
  //     // editorState: editor.parseEditorState(JSON.parse(body)),
  //     editorState: body,
  //     // Handling of errors during update
  //     onError(error) {
  //       throw error;
  //     },
  //     // Any custom nodes go here
  //     nodes: [
  //       HeadingNode,
  //       ListNode,
  //       ListItemNode,
  //       QuoteNode,
  //       CodeNode,
  //       CodeHighlightNode,
  //       TableNode,
  //       TableCellNode,
  //       TableRowNode,
  //       AutoLinkNode,
  //       LinkNode
  //     ]
  //   };

  //   // editor.setEditorConfig(tmpEditorConfig)
  //   setEditorConfig(tmpEditorConfig)
  // }, [body])

  // useEffect(() => {
  //   const editor = createEditor()
  //   console.log("Editor this is body", body)
  //   const parsedEditorState = editor.parseEditorState(JSON.parse(body.body));
  //   editorConfig['editorState'] = parsedEditorState
  //   console.log("Editor this is editorConfig", editorConfig)
  // }, [])

  return (
    <LexicalComposer initialConfig={editorConfig} key={note.id}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
