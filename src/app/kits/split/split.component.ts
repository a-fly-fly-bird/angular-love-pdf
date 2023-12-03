import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFDocument } from 'pdf-lib';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
})
export class SplitComponent {
  private originalPdfFile: File | null = null;
  public splitPdfUrl: string | null = null;
  public startPage: number | null = null;
  public endPage: number | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.originalPdfFile = input.files[0];
    }
  }

  async splitPDF(): Promise<void> {
    if (!this.originalPdfFile || !this.startPage || !this.endPage) {
      alert('Please select a PDF file and specify start and end pages.');
      return;
    }

    const originalPdfData = await this.originalPdfFile.arrayBuffer();
    const originalPdfDoc = await PDFDocument.load(originalPdfData);

    // Validate page numbers
    if (
      this.startPage < 1 ||
      this.endPage > originalPdfDoc.getPageCount() ||
      this.startPage > this.endPage
    ) {
      alert('Invalid page range.');
      return;
    }

    const splitPdf = await PDFDocument.create();
    const pagesToCopy = await splitPdf.copyPages(
      originalPdfDoc,
      Array.from(
        { length: this.endPage - this.startPage + 1 },
        (_, i) => i + (this.startPage ? this.startPage : 0) - 1,
      ),
    );
    pagesToCopy.forEach((page) => splitPdf.addPage(page));

    const splitPdfBytes = await splitPdf.save();
    this.splitPdfUrl = URL.createObjectURL(
      new Blob([splitPdfBytes], { type: 'application/pdf' }),
    );
  }
}
