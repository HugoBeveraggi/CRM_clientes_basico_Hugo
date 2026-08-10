import sys

def png_to_ico(png_path, ico_path):
    with open(png_path, 'rb') as f:
        png_data = f.read()

    size = len(png_data)
    
    # Simple ICO header for a 256x256 PNG
    header = b'\x00\x00\x01\x00\x01\x00'
    directory = b'\x00\x00\x00\x00\x01\x00\x20\x00' + size.to_bytes(4, 'little') + (22).to_bytes(4, 'little')
    
    with open(ico_path, 'wb') as f:
        f.write(header)
        f.write(directory)
        f.write(png_data)

if __name__ == '__main__':
    png_to_ico(sys.argv[1], sys.argv[2])
