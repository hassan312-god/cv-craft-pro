import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getTemplateComponent } from "@/lib/templateConfig";
import type { CVData } from "@/pages/CVCreate";

/**
 * Génère un PDF A4 fidèle à l'aperçu du CV (rendu hors écran à 794px de large,
 * soit 210mm à 96 DPI), puis le télécharge.
 */
export const exportCVToPDF = async (cvData: CVData): Promise<string> => {
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "fixed";
  tempContainer.style.left = "-9999px";
  tempContainer.style.top = "0";
  tempContainer.style.width = "794px";
  tempContainer.style.backgroundColor = "white";
  tempContainer.style.zIndex = "-1";
  document.body.appendChild(tempContainer);

  const React = await import("react");
  const ReactDOM = await import("react-dom/client");
  const TemplateComponent = getTemplateComponent(cvData.template || "minimal");
  const root = ReactDOM.createRoot(tempContainer);
  root.render(React.createElement(TemplateComponent, { cvData }));

  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const cvElement = (tempContainer.querySelector('div[style*="794px"]') ||
      tempContainer.firstElementChild) as HTMLElement | null;

    if (!cvElement) {
      throw new Error("Impossible de trouver le contenu du CV");
    }

    cvElement.style.display = "block";
    cvElement.style.visibility = "visible";
    cvElement.style.position = "relative";

    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      width: 794,
      height: cvElement.scrollHeight || 1123,
      scrollX: 0,
      scrollY: 0,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas vide - le CV n'a pas pu être capturé");
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight + 5) {
      pdf.addImage(canvas.toDataURL("image/png", 1.0), "PNG", 0, 0, pdfWidth, imgHeight);
    } else {
      let remaining = imgHeight;
      let yOffset = 0;
      let page = 0;

      while (remaining > 0) {
        if (page > 0) pdf.addPage();

        const heightOnPage = Math.min(remaining, pdfHeight);
        const sourceY = (yOffset / imgHeight) * canvas.height;
        const sourceHeight = (heightOnPage / imgHeight) * canvas.height;

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
          pdf.addImage(pageCanvas.toDataURL("image/png", 1.0), "PNG", 0, 0, pdfWidth, heightOnPage);
        }

        remaining -= pdfHeight;
        yOffset += pdfHeight;
        page++;

        if (remaining > 0 && remaining < 20) break;
      }
    }

    const fileName = `${cvData.firstName || "CV"}_${cvData.lastName || "Pro"}_CV.pdf`;
    pdf.save(fileName);
    return fileName;
  } finally {
    root.unmount();
    if (tempContainer.parentNode) document.body.removeChild(tempContainer);
  }
};
