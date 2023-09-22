import React, { FC } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import { createEditor, $getRoot } from 'lexical';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { NoteData } from '../../models/useNoteStore';

interface NoteHeaderProps {

  noteStore: {
    notes: {
      [id: string]: NoteData;
    };
    setNotes: React.Dispatch<React.SetStateAction<{
      [id: string]: NoteData;
    }>>;
    activeNote: string;
    setActiveNote: React.Dispatch<React.SetStateAction<string>>;
  }
}

const NoteHeader: FC<NoteHeaderProps> = ({ noteStore}) => {


  const noteOnClick = (index: string) => {
    noteStore.setActiveNote(index);
  };

  function createNoteOnClick() {
    var newNotes: { [id: string]: NoteData; } = noteStore.notes
    const noteLength: string = Object.keys(newNotes).length.toString()
    var newNote: NoteData = {
      id: noteLength,
      title: "New Note",
      body: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"testing","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
    }

    newNotes[noteLength] = newNote
    noteStore.setNotes(newNotes)
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

        {Object.keys(noteStore.notes).length && <ListGroup>
          {Object.keys(noteStore.notes).map((index) => {
            console.log("testing keys", noteStore.notes, index, noteStore.notes[index])
            console.log("testing note", noteStore.notes)
            if (!noteStore.notes[index]) {
              return;
            }
            return (
              <div>

                <ListGroupItem
                  key={index}
                  onClick={() => noteOnClick(index)}
                  active={noteStore.activeNote === index}
                >
                  <b>{noteStore.notes[index].title}</b>
                  <br />
                  {createEditor().parseEditorState(JSON.parse(noteStore.notes[index].body as string)).read(() => $getRoot().getTextContent())}
                </ListGroupItem>
              </div>
            )
          })}
        </ListGroup>
        }

      </div>
    </>
  );
}

export default NoteHeader;