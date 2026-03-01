import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  pageNumber: number;
  numPages: number | null;
  pdfError: string | null;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PDFViewer = ({
  pdfUrl,
  pageNumber,
  numPages,
  pdfError,
  onPrevPage,
  onNextPage,
}: PDFViewerProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <Document
          file={pdfUrl}
          loading="Loading PDF..."
          onLoadError={() => console.error("Failed to load PDF")}
        >
          <Page pageNumber={pageNumber} width={600} />
        </Document>
        {pdfError && <p className="text-destructive mt-2">{pdfError}</p>}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <Button
          onClick={onPrevPage}
          disabled={pageNumber <= 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {pageNumber}
          {numPages ? ` of ${numPages}` : ""}
        </span>
        <Button
          onClick={onNextPage}
          disabled={numPages ? pageNumber >= numPages : true}
          variant="outline"
        >
          Next
        </Button>
      </div>
      <a
        href={pdfUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        <Download className="w-5 h-5" />
        <span>Download PDF</span>
      </a>
    </div>
  );
};

export default PDFViewer;
