import React, { FC } from 'react';
import Editor from '../Editor/Editor';

import { NoteData } from '../../models/useNoteStore';

const NoteBody: FC<{note: NoteData}> = ({note}) => {


  console.log("NoteBody", note)
  return (
    <>
    {note && <Editor note={note}></Editor>}
    </>
  );
}

export default NoteBody;