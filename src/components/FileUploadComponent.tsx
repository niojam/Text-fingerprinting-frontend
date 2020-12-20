import React, {ChangeEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {getTextFingerPrintData} from "../common/client/TextFingerprintServiceClient";
import {useMutation} from "react-query";


const FileUploadComponent = () => {

    const [file, setFile] = useState<File>();
    const [textToEncode, setTextToEncode] = useState<string>();
    const [getTextFingerPrintDataMutation] = useMutation(getTextFingerPrintData, {});

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextToEncode(e.target.value);
    };

    const isTxtFile = (fileName: string): boolean => {
        return 'txt' === fileName.substring(fileName.lastIndexOf('.') + 1);
    }

    const onFileChange = (evt: any) => {
        if (evt.target.files?.length) {
            const fileObj = evt.target.files[0];
            if (isTxtFile(fileObj.name)) {
                setFile(fileObj);
            }
        }
    }

    const downloadModifiedFile = (response: Blob) => {
        const blob = new Blob([response]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "FingerPrint";
        link.click();
    }

    const getModifiedFile = async () => {
        if (file && textToEncode) {
            await getTextFingerPrintDataMutation({file, textToEncode}).then((response) => {
                downloadModifiedFile(response?.data);
            })

        }
    }


    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" onChange={onFileChange} label="Select file to modify"/>
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control onChange={onTextChange} as="textarea" rows={3}/>
                </Form.Group>
                <Button variant="primary" onClick={getModifiedFile}>
                    Get modified file
                </Button>
            </Form>
        </div>)
}
export default FileUploadComponent;
