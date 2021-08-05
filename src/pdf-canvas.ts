import * as PDF from "pdfjs-dist";
import PDFWorkerSrc from "pdfjs-dist/build/pdf.worker.js?url";
import { PDFDocumentProxy, RenderParameters } from "pdfjs-dist/types/display/api";

import PDFDocSrc from "./example.pdf?url";

PDF.GlobalWorkerOptions.workerSrc = PDFWorkerSrc;
const DPR = window.devicePixelRatio || 1;;

const app$ = document.querySelector<HTMLDivElement>("#app")!;

const CACHE: {
  document: PDFDocumentProxy | null;
  ratio: number;
  ctx: CanvasRenderingContext2D | null;
} = {
  document: null,
  ratio: 1,
  ctx: null,
}

const MAX_WIDTH = 1280;
const MAX_HEIGHT = MAX_WIDTH * 9 / 16;

const hasNextSection = (pageHeight: number) => {
  const offsetHeight = CACHE.ratio * MAX_HEIGHT;
  const offsetY = pageHeight - offsetHeight;
  return offsetY > 16;
}

async function nextSectionInPage(offsetY: number, pageNumber: number) {
  // Same page different section, if offset is there.
  const page = await CACHE.document!.getPage(pageNumber);
  const docViewport = page.getViewport({ scale: CACHE.ratio, offsetY });

  const renderContext: RenderParameters = {
    canvasContext: CACHE.ctx!,
    viewport: docViewport
  };
  page.render(renderContext);
}

export const generatePDF = async () => {
  const document$ = PDF.getDocument(PDFDocSrc);

  CACHE.document = await document$.promise;
  const page1 = await CACHE.document.getPage(1);
  const CANVAS_WIDTH = Math.min(window.innerWidth, MAX_WIDTH);
  let docViewport = page1.getViewport({ scale: 1 });
  CACHE.ratio = CANVAS_WIDTH / docViewport.width;
  docViewport = page1.getViewport({ scale: CACHE.ratio, });

  const canvas$ = app$.querySelector<HTMLCanvasElement>("#pdf > canvas")!;

  CACHE.ctx = canvas$.getContext('2d')!;
  CACHE.ctx.scale(DPR, DPR);
  // canvas$.height = docViewport.height * 1.5; // Having more height does not do anything will add blank space.
  canvas$.height = MAX_HEIGHT;
  canvas$.width = docViewport.width;

  const renderContext: RenderParameters = {
    canvasContext: CACHE.ctx,
    viewport: docViewport
  };

  page1.render(renderContext);
}

