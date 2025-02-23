import axios from "axios";

const API_URL = "http://api-cutehamster.cuteshrew.com"; // 백엔드 서버 주소

export interface FileResponse {
  original: string;
  stored: string;
}

// 파일 업로드 API
export const uploadFile = async (file: File): Promise<FileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<FileResponse>(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// 파일 목록 가져오기
export const getFileList = async (): Promise<FileResponse[]> => {
  const response = await axios.get<FileResponse[]>(`${API_URL}/files`);
  return response.data;
};

// 파일 다운로드 API
export const downloadFile = async (filename: string): Promise<void> => {
  const response = await axios.get(`${API_URL}/download/${filename}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
