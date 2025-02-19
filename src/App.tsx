import React from "react";
import FileManager from "./components/FileManager";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>파일 업로드 & 다운로드</h1>
      <FileManager />
    </div>
  );
};

export default App;
