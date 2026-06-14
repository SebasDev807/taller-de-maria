const urls = [
  "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  "https://res.cloudinary.com/cloud/image/upload/folder/subfolder/image.png",
  "https://res.cloudinary.com/cloud/image/upload/v12345/folder/image.webp"
];

for (const url of urls) {
  const urlParts = url.split('/');
  const uploadIndex = urlParts.findIndex(part => part === 'upload');
  
  if (uploadIndex !== -1) {
    let startIndex = uploadIndex + 1;
    if (urlParts[startIndex].match(/^v\d+$/)) {
      startIndex++;
    }
    
    const publicIdWithExtension = urlParts.slice(startIndex).join('/');
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
    
    console.log(url, "->", publicId);
  }
}
