import { useState } from "react";
import UploadedFile from "../0_models/UploadedFile";
import { uploadFile } from "../api/fileApi";
import { FileResponseDto } from "../1_dto/FileResponseDto";
import { FILE_DOWNLOAD_URL } from "../config";
import { toast } from "sonner";

const useFileUpload = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    // LocalStorage에서 파일 목록을 가져와서 state에 저장
    const initializeFiles = () => { }

    const handleUploadFile = async (file: File) => {
        try {
            const response = await uploadFile(file);
            toast(`파일 업로드 성공! 다운로드 URL이 복사되었습니다.`);
            copyDownloadUrl(response.stored);
            _addFileToList(response, file)
        } catch (error) {
            toast("파일 업로드 실패");
            console.error(error)
        }

    }

    const copyDownloadUrl = (fileUUID: string) => {
        navigator.clipboard.writeText(`${FILE_DOWNLOAD_URL}/${fileUUID}`);
    }

    const _addFileToList = (file: FileResponseDto, fileMeta: File) => {
        const newId = files.length + 1;
        const newUploadedFile: UploadedFile = {
            id: newId,
            fileUUID: file.stored,
            fileName: file.original,
            mimeType: fileMeta.type,
            size: fileMeta.size,
            createdAt: new Date(),
        }

        setFiles((prev) => [...prev, newUploadedFile]);
    }

    return {
        files,
        initializeFiles,
        copyDownloadUrl,
        handleUploadFile,
    }
}

export default useFileUpload