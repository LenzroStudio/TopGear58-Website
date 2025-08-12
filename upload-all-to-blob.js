import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

const imageFiles = [
  "TG_logo_white.png",
  "TG_logo_black.png",
  "LocationQr.png",
  "Hero_img.jpg",
  "sm_Hero.jpg",
  "s1.jpg",
  "s2.jpg",
  "s3.jpg",
  "s4.jpg",
  "s5.jpg",
  "s6.webp",
  "s7.jpg",
  "s8.jpg",
  "s9.jpg",
  "s10.jpg",
  "s11.jpg",
  "s12.jpg",
];

const videoFiles = ["HeroVid.mp4", "hero_vid.mp4"];

async function uploadAll() {
  for (const fileName of imageFiles) {
    const filePath = path.join("public/images", fileName);
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      const { url } = await put(`images/${fileName}`, file, {
        access: "public",
        allowOverwrite: true,
      });
      console.log(`${fileName}: ${url}`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }

  for (const fileName of videoFiles) {
    const filePath = path.join("public/videos", fileName);
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      const { url } = await put(`videos/${fileName}`, file, {
        access: "public",
      });
      console.log(`${fileName}: ${url}`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }
}

uploadAll();
