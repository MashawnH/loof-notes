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
          <Col style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto'}} className={"bg-light border"} xs="3" widths={['xs']}>
            <NoteHeader />
          </Col>
          <Col style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto'}} className="bg-light border">
            <NoteBody />
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default NotesMainView;