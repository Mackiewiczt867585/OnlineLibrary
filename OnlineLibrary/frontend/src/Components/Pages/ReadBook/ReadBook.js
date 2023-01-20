import {Document, Page} from "react-pdf/dist/cjs/entry.webpack5";
import React, {useState} from "react";


function ReadBook(){

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const urlParams = new URLSearchParams(window.location.search);
    const pdf_filename = String(urlParams.get("t"));
    const pdf_url = "http://localhost:8000/files/"+pdf_filename;

    function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function pgup() {
        if (pageNumber === 1) setPageNumber(pageNumber);
        setPageNumber( pageNumber + 1);
  }
  function pgdn() {
        if (pageNumber === numPages) setPageNumber(pageNumber);
        setPageNumber(pageNumber - 1);

  }


    return (
        <div className="container row ">
            <div className="col-md-8 border-1">
            <Document className="pdf-page" file={pdf_url} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
                <Page className="pdf-page" width="660" renderAnnotationLayer="false" size="LEGAL" pageNumber={pageNumber} />
            </Document>
            </div>

            <div className="col-md-4">
                <p>Page {pageNumber} of {numPages}</p> <button onClick={pgdn}> Previous Page </button> <button onClick={pgup}>Next Page</button>
            </div>
        </div>
    );
}

export default ReadBook;