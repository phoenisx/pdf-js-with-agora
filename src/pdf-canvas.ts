import * as PDF from "pdfjs-dist";
import PDFWorkerSrc from "pdfjs-dist/build/pdf.worker.js?url";
import { RenderParameters } from "pdfjs-dist/types/display/api";

import PDFDocSrc from "./example.pdf?url";

PDF.GlobalWorkerOptions.workerSrc = PDFWorkerSrc;
const DPR = window.devicePixelRatio || 1;;

const app$ = document.querySelector<HTMLDivElement>("#app")!;

export const generatePDF = async () => {
  const document$ = PDF.getDocument(PDFDocSrc);

  const doc = await document$.promise;
  const page1 = await doc.getPage(1);
  const CANVAS_WIDTH = window.innerWidth;
  let docViewport = page1.getViewport({ scale: 1.2 });
  const RATIO = CANVAS_WIDTH / docViewport.width;
  docViewport = page1.getViewport({ scale: RATIO, });

  const canvas$ = app$.querySelector<HTMLCanvasElement>("#pdf > canvas")!;

  const ctx = canvas$.getContext('2d')!;
  ctx.scale(DPR, DPR);
  // canvas$.height = docViewport.height * 1.5; // Having more height does not do anything will add blank space.
  canvas$.height = docViewport.height;
  canvas$.width = docViewport.width;

  const renderContext: RenderParameters = {
    canvasContext: ctx,
    viewport: docViewport
  };
  page1.render(renderContext);
}

