import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { mergePDFDocuments } from 'src/app/shared/utils/pdf-merge';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-merge',
  standalone: true,
  imports: [CommonModule, NzDividerModule, SafePipe, NzTypographyModule],
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss'],
})
export class MergeComponent {
  private pdfFiles: File[] = [];
  public mergedPdfUrl: string | null = null;

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.pdfFiles = Array.from(input.files);
    }
  }

  async mergePDFs(): Promise<void> {
    if (this.pdfFiles.length < 2) {
      alert('Please select at least two PDF files to merge.');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of this.pdfFiles) {
      const fileData = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileData);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices(),
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    this.mergedPdfUrl = URL.createObjectURL(
      new Blob([mergedPdfBytes], { type: 'application/pdf' }),
    );
  }
}
