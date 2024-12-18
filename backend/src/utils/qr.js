import QRCode from 'qrcode';
export const qrcodegen = async (data, path) => {
    try {
        const qrdata = JSON.stringify(data);
        await QRCode.toFile(path, qrdata);
    } catch (error) {
        console.log(`error while gerating qrcode ${error}`);
        throw new Error(400, 'error while gerating qrcode');
    }
};
