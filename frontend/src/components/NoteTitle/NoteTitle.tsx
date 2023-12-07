import { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Card, CardBody } from 'reactstrap';
import { createEditor, $getRoot } from 'lexical';

interface NoteTitleProps {
  title?: string
  body?: string
}

function NoteTitle({ title = "New Note...", body = "" }: NoteTitleProps) {
  const contentEditable = useRef<HTMLElement | null>(null);
  const [html, setHtml] = useState<string>(title);

  const handleContentChange = (e: any) => {
    setHtml(e.target.value);
  };

  console.log("note title ", body)
  return (
    <Card>
      <CardBody>
        <b>
          <ContentEditable
            innerRef={contentEditable}
            html={html}
            disabled={false}
            onChange={handleContentChange} // Use handleContentChange instead
            tagName='article'
          />
        </b>

        {createEditor().parseEditorState(JSON.parse(body)).read(() => $getRoot().getTextContent())}

      </CardBody>
    </Card>
  );
}

export default NoteTitle;
