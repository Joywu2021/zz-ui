import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function List() {
    // const [selectedFiles, setSelectedFiles] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     GetFileList();
    // }, []);

    // const GetFileList = () => {
    //     setIsLoading(true);
    //     axios
    //         .get(process.env.REACT_APP_API_URL_LOCAL + "/getUploadedFileList", {
    //             responseType: "json",
    //         })
    //         .then(function (response) {
    //             if (response.data.files) {
    //                 setSelectedFiles(response.data.files);
    //                 setIsLoading(false);
    //             }
    //         });
    // }

    async function deleteFiles(id) {
        const response = await axios.delete(process.env.REACT_APP_API_URL_LOCAL + "/delete/" + id + "?_method=DELETE", {});
        if (response.data.files) {
            window.location = '/list';
            window.location.reload();
        }
    }

    // const handleDelete = (id) => {
    //     deleteFiles(id);
    // }

    return (
        <div className="App">
            <Container>
                <header className="App-header">
                    <h3> Uploaded Files:</h3>
                    <div style={{ marginTop: "30px" }}>
                        {/* {!isLoading ? (
                            selectedFiles.length !== 0 && selectedFiles.map((item, index) =>
                                <div style={{ display: "flex", paddingBottom: "10px" }}>
                                    <div style={{ display: "flex" }}>
                                        <h5>No.{index + 1}: {item.filename}</h5><p1 style={{ paddingLeft: "5px", color: "grey" }}>({(Math.round(item.length / 1000000 * 100) / 100).toFixed(2)} MB)</p1></div>
                                    <div>
                                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(item._id)} style={{ marginLeft: "15px", height: "90%" }}>Delete</Button></div>
                                </div>
                            )
                        ) :
                            null
                        }
                        {selectedFiles.length === 0 && <h4>Empty List</h4>} */}
                    </div>
                </header>
            </Container>
        </div>
    );
}

export default List;
