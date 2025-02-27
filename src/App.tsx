import React from "react";
import "./App.css";
import Index from "./pages/Index";
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Index />
    </>
  );
};

export default App;
