import { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NoteHeader from '../NoteHeader/NoteHeader';
import NoteBody from '../NoteBody/NoteBody';
import useNoteStore from '../../models/useNoteStore';

const NotesMainView: FC = () => {

  const noteStore = useNoteStore()

  return (
    <>
      <Container className='text-center' key={"title"}>
        <h2>
          Loof Note
        </h2>
      </Container>
      <Container key={"main"}>
        <Row>
          <Col style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto' }} className={"bg-light border"} xs="3" widths={['xs']}>
          <NoteHeader noteStore={noteStore}/>
          </Col>
          <Col style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto' }} className="bg-light border">
            <NoteBody note={noteStore.notes[noteStore.activeNote]} />
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default NotesMainView;