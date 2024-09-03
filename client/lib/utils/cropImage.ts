const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // to avoid CORS issues
      image.src = url;
    });
  };
  
  interface Crop {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  const getCroppedImg = async (imageSrc: string, crop: Crop): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return reject(new Error('Canvas is empty'));
        }
        (blob as any).name = 'cropped.jpg';
        resolve(blob);
      }, 'image/jpeg');
    });
  };
  
  export default getCroppedImg;
  