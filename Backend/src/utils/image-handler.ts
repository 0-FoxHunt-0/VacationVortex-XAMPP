import { UploadedFile } from "express-fileupload";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import dal from "./dal";

const vacationImagesFolder = "./src/assets/images/vacations/";

// Save new image:
async function saveImage(image: UploadedFile): Promise<string> {
  // Create unique image name:
  const uniqueImageName = createImageName(image.name);

  // Create absolute page:
  const absolutePath = vacationImagesFolder + uniqueImageName;

  // Save to disk:
  await image.mv(absolutePath); // mv = move

  // Return new name:
  return uniqueImageName;
}

// Update existing image:
async function updateImage(
  image: UploadedFile,
  existingImageName: string
): Promise<string> {
  // Delete existing image:
  await deleteImage(existingImageName);

  // Save new image to disk:
  const uniqueImageName = await saveImage(image);

  // Return unique name:
  return uniqueImageName;
}

// Delete existing image:
async function deleteImage(existingImageName: string): Promise<void> {
  try {
    // If no image sent:
    if (!existingImageName) return;

    // Delete image from disk:
    await fsPromises.unlink(vacationImagesFolder + existingImageName);
  } catch (err: any) {
    console.error(err.message);
  }
}

async function getImageUrlFromDB(id: number): Promise<string> {
  const sql = `
      SELECT imageName FROM vacations
      WHERE vacationId = ${id}
      `;
  const vacations = await dal.execute(sql);
  const vacation = vacations[0];

  // Return image name
  return vacation.imageName;
}

function createImageName(originalImageName: string): string {
  // Take original extension:
  const extension = originalImageName.substring(
    originalImageName.lastIndexOf(".")
  );

  // Create unique name including original extension (v4 = 36 chars uuid):
  const uniqueImageName = uuid() + extension;

  // Return unique name:
  return uniqueImageName;
}

function getAbsolutePath(imageName: string): string {
  let absolutePath = path.join(
    __dirname,
    "..",
    "assets",
    "images",
    "vacations",
    imageName
  );
  if (!fs.existsSync(absolutePath)) {
    absolutePath = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "not-found.png"
    );
  }
  return absolutePath;
}

export default {
  saveImage,
  updateImage,
  deleteImage,
  getAbsolutePath,
  getImageUrlFromDB,
};
