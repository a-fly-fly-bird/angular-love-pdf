import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { BehaviorSubject, Observable, from } from 'rxjs';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfMergeService {
  public pdfObserverable$ = from(this.mergePdf());

  public pdf2$ = from(this.merge2demo());

  constructor() {}

  async mergePdf() {
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page
    const fontSize = 30;
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  async merge2demo() {
    let doc = new jsPDF();
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('Some text', 15, 20);
    doc.addPage();
    let arrayB = doc.output('arraybuffer');
    const pdfDoc = await PDFDocument.create();
    const firstDoc = await PDFDocument.load(arrayB);
    const firstPage = await pdfDoc.copyPages(
      firstDoc,
      firstDoc.getPageIndices(),
    );
    firstPage.forEach((page) => pdfDoc.addPage(page));
    firstPage.forEach((page) => pdfDoc.addPage(page));
    const pdfBytes = await pdfDoc.save();
    let file = new Blob([pdfBytes], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    return fileURL;
  }
}
