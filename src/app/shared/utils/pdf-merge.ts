import { PDFDocument } from 'pdf-lib';

export async function mergePDFDocuments(documents: string[]) {
  const mergedPdf = await PDFDocument.create();

  for (let document of documents) {
    const loaded_document = await PDFDocument.load(document);
    const copiedPages = await mergedPdf.copyPages(
      loaded_document,
      loaded_document.getPageIndices(),
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}
