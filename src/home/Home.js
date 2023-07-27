import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function Home() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const [fileNum, setFilesNum] = useState(0);
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

    console.log("env file", process.env.REACT_APP_API_URL_LOCAL);
    const GetFileList = () => {
        // setIsLoading(true);
        axios
            .get(process.env.REACT_APP_API_URL_LOCAL + "/getUploadedFileList", {
                responseType: "json",
            })
            .then(function (response) {
                if (response.data.files) {
                    console.log("get file number");
                    setFilesNum(response.data.files.length);
                }
            });
    }

    useEffect(() => {
        if (fileNum !== 0) {
            const intervalCall = setInterval(() => {
                GetFileList();
            }, 5000);
            return () => {
                clearInterval(intervalCall);
            };
        }
    }, [fileNum]);

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
                                        <a href="/list" style={{ paddingTop: "20px" }}>You have {fileNum} files in data center.</a>
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
