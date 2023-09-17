import React, { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NoteHeader from '../NoteHeader/NoteHeader';
import NoteBody from '../NoteBody/NoteBody';

const NotesMainView: FC = () => {

  return (
    <>
      <Container className='text-center'>
        <h2>
          Loof Note
        </h2>
      </Container>

      <Container>
        <Row>
          <Col className="bg-light border">
            <NoteHeader />
          </Col>
          <Col className="bg-light border">
            <NoteBody />
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default NotesMainView;