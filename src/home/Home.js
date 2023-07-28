import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function Home() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputQuery, setInputQuery] = useState("");
    const [counter, setCounter] = useState(0);
    const [logResult, setLogResult] = useState("");
    const [ queryResult, setQueryResult] = useState("");

    const postLogQuery = () => {
        let data = {
            "inputQuery": "frontend_log",
        }
        fetch("/api", {
             method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
        })
        .then(function (response){ 
            if(response.ok) {  
                response.json() 
                .then(function(response) {
                    console.log("test LOG response",response);
                    setLogResult((logResult) => logResult + response.queryResult);
                });
            }
            else {
                throw Error('Something went wrong');
            }
        })
        .catch(function(error) {
            console.log(error);
        });
      }

    useEffect(() => {
        if(inputQuery !== "" && isLoading && counter > -1) {
            console.log("start log api ", inputQuery, isLoading);
            setTimeout(() => {
                postLogQuery();
                setCounter(counter + 1);
            }, 4000);
        }
        // clearInterval(VAR)
    }, [inputQuery, isLoading, counter]);

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

    const postQuery = (input) => {
        let data = {
            "inputQuery": "frontend_query " + input,
        }
        fetch("/api", {
             method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
        })
        .then(function (response){ 
            if(response.ok) {  
                response.json() 
                .then(function(response) {
                    console.log("test Query POST api response",response);
                    setQueryResult(response.queryResult);
                    setIsLoading(false);
                });
            }
            else {
                setIsLoading(false);
                throw Error('Something went wrong');
            }
        })
        .catch(function(error) {
            console.log(error);
        });
      }

    const handleQuerySubmit = () => {
        setIsLoading(true);
        setQueryResult("");
        setLogResult("");
        postQuery(inputQuery);
    }

    return (
        <div className="App">
            <Container>
                <header className="App-header">
                    <h4>Step 1: </h4>
                    <Card>
                        <Card.Body>
                            <h3> Please Select Files:</h3>
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
                                <div style={{ paddingTop: "20px" }}>
                                    <div style={{ display: "flex" }}>
                                        <Button className="button" variant="info" onClick={handleSubmission} disabled={isLoading} style={{ marginRight: "10px" }}>Upload</Button>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <h4 style={{ marginTop: "40px" }}>Step 2: </h4>
                    <Card>
                        <Card.Body>
                        <Form style={{ width: "300px" }}>
                            <Form.Label>
                                Topic:
                            </Form.Label>
                            <Form.Control as="textarea" rows={1} onChange={handleQueryChange} />
                        </Form>
                            <Button className="button" variant="info" onClick={handleSubmission} disabled={isLoading} style={{ marginTop: "30px" }}>Prepare</Button>
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
                                    <Form.Control as="textarea" rows={1} value={inputQuery} onChange={handleQueryChange} />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Query example: What is the revenue of 2020?
                                    </Form.Text>
                                    <br></br>
                                    <div style={{ display: "flex" , paddingTop:"10px"}}>
                                    <Button className="button" variant="info" onClick={() => handleQuerySubmit()} disabled={isLoading} style={{ marginRight: "10px" }}>Submit</Button> 
                                        <Form.Select aria-label="select-industr" style={{ width: "300px", height: "50px", marginTop: "10px" }}>
                                        <option>Please select industry:</option>
                                        <option value="1">Finance</option>
                                        <option value="2">Nothing</option>
                                    </Form.Select>
                                    </div>
                                </Form>
                            </div>

                        </Card.Body>
                    </Card>
                    <div style={{ display: "flex", marginTop: "40px" }}>
                    <h4>Result: </h4> 
                    {isLoading && <Spinner animation="border" role="status" style={{marginLeft: "20px", marginTop: "-8px"}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}</div>
                    <Card>
                        <Card.Body>
                            {queryResult}
                        </Card.Body>
                    </Card>
                    <h4 style={{ marginTop: "40px" }}>Log: </h4>
                    <Card style={{ marginBottom: "50px" }}>
                        <Card.Body>
                            {logResult}
                        </Card.Body>
                    </Card>
                </header>
            </Container>
        </div>
    );
}

export default Home;
