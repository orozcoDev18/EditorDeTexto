import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./style.css";

const App = ({ placeholder }: { placeholder?: string }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialContent);

  // Configuración del editor
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Escribe aquí...",
    }),
    [placeholder]
  );

  // Función para limpiar el editor
  const clearEditor = () => {
    setContent("");
  };

  // Función para limpiar el contenido HTML generado
  const clearHTMLContent = () => {
    setContent("");
  };

  // Función para descargar el contenido como HTML
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "contenido.html";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Editor de texto */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
        className="jodit-editor"
      />

      {/* Contenido generado */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>Código HTML generado:</h2>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            overflowX: "auto",
            color: "black",
          }}
        >
          {content}
        </pre>

        {/* Botones de limpieza y descarga */}
        <div
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "25%",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={clearEditor}
          >
            Limpiar Editor
          </button>
          <button
            style={{
              width: "35%",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={clearHTMLContent}
          >
            Limpiar Contenido HTML
          </button>
          <button
            style={{
              width: "30%",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleDownload}
          >
            Descargar HTML
          </button>
        </div>
      </div>
    </div>
  );
};

const initialContent = "";

export default App;
