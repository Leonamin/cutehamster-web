// 서버에 업로드한 파일 정보를 담는 인터페이스
interface UploadedFile {
    id: number;
    fileUUID: string;
    fileName: string;
    size: number;
    mimeType: string;
    createdAt: Date;
}

export default UploadedFile;