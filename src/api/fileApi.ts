import axios from "axios";
import { API_BASE_URL } from '../config';
export interface FileResponse {
  original: string;
  stored: string;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};


// 파일 목록 가져오기
export const getFileList = async (): Promise<FileResponse[]> => {
  const response = await axios.get<FileResponse[]>(`${API_BASE_URL}/files`);
  return response.data;
};

// 파일 다운로드 API
export const downloadFile = async (filename: string): Promise<void> => {
  const response = await axios.get(`${API_BASE_URL}/download/${filename}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
