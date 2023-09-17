import { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Card, CardBody } from 'reactstrap';

function NoteTitle() {
  const contentEditable = useRef<HTMLElement | null>(null);
  const [html, setHtml] = useState<string>("New note...");
  const [noteText, setNoteText] = useState<string>("")


  const handleContentChange = (e: any) => {
    setHtml(e.target.value);
  };

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

        {noteText}

      </CardBody>
    </Card>

  );
}

export default NoteTitle;
