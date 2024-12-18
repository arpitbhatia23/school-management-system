export const drawRoundImage = async (doc, imgPath, x, y, diameter) => {
    // First, draw the circle as a mask
    doc.save(); // Save the current state

    doc.circle(x + diameter / 2, y + diameter / 2, diameter / 2); // Draw circle
    doc.clip(); // Apply the clipping mask

    // Now place the image, which will be clipped into the circle shape
    doc.image(imgPath, x, y, { width: diameter, height: diameter });

    doc.restore(); // Restore the state, so subsequent drawings are not clipped
};
