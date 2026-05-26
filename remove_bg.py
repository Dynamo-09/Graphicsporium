import sys
from PIL import Image

def recover_from_white_bg(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    
    for item in datas:
        r, g, b, a = item
        dist_from_white = 255 - min(r, g, b)
        
        if dist_from_white < 5:
            ao = 0.0
        elif dist_from_white > 50:
            ao = 1.0
        else:
            ao = (dist_from_white - 5) / 45.0
            
        if ao > 0:
            r_new = int(max(0, min(255, (r - 255 * (1 - ao)) / ao)))
            g_new = int(max(0, min(255, (g - 255 * (1 - ao)) / ao)))
            b_new = int(max(0, min(255, (b - 255 * (1 - ao)) / ao)))
            a_new = int(ao * 255)
            newData.append((r_new, g_new, b_new, a_new))
        else:
            newData.append((0, 0, 0, 0))
            
    img.putdata(newData)
    img.save(out_path, "PNG")

def recover_from_black_bg(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    
    for item in datas:
        r, g, b, a = item
        dist_from_black = max(r, g, b)
        
        if dist_from_black < 25:
            ao = 0.0
        elif dist_from_black > 80:
            ao = 1.0
        else:
            ao = (dist_from_black - 25) / 55.0
            
        if ao > 0:
            r_new = int(max(0, min(255, r / ao)))
            g_new = int(max(0, min(255, g / ao)))
            b_new = int(max(0, min(255, b / ao)))
            a_new = int(ao * 255)
            newData.append((r_new, g_new, b_new, a_new))
        else:
            newData.append((0, 0, 0, 0))
            
    img.putdata(newData)
    img.save(out_path, "PNG")

if __name__ == "__main__":
    print("Converting white bg images...")
    recover_from_white_bg("src/assets/Graphicsporium_page_1white.png", "src/assets/Graphicsporium_page_1white_trans.png")
    recover_from_white_bg("src/assets/MSME logo white.jpeg", "src/assets/MSME_logo_white_trans.png")
    
    print("Converting black bg images...")
    recover_from_black_bg("src/assets/Graphicsporium_page_1black.png", "src/assets/Graphicsporium_page_1black_trans.png")
    recover_from_black_bg("src/assets/MSME logo black.jpeg", "src/assets/MSME_logo_black_trans.png")
    print("Done!")
