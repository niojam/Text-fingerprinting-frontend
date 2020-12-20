import React from 'react';
import {Container} from "react-bootstrap";
import FileUploadComponent from "./components/FileUploadComponent";

function App() {
    return (
        <div className="App">
            <Container>
                <h2 className="text-center">Text FingerPrint</h2>
                <FileUploadComponent/>
            </Container>
        </div>
    );
}

export default App;
