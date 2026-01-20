import puppeteer from "puppeteer";

export const generateResumePDF = async (htmlString) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlString, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
};
