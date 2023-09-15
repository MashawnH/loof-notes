import React, { FC } from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import ExampleTheme from "../themes/ExampleTheme";
// import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer";
// import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// // import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import EmoticonPlugin from "./plugins/EmoticonPlugin";
// import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
// import editorConfig from "./editorConfig";
// import onChange from "./onChange";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "../plugins/ToolbarPlugin";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
// import { ListItemNode, ListNode } from "@lexical/list";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import { TRANSFORMERS } from "@lexical/markdown";
// import "../../styles.css";
// import Editor from '../Editor/Editor';

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

// function Placeholder() {
//   return <div className="editor-placeholder">Enter some rich text...</div>;
// }

// const editorConfig: any= {
//   // The editor theme
//   theme: ExampleTheme,
//   // Handling of errors during update
//   onError(error: any) {
//     throw error;
//   },
//   // Any custom nodes go here
//   nodes: [
//     HeadingNode,
//     ListNode,
//     ListItemNode,
//     QuoteNode,
//     CodeNode,
//     CodeHighlightNode,
//     TableNode,
//     TableCellNode,
//     TableRowNode,
//     AutoLinkNode,
//     LinkNode
//   ]
// };

// export default function Editor() {
//   return (
//     <LexicalComposer initialConfig={editorConfig}>
//       <div className="editor-container">
//         <ToolbarPlugin />
//         <div className="editor-inner">
//           <RichTextPlugin
//             contentEditable={<ContentEditable className="editor-input" />}
//             placeholder={<Placeholder />}
//             ErrorBoundary={LexicalErrorBoundary}
//           />
//           {/* <HistoryPlugin /> */}
//           {/* <TreeViewPlugin /> */}
//           {/* <AutoFocusPlugin /> */}
//           {/* <CodeHighlightPlugin /> */}
//           {/* <ListPlugin /> */}
//           {/* <LinkPlugin /> */}
//           {/* <AutoLinkPlugin /> */}
//           {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
//           <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
//         </div>
//       </div>
//     </LexicalComposer>
//   );
// }

const NoteBody: FC = () => {


    return (
      <div> hello </div>
    );
    // const [editorState, setEditorState] = React.useState(
    //     () => EditorState.createEmpty(),
    //   );


    // return (
    //     <>
    //         <div>
    //             Testing
    //             {/* {text} */}
    //             <Editor editorState={editorState} onChange={setEditorState} />
    //         </div>
    //     </>
    // );
}

export default NoteBody;