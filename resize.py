from PIL import Image
import os


image_dir = 'images/'
thumbnail_dir = 'thumbnails/'

if not os.path.exists(thumbnail_dir):
    os.makedirs(thumbnail_dir)


thumbnail_size = (700, 700)

for filename in os.listdir(image_dir):
    if filename.endswith('.jpg'):
        img_path = os.path.join(image_dir, filename)
        with Image.open(img_path) as img:
            img.thumbnail(thumbnail_size)
            thumbnail_path = os.path.join(thumbnail_dir, filename)
            img.save(thumbnail_path, "JPEG")
