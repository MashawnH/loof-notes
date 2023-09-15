import React, { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NoteHeader from '../NoteHeader/NoteHeader';
import NoteBody from '../NoteBody/NoteBody';
import Editor from '../NoteBody/NoteBody';


const NotesMainView: FC = () => {

    return (
        <>
            <div>Loof Note</div>
            <Container>
                <Row>
                    <Col className="bg-light border">
                        Column
                        <NoteHeader/>
                    </Col>
                    <Col className="bg-light border">
                        Column
                        <NoteBody/>
                        {/* <Editor/> */}
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default NotesMainView;