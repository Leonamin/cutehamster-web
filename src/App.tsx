import React from "react";
import FileManager from "./components/FileManager";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>파일 업로드 & 다운로드</h1>
      <FileManager />
    </div>
  );
};

export default App;
