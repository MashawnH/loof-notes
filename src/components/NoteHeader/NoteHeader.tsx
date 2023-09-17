import React, { FC, useState } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import NoteTitle from '../NoteTitle/NoteTitle';

const NoteHeader: FC = () => {

  const [notes, setNotes] = useState<React.ReactElement[]>([])

  function createNoteOnClick() {
    setNotes([...notes, <NoteTitle/>])
  }

  return (
    <>
      <div>
        <button onClick={createNoteOnClick}>
          <h3>
            <IoCreateOutline />
          </h3>
        </button>

        Create Note

        {notes.map((note, index) => (
          <div key={index}>{note}</div>
        ))
        }

      </div>
    </>
  );
}

export default NoteHeader;