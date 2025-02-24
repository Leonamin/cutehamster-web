import { useCallback, useEffect } from "react";
import styles from "./Index.module.css";
import { useDropzone } from "react-dropzone";
import DropZone from "../components/Dropzone/DropZone";
import useFileUpload from "../hooks/useFileUpload";
import UploadedFile from "../0_models/UploadedFile";
import { toYYYYMMDD } from "../utils/dateUtils";
import { toFileSize } from "../utils/fileUtils";


interface FileItemProps {
    file: UploadedFile,
    onClickFile: (file: UploadedFile) => void
}

const FileItem = ({
    file,
    onClickFile
}: FileItemProps) => (
    <div className={styles.fileItemTile}>
        <div className={styles.fileItemInfo}>
            <span className={styles.fileNameSpan}>
                {file.fileName}
            </span>
            <span className={styles.fileSizeSpan}>
                {toFileSize(file.size)}
            </span>
            <span className={styles.fileCreatedAtSpan}>
                {toYYYYMMDD(file.createdAt)}
            </span>
        </div>
        <button className={styles.fileUrlCopyButton} onClick={() => onClickFile(file)}>다운로드 URL</button>
    </div>
)

const Index: React.FC = () => {
    const { files, initializeFiles, copyDownloadUrl, handleUploadFile } = useFileUpload();

    useEffect(() => {
        initializeFiles();
    }, [])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            handleUploadFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className={styles.container}>
            <DropZone className={styles.dropzoneContainer} rootProps={getRootProps()} inputProps={getInputProps()} isDragActive={isDragActive} />
            <ul className={styles.fileItemList}>
                {
                    files.map((item) => (
                        <li key={item.id}>
                            <FileItem file={item} onClickFile={(file) => copyDownloadUrl(file.fileUUID)} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Index