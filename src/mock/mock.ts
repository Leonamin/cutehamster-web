import UploadedFile from "../0_models/UploadedFile";

const mockUploadedFiles: UploadedFile[] = [
    {
        id: 1,
        fileUUID: "1234567890",
        fileName: "test1.txt",
        size: 1024,
        mimeType: "text/plain",
        createdAt: new Date()
    },
    {
        id: 2,
        fileUUID: "0987654321",
        fileName: "test2.txt",
        size: 2048,
        mimeType: "text/plain",
        createdAt: new Date()
    }
]

export {
    mockUploadedFiles
}