import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface WatermarkOptions {
  customerName: string;
  customerEmail: string;
  orderId: string;
  date?: string;
}

/**
 * Dynamically stamps personal license watermarks onto every page of a PDF.
 * Uses pdf-lib in pure TypeScript/JavaScript (runs client-side or server-side).
 */
export async function watermarkPdf(
  pdfBufferOrBlob: ArrayBuffer | Uint8Array,
  options: WatermarkOptions
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBufferOrBlob);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const dateStr = options.date || new Date().toISOString().split('T')[0];
  const watermarkText = `Licensed exclusively to ${options.customerName} (${options.customerEmail}) • Order #${options.orderId} • Issued on ${dateStr}`;

  for (const page of pages) {
    const { width } = page.getSize();
    const fontSize = 8.5;
    const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize);
    const x = Math.max(20, (width - textWidth) / 2);
    const y = 18; // 18px from bottom footer

    // Subtle grey footer watermark
    page.drawText(watermarkText, {
      x,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.45, 0.45, 0.45),
    });

    // Subtle diagonal safety watermark in center (opacity via light grey)
    // page.drawText(`LICENSED TO: ${options.customerEmail.toUpperCase()}`, {
    //   x: 100,
    //   y: height / 2,
    //   size: 14,
    //   font: helveticaFont,
    //   color: rgb(0.9, 0.9, 0.9),
    //   rotate: degrees(45),
    // });
  }

  return await pdfDoc.save();
}

/**
 * Triggers a direct browser file download for a watermarked PDF Uint8Array.
 */
export function triggerPdfDownload(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
