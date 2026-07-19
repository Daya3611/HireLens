"use client";

/**
 * Browsers natively support "Print to PDF" which renders vector-perfect PDFs.
 * This is the most robust method as it supports all CSS (including lab/oklch, grid, flex)
 * and accessible text selection.
 */
export function printPDF() {
  window.print();
}
