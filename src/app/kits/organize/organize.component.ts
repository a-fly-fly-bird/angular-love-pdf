import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { PDFDocument } from 'pdf-lib';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-organize',
  standalone: true,
  imports: [CommonModule, DragDropModule, FileUploadModule],
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss'],
})
export class OrganizeComponent {
  public uploader: FileUploader = new FileUploader({} as any);
  public hasBaseDropZoneOver: boolean = false;
  public pdfFiles: File[] = [];
  public pdfPreviews: string[] = [];

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public async onFileDrop(item: any): Promise<void> {
    const file = item.some ? item.some : item;

    if (file.type !== 'application/pdf') {
      console.error('Only PDF files are allowed!');
      return;
    }

    this.pdfFiles.push(file);
    const pdfURL = URL.createObjectURL(file);
    this.pdfPreviews.push(pdfURL);
  }

  public async downloadCombinedPDF(): Promise<void> {
    const combinedPdfDoc = await PDFDocument.create();
    for (const pdfFile of this.pdfFiles) {
      const fileData = new Uint8Array(await pdfFile.arrayBuffer());
      const pdfDoc = await PDFDocument.load(fileData);
      const copiedPages = await combinedPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices(),
      );
      copiedPages.forEach((page) => {
        combinedPdfDoc.addPage(page);
      });
    }

    const pdfBytes = await combinedPdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'combined.pdf';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  public moveItemInArray(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.pdfPreviews, event.previousIndex, event.currentIndex);
    moveItemInArray(this.pdfFiles, event.previousIndex, event.currentIndex);
  }
}
