"use client";

import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

/**
 * Generates a PDF from a DOM element using html-to-image.
 * Uses JPEG compression and pixelRatio 2 to ensure crystal-clear text quality
 * while maintaining a compact PDF file size (< 1 MB).
 */
export async function generatePDF(elementId: string): Promise<boolean> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return false;
    }

    // Wait for fonts to be ready
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Capture DOM element with pixelRatio 2 (sharp text, small file size)
    const dataUrl = await toJpeg(element, {
      quality: 0.85,
      pixelRatio: 2, // 2x ratio provides high DPI text (~200 DPI) while keeping file size very small (< 1 MB)
      backgroundColor: "#ffffff",
      cacheBust: true,
      filter: (node: Node) => {
        const el = node as HTMLElement;
        if (el.classList && (el.classList.contains("print:hidden") || el.classList.contains("pdf-exclude"))) {
          return false;
        }
        return true;
      }
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let heightLeft = pdfHeight;
    let position = 0;

    // Add first page
    pdf.addImage(dataUrl, "JPEG", 0, position, pdfWidth, pdfHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Handle additional pages if content exceeds 1 page (using a 2mm tolerance to avoid accidental trailing blank pages)
    while (heightLeft > 2) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "JPEG", 0, position, pdfWidth, pdfHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    pdf.save("resume.pdf");
    return true;

  } catch (error) {
    console.error("PDF generation failed:", error);
    return false;
  }
}

