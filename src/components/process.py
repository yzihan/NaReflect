from PIL import Image
 
def convertImage(path, save_path):
    img = Image.open(path)
    img = img.convert("RGBA")
 
    datas = img.getdata()
 
    newData = []
 
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
 
    img.putdata(newData)
    img.save(save_path, "PNG")
    
convertImage('dad_masked.jpg', 'img1.png')
convertImage('Alice_masked.jpg', 'img2.png')
convertImage('Zoey_masked.jpg', 'img3.png')
