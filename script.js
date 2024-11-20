// Array of image URLs
const imageUrls = [
    { url: 'https://picsum.photos/id/237/200/300' },
    { url: 'https://picsum.photos/id/238/200/300' },
    { url: 'https://picsum.photos/id/239/200/300' },
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

// Handle the button click
document.getElementById('download-images-button').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear the output div before loading images

    // Download all images in parallel
    const downloadPromises = imageUrls.map(downloadImage);

    Promise.all(downloadPromises)
        .then((images) => {
            images.forEach((img) => outputDiv.appendChild(img)); // Append each downloaded image
        })
        .catch((error) => {
            outputDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});
