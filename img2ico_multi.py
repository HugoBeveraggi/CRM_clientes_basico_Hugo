from PIL import Image
import sys
import os

def convert_to_ico(input_path, output_path):
    try:
        img = Image.open(input_path)
        # Generate multiple standard icon sizes for Windows compatibility
        icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
        img.save(output_path, format='ICO', sizes=icon_sizes)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    convert_to_ico(sys.argv[1], sys.argv[2])
