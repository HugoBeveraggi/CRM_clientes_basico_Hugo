from PIL import Image
import sys
import os

def convert_to_ico(input_path, output_path):
    try:
        img = Image.open(input_path)
        img.save(output_path, format='ICO', sizes=[(256, 256)])
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    convert_to_ico(sys.argv[1], sys.argv[2])
