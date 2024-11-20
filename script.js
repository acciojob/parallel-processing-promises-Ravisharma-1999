// Array of image URLs
const imageUrls = [
    { url: 'https://via.placeholder.com/150' },
    { url: 'https://via.placeholder.com/200' },
    { url: 'https://via.placeholder.com/250' },
    { url: 'https://invalid-url.com/400' }, // Example of an invalid URL
];

// Function to download a single image
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        img.onload = () => resolve(img); // Resolve with the image element on load
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // Reject on error
    });
}

// Function to handle the download button click
document.getElementById('download-images-button').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = 'Loading images...';

    // Download all images in parallel using Promise.all
    const downloadPromises = imageUrls.map(downloadImage);

    Promise.all(downloadPromises)
        .then((images) => {
            outputDiv.innerHTML = ''; // Clear the loading message
            images.forEach((img) => {
                outputDiv.appendChild(img); // Append each downloaded image
            });
  
