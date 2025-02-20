import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile, getFileList, downloadFile, FileResponse } from "../api/fileApi";
import { API_BASE_URL } from "../config";

const FileManager: React.FC = () => {

  const [files, setFiles] = useState<FileResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  // 파일 업로드 핸들러
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        const response = await uploadFile(file);
        setDownloadLink(`${API_BASE_URL}/download/${response.stored}`); // 다운로드 링크 설정
        setIsModalOpen(true); // 모달 열기
      } catch (error) {
        alert("파일 업로드 실패");
        console.error(error);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // 파일 목록 불러오기
  const fetchFiles = async () => {
    try {
      const data = await getFileList();
      setFiles(data);
    } catch (error) {
      console.error("파일 목록을 불러오지 못했습니다.", error);
    }
  };

  // 마운트 시 파일 목록 가져오기
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      {/* 드래그 앤 드롭 영역 */}
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>여기에 파일을 놓아 업로드하세요...</p> : <p>파일을 드래그하거나 클릭하여 업로드하세요</p>}
      </div>

      {/* 파일 목록 */}
      <div className="file-list">
        <h3>파일 목록</h3>
        {files.length === 0 ? (
          <p>업로드된 파일이 없습니다.</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.stored} onClick={() => downloadFile(file.stored)}>
                {file.original} (다운로드)
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 업로드 성공 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>업로드 성공!</h3>
            {downloadLink && (
              <>
                <p>
                  <button onClick={() => {
                    window.open(downloadLink, '_blank');
                  }}>
                    업로드한 파일 다운로드
                  </button>
                </p>
                <p>
                  <button onClick={() => {
                    navigator.clipboard.writeText(downloadLink);
                    alert('링크가 복사되었습니다!');
                  }}>
                    링크 복사
                  </button>
                </p>
              </>
            )}
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FileManager;
