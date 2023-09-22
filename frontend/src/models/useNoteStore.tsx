/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const NOTES_API = "http://localhost:8080/notes"

export interface NoteData {
  id: string
  title: string
  body: string
}

// Define the custom hook
function useNoteStore() {

  const [notes, setNotes] = useState<{ [id: string]: NoteData }>({});
  const [activeNote, setActiveNote] = useState<string>("");


  useEffect(() => {

    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(NOTES_API); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        const newNotes: { [id: string]: NoteData } = {}
        jsonData?.forEach((element: NoteData) => {
          newNotes[element.id] = element
        });

        if (jsonData) {
          setNotes(newNotes)
        }
        else {
          console.log("No Notes Data")
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    console.log("testing keys", Object.keys(notes).length)

    if (Object.keys(notes) !== undefined && Object.keys(notes).length && !(activeNote.length)) {
      setActiveNote(Object.keys(notes)[0]?.toString())
    }

    // Call the fetchData function
    fetchData();
  }, [activeNote]); // Empty dependency array means this effect runs once, similar to componentDidMount

  // useEffect(() => {
  //   console.log("activenote", activeNote, notes, Object.keys(notes)[0])
  //   if (!Object.keys(notes).length && !(activeNote.length)) {
  //     setActiveNote(Object.keys(notes)[0]?.toString())
  //   }
  // }, [notes])

  return { notes, setNotes, activeNote, setActiveNote };
}

export default useNoteStore;
