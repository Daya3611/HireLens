"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

/**
 * Generates a PDF from a DOM element using html-to-image.
 * This method is robust against modern CSS features like lab()/oklch() colors
 * because it relies on the browser's native rendering engine via SVG foreignObject.
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

    // High resolution for clear text
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 4, // Higher ratio = better quality but larger file
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Handle single page PDF first - can expand for multi-page if needed
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    
    // If content exceeds one page, add pages
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    // If long content
    if (heightLeft > pageHeight) {
        // Reset and do multi-page logic if needed, but for simple resume usually 1 page is target
        // For robust multi-page:
        // This is a naive implementation; better libraries like react-to-print handle paging better
        // but for pure JS generation:
        
        // Re-add first page
        // (Actually, the first addImage above handled page 1)
        
        heightLeft -= pageHeight;
        position -= pageHeight;
        
        while (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
        }
    }

    pdf.save("resume.pdf");
    return true;

  } catch (error) {
    console.error("PDF generation failed:", error);
    return false;
  }
}
