import os
import re
import base64
import io
from PIL import Image

def convert_svg_to_webp(svg_path, webp_path):
    print(f"Processing {svg_path} -> {webp_path}...")
    if not os.path.exists(svg_path):
        print(f"Error: {svg_path} does not exist.")
        return False
    
    with open(svg_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # Search for base64 image pattern: data:image/(png|jpeg|jpg);base64,....
    match = re.search(r'data:image/(png|jpeg|jpg);base64,([A-Za-z0-9+/=\s\n\r]+)', content)
    if not match:
        print(f"Error: Could not find embedded base64 image in {svg_path}")
        return False
    
    img_type = match.group(1)
    base64_data = match.group(2)
    
    # Clean whitespace/newlines from base64 data
    base64_data = re.sub(r'\s+', '', base64_data)
    
    try:
        image_bytes = base64.b64decode(base64_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save as WebP with high quality (90)
        image.save(webp_path, "WEBP", quality=90)
        print(f"Successfully converted to {webp_path}")
        print(f"Original size: {os.path.getsize(svg_path) / 1024 / 1024:.2f} MB")
        print(f"WebP size: {os.path.getsize(webp_path) / 1024 / 1024:.2f} MB")
        reduction = (1 - (os.path.getsize(webp_path) / os.path.getsize(svg_path))) * 100
        print(f"Size Reduction: {reduction:.2f}%")
        print("-" * 40)
        return True
    except Exception as e:
        print(f"Error converting {svg_path}: {e}")
        return False

if __name__ == "__main__":
    product_dir = "/Users/apple/Biolabs/t-core/public/Product"
    for i in range(1, 9):
        svg_file = f"{i}.svg"
        webp_file = f"{i}.webp"
        svg_path = os.path.join(product_dir, svg_file)
        webp_path = os.path.join(product_dir, webp_file)
        convert_svg_to_webp(svg_path, webp_path)
