import { put } from "@vercel/blob";
import fs from "fs";

async function uploadFile() {
  const file = fs.readFileSync("public/images/s1.jpg");
  const { url } = await put("images/s1.jpg", file, { access: "public" });
  console.log("Blob URL:", url);
}
uploadFile();
