from transformers import AutoProcessor, CLIPSegForImageSegmentation
from PIL import Image
from matplotlib import pyplot as plt
from torchvision import transforms
import cv2
import numpy as np
import os

def segmentation(dir,username,character_name,suffix):
    path = '/' + dir + '/' + username + '/' + character_name +suffix
    processor = AutoProcessor.from_pretrained("CIDAS/clipseg-rd64-refined")
    model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined")
    basedir = os.path.abspath(os.path.dirname(__file__))
    url = basedir + path
    raw_image = Image.open(url).convert("RGB").resize((352, 352))
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize((352, 352)),
    ])
    image = transform(raw_image)
    texts = ["people"]
    inputs = processor(text=texts, images=[image] * len(texts), padding=True, return_tensors="pt")
    #
    outputs = model(**inputs)
    logits = outputs.logits
    print(logits.shape)
    filename = f"mask.png"
    plt.imsave(filename,logits.detach().numpy())
    img2 = cv2.imread(filename)
    gray_image = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    (thresh, bw_image) = cv2.threshold(gray_image, 100, 255, cv2.THRESH_BINARY)
    cv2.imwrite(filename,bw_image)
    cv2.cvtColor(bw_image, cv2.COLOR_BGR2RGB)
    Image.fromarray(bw_image)
    mask = Image.open('mask.png')
    final_mask = np.repeat(np.expand_dims(np.array(mask),2),3,2)
    res = cv2.bitwise_and(np.array(raw_image), np.repeat(np.expand_dims(np.array(mask),2),3,2))
    res = cv2.cvtColor(res, cv2.COLOR_BGR2BGRA)
    mask = np.all(final_mask[:,:,:] == [0, 0, 0], axis=-1)
    res[mask,3] = 0
    masked_dir = 'masked_user_info'
    url = basedir + '/' + masked_dir + '/' + username + '/' + character_name + '.png'
    plt.imsave(url,res)