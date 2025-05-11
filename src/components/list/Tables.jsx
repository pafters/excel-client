import React, { useState } from 'react';
import './Tables.css';
import { uploadFile } from '../../router/index';
import { rusToLatin } from '../../hepler/language.helper';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        try {
            const renamedFile = new File([event.target?.files[0]], rusToLatin(event.target?.files[0].name), { type: event.target?.files[0].type });
            const reader = new FileReader();
            reader.readAsDataURL(renamedFile)
            setSelectedFile(renamedFile);
        } catch (e) {
            return e
        }
    };

    const handleFileUpload = async () => {

        const formData = new FormData();
        formData.append('file', selectedFile);
        // добавление параметров
        setSelectedFile(null);
        try {
            const answer = await uploadFile(formData);
            if (answer) {
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="upload-container">

            <div className="btn-file">
                Выбрать файл
                <input type="file"
                    onChange={handleFileChange} />
            </div>

            {selectedFile &&
                <div>
                    <button className="btn-standard"
                        onClick={() => handleFileUpload()}
                    >Обработать</button>
                </div>
            }
        </div >
    );
};

export default FileUpload;