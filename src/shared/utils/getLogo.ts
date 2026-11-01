import fs from "fs";
import path from "path";
export default function getLogo() {
  const filePath = path.join(process.cwd(), "public/images/logosbw.png");
  const img = fs.readFileSync(filePath);

  return `data:image/png;base64,${img.toString("base64")}`;
}
