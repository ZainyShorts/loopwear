const JSZip = require("jszip");
const xmlbuilder = require("xmlbuilder");
const fs = require("fs");

class DocxGenerator {
  constructor() {
    this.zip = new JSZip();
    this.createDocStructure();
  }

  // Step 1: Create the basic structure of the .docx file (ZIP format)
  createDocStructure() {
    // Create word/document.xml (basic content)
    const documentXml = xmlbuilder.create("w:document", { encoding: "UTF-8" })
      .att("xmlns:w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
      .ele("w:body")
      .ele("w:p")
      .ele("w:r")
      .ele("w:t", "Hello, World!")
      .end({ pretty: true });

    // Add the document.xml to the zip file
    this.zip.file("word/document.xml", documentXml);

    // Add minimal styles (styles.xml)
    const stylesXml = xmlbuilder.create("w:styles", { encoding: "UTF-8" })
      .att("xmlns:w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
      .ele("w:style", { "w:type": "paragraph", "w:styleId": "Normal" })
      .ele("w:name", { "w:val": "Normal" })
      .end({ pretty: true });
    
    this.zip.file("word/styles.xml", stylesXml);

    // Create the docProps directory (optional metadata)
    this.zip.folder("docProps");
    this.zip.file("docProps/app.xml", "<xml>Application Data</xml>");
    this.zip.file("docProps/core.xml", "<xml>Core Properties</xml>");
  }

  // Step 2: Add Dynamic Content
  addDynamicContent(data) {
    // Modify the document.xml to replace placeholders with data
    const documentXml = this.zip.file("word/document.xml").async("string");
    documentXml.then(xml => {
      // Replace placeholders (e.g. {{name}}) in the document
      let updatedXml = xml.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "");

      // Update the zip file with the modified document.xml
      this.zip.file("word/document.xml", updatedXml);
    });
  }

  // Step 3: Generate and Save the .docx File
  generateDocx(outputPath) {
    this.zip.generateAsync({ type: "nodebuffer" })
      .then(content => {
        fs.writeFileSync(outputPath, content);
        console.log("Document generated:", outputPath);
      })
      .catch(err => {
        console.error("Error generating document:", err);
      });
  }
}

// module.exports = DocxGenerator;

// const DocxGenerator = require("./DocxGenerator");

const doc = new DocxGenerator();

// Add dynamic content
doc.addDynamicContent({
  name: "John Doe",
  date: "January 1, 2025"
});

// Generate the .docx file
doc.generateDocx("output.docx");

