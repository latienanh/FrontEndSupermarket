function getFileSize(fileSizeInBytes: number) {
    if (fileSizeInBytes >= 1024 ** 3) {
        return (fileSizeInBytes / 1024 ** 3).toFixed(2) + ' GB';
    } else if (fileSizeInBytes >= 1024 ** 2) {
        return (fileSizeInBytes / 1024 ** 2).toFixed(2) + ' MB';
    } else if (fileSizeInBytes >= 1024) {
        return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    } else {
        return fileSizeInBytes + ' bytes';
    }
}
export default getFileSize;
