import os
from PIL import Image

def convert_to_webp(image_path, quality=80):
    """Converts an image to WebP format."""
    try:
        img = Image.open(image_path)
        img.load()
        name, ext = os.path.splitext(image_path)
        output_path = f'{name}.webp'
        img.save(output_path, 'webp', quality=quality)
        return output_path
    except Exception as e:
        print(f"Error converting {image_path} to WebP: {e}")
        return None

def process_images(source_dir, quality=80):
    """Converts images in source directory to WebP."""
    dest_dir = os.path.join(source_dir, 'webp')
    os.makedirs(dest_dir, exist_ok=True)

    for filename in os.listdir(source_dir):
        if filename.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            filepath = os.path.join(source_dir, filename)
            webp_path = convert_to_webp(filepath, quality)
            if webp_path:
                output_path = os.path.join(dest_dir, os.path.basename(webp_path))
                os.rename(webp_path,output_path)

                print(f"Converted: {filename} -> {output_path}")

    print("Finished converting images to WebP.")

if __name__ == "__main__":
    source_dir = '/home/kb2hhs/minpaku2/cross-base-shibuya-project/public/original-image'
    process_images(source_dir)
