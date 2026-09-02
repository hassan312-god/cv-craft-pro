import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getTemplateComponent } from "@/lib/templateConfig";
import type { CVData } from "@/pages/CVCreate";

export const exportCVToPDF = async (cvData: CVData): Promise<string> => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.minHeight = "1123px";
  container.style.background = "#ffffff";
  container.style.zIndex = "-1";
  container.style.overflow = "hidden";
  container.style.padding = "0";
  container.style.margin = "0";
  document.body.appendChild(container);

  try {
    const React = await import("react");
    const ReactDOM = await import("react-dom/client");
    const TemplateComponent = getTemplateComponent(cvData.template || "minimal");
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(TemplateComponent, { cvData }));

    await new Promise((resolve) => setTimeout(resolve, 400));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: 1123,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = canvas.height;
    const ctx = pageCanvas.getContext("2d");
    if (!ctx) throw new Error("Impossible de créer le canvas PDF");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    let remainingHeight = imgHeight;
    let offsetY = 0;
    let pageNumber = 0;

    while (remainingHeight > 0) {
      if (pageNumber > 0) pdf.addPage();
      const pageContentHeight = Math.min(remainingHeight, pageHeight);
      const sourceY = (offsetY / imgHeight) * canvas.height;
      const sourceHeight = (pageContentHeight / imgHeight) * canvas.height;

      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.max(1, sourceHeight);
      const sliceCtx = sliceCanvas.getContext("2d");
      if (!sliceCtx) throw new Error("Impossible de préparer la page PDF");
      sliceCtx.fillStyle = "#ffffff";
      sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      sliceCtx.drawImage(pageCanvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);

      pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, pageContentHeight);

      remainingHeight -= pageHeight;
      offsetY += pageHeight;
      pageNumber += 1;
    }

    const fileName = `${cvData.firstName || "CV"}_${cvData.lastName || "Pro"}.pdf`;
    pdf.save(fileName);
    return fileName;
  } finally {
    const rootNode = container.querySelector("#root");
    if (rootNode && rootNode.parentNode) {
      rootNode.parentNode.removeChild(rootNode);
    }
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  }
};
