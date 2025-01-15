# Testing to create a image + text extraction from a .pdf

import pymupdf4llm 
import pymupdf
import PIL.Image
from io import BytesIO
from typing import BinaryIO

def extract(s: pymupdf.Document | BinaryIO | str) -> tuple[list, str]:
    doc = None
     
    match s:
        case pymupdf.Document():
             doc = s
        case BinaryIO():
             doc = pymupdf.open(s)
        case str():
             doc = pymupdf.open(s) # Will need to check if this is required.
    
    text = pymupdf4llm.to_markdown(doc, show_progress=False)
    images = []
    
    for page in doc:
        images.append(BytesIO(page.get_pixmap(dpi=100).pil_tobytes(format="PNG", optimize=True, dpi=(100, 100)))) # type: ignore known issue with mypupdf, need to find a way to type these

    return (images, text)

images, text = extract("/home/devparapalli/Downloads/Shrini Aadhar.pdf")

PIL_Images = [PIL.Image.open(x) for x in images]

for i in PIL_Images:
    i.show()
    
print(text)
