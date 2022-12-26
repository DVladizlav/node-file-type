export interface IFileType {
  ext: string;
  mime: string;
}

export function fileTypeFromBuffer(buffer: Buffer): IFileType | undefined;

export function fileTypeFromFile(filePath: string): IFileType | undefined;

export function fileType(data: any): IFileType | undefined;

