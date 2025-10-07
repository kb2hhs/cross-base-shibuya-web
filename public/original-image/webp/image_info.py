import os
from PIL import Image

def get_image_info(image_dir):
    """
    Retrieves the image size and file size of each image in the given directory.

    Args:
        image_dir (str): Path to the directory containing the images.
    """

    for filename in os.listdir(image_dir):
        if filename.endswith('.webp'):
            filepath = os.path.join(image_dir, filename)
            try:
                img = Image.open(filepath)
                width, height = img.size
                file_size = os.path.getsize(filepath)
                file_size_kb = file_size / 1024  # Convert to KB

                print(f"File: {filename}")
                print(f"  Size: {width}x{height}")
                print(f"  File Size: {file_size_kb:.2f} KB")
                print("-" * 30)

            except FileNotFoundError:
                print(f"Error: File not found: {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    image_dir = '/home/kb2hhs/minpaku2/cross-base-shibuya-project/public/original-image/webp'
    get_image_info(image_dir)
    print("Finished processing all images.")
