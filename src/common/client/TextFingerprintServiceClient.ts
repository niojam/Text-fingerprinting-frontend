import axios, {AxiosResponse} from "axios";
import {TextFingerPrintDataRequest} from "../types/types";

export const getTextFingerPrintData = async (
    {file, textToEncode}: TextFingerPrintDataRequest
): Promise<AxiosResponse> => {
    return await axios.post(`/fingerprint`, file, {
        headers: {
            'Content-Type': 'text/plain'
        },
        responseType: 'blob',
        params: {
            text: textToEncode,
        }
    });
};
