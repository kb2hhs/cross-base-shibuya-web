from PIL import Image

def resize_image(image_path, max_width=1920, max_height=1080):

    """Resizes an image, maintaining aspect ratio. """
    try:
        img = Image.open(image_path)

def process_images(source_dir, max_width=1920, max_height=1080):
    """Resizes images in source directory."""

    for filename in os.listdir(source_dir):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(source_dir, filename)

            # Get original image info
            original_img = Image.open(filepath)
            original_width, original_height = original_img.size
            original_size = os.path.getsize(filepath)
            original_size_kb = original_size / 1024

            resized_img = resize_image(filepath, max_width, max_height)
            if resized_img:
                name, ext = os.path.splitext(filename)
                resized_path = os.path.join(source_dir, f'{name}_resized{ext}')
                resized_img.save(resized_path)

                # Get resized image info
                resized_width, resized_height = resized_img.size
                resized_size = os.path.getsize(resized_path)
                resized_size_kb = resized_size / 1024

                print(f"Resized: {filename} ({original_width}x{original_height}, {original_size_kb:.2f} KB) -> {resized_path} ({resized_width}x{resized_height}, {resized_size_kb:.2f} KB)")

    print("Finished resizing images.")
    
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        sys.exit(1)
    process_images(source_dir)
