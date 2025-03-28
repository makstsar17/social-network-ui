const MAX_FILE_SIZE = 1048576;

const validFileExtensions = ['image/jpg', 'image/png', 'image/jpeg'];

export const isValidFileType = (file: File) => {
    return validFileExtensions.includes(file.type);
}

export const isVaildFileSize = (file: File) => {
    return file.size <= MAX_FILE_SIZE;
}