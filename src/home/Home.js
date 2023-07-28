import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function Home() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const [inputQuery, setInputQuery] = useState("");
    // const [counter, setCounter] = useState(0);
    // const [countOfProgess, setCountOfProgess] = useState(0);
    console.log("process.env.REACT_APP_API_URL_LOCAL ", process.env.REACT_APP_API_URL_LOCAL );
    const changeHandler = (event) => {
        setIsSelected(true);
        const chosenFiles = Array.prototype.slice.call(event.target.files)
        setSelectedFiles(chosenFiles);
    };

    async function uploadFiles(formData, data) {
        const response = await axios.post(process.env.REACT_APP_API_URL_LOCAL + "/upload", formData, {});
        if (response.data.files) {
            console.log("file uploaded", data.name);
            // fileArr[selectedFiles.findIndex((el) => el.name === data.name && el.size === data.size)]=true;
            // setCounter(counter + 1);
            // setCountOfProgess(counter + 1);
            // if (counter === selectedFiles.length && selectedFiles.length !== 0){
            // setIsLoading(false);
            // }
        }
        // const response = await fetch('http://localhost:3500/upload-local', {
        //     method: 'POST',
        //     body: formData
        // })
        // const json = await response.json()
        // const h2 = document.querySelector('h2')
        // h2.textContent = `Status: ${json?.status}`
        // const h3 = document.querySelector('h3')
        // h3.textContent = json?.message
        // console.log(json)
    }

    const handleSubmission = () => {
        // setCounter(0);
        // setCountOfProgess(0);
        // setIsLoading(true);
        selectedFiles.forEach(element => {
            const formData = new FormData();
            formData.append('file', element);
            uploadFiles(formData, element);
        });
    }

    const handleQueryChange = (event) => {
        setInputQuery(event.target.value);
    }

    const handleQuerySubmit = () => {
        console.log("handle submit", inputQuery);
        setInputQuery("");
    }

    return (
        <div className="App">
            <Container>
                <header className="App-header">
                    <h4>Step 1: </h4>
                    <Card>
                        <Card.Body>
                            <h3> Please Select Files:</h3>
                            {/* <ProgressBar now={countOfProgess} /> */}
                            <div style={{ marginTop: "30px" }}>
                                <input type="file" name="file" onChange={changeHandler} multiple style={{ paddingBottom: "10px" }} />
                                {isSelected ? (
                                    selectedFiles.length !== 0 && selectedFiles.map((item, index) =>
                                        <>
                                            <div style={{ display: "flex" }}>
                                                <h5>No.{index + 1}: {item.name}</h5><p1 style={{ paddingLeft: "5px", color: "grey" }}>({(Math.round(item.size / 1000000 * 100) / 100).toFixed(2)} MB)</p1>
                                            </div>
                                        </>
                                    )
                                ) :
                                    null
                                }
                                <div style={{ paddingTop: "30px" }}>
                                    <div style={{ display: "flex" }}>
                                        <Button className="button" variant="info" onClick={handleSubmission} style={{ marginRight: "10px" }}>Upload</Button>
                                    </div>

                                    {/* {counter === selectedFiles.length && !isLoading && counter !== 0 ? <h4>All Files Uploaded</h4> : null} */}
                                    {/* {isLoading ?
                                <>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner></> : null} */}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <h4 style={{ marginTop: "40px" }}>Step 2: </h4>
                    <Card>
                        <Card.Body>
                            <Form.Select aria-label="select-industr" style={{ width: "300px" }}>
                                <option>Please select industry:</option>
                                <option value="1">Finance1</option>
                                <option value="2">Finance2</option>
                                <option value="3">Finance3</option>
                            </Form.Select>
                            <Button className="button" variant="info" onClick={handleSubmission}>Prepare</Button>
                        </Card.Body>
                    </Card>
                    <h4 style={{ marginTop: "40px" }}>Step 3: </h4>
                    <Card>
                        <Card.Body>
                            <div>
                                <Form>
                                    <Form.Label>
                                        Query:
                                    </Form.Label>
                                    <Form.Control as="textarea" rows={2} onChange={handleQueryChange} />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Query example: What is the average age of professors who teach Mathematics in weekly schedule?
                                    </Form.Text>
                                    <br></br>
                                    <Button className="button" variant="info" onClick={() => handleQuerySubmit()} style={{ marginRight: "10px" }}>Submit</Button>
                                </Form>
                            </div>
                            
                        </Card.Body>
                    </Card>

                </header>
            </Container>
        </div>
    );
}

export default Home;
