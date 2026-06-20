import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

/**
 * Captures an HTML element by ID and downloads it as a high-resolution A4 PDF.
 * Clones the element off-screen to bypass transform scales and layout constraints.
 */
export async function generatePDF(elementId: string, filename: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found in DOM.`);
    return false;
  }

  // Create an off-screen clone of the target element to get clean 1:1 layout sizing
  const clone = element.cloneNode(true) as HTMLDivElement;
  
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.width = '794px'; // Standard A4 pixel width at 96 DPI
  clone.style.height = 'auto';
  clone.style.transform = 'none'; // Strip scale transforms that confuse html2canvas
  clone.style.opacity = '1';
  clone.style.visibility = 'visible';
  clone.style.boxSizing = 'border-box';
  
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2.0, // High quality DPI multiplier
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
    });

    // Cleanup clone immediately
    document.body.removeChild(clone);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    if (canvasWidth === 0 || canvasHeight === 0 || isNaN(canvasWidth) || isNaN(canvasHeight)) {
      console.error("Canvas generation returned invalid dimensions.");
      return false;
    }

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Handle multi-page content gracefully
    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // Shift page offset
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (clone.parentNode) {
      document.body.removeChild(clone);
    }
    return false;
  }
}
export default generatePDF;
