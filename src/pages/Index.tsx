import { useCallback, useState } from "react";
import { FileResponse, uploadFile } from "../api/fileApi";
import styles from "./Index.module.css";
import { useDropzone } from "react-dropzone";
import Divider from "../components/layout/Divider";
import DropZone from "../components/Dropzone/DropZone";
import { toast } from "sonner";
import { FILE_DOWNLOAD_URL } from "../config";


const Index: React.FC = () => {
    const [files, setFiles] = useState<FileResponse[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            try {
                const response = await uploadFile(file);
                toast(`파일 업로드 성공! 다운로드 URL이 복사되었습니다.`);
                copyDownloadUrl(response);
                setFiles((prev) => [...prev, response]);
            } catch (error) {
                toast("파일 업로드 실패");
                console.error(error);
            }
        }
    }, []);

    const copyDownloadUrl = (file: FileResponse) => {
        navigator.clipboard.writeText(`${FILE_DOWNLOAD_URL}/${file.stored}`);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className={styles.container}>
            <div className={styles.dropzoneContainer} >
                <DropZone className={styles.dropzoneWrapper} rootProps={getRootProps()} inputProps={getInputProps()} isDragActive={isDragActive} />
            </div>
            <Divider type="horizontal" thickness={1} color="black" />
            {/* divider */}
            {/* file list */}
        </div>
    )
}

export default Index