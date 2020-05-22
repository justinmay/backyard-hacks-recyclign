import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

r = requests.get('https://www.wired.com/gallery/our-favorite-upcycled-and-recycled-products/')

soup = BeautifulSoup(r.text, features="html.parser")

###   Finding the names ###
product_names = soup.find_all("div", class_="gallery-slide-caption__brand-and-name")
names = []
for product in product_names:
    names.append(product.text)

###   Finding the descriptions ###
product_descriptions = soup.find_all("div", class_="gallery-slide-caption__dek")
descriptions = []
for description in product_descriptions:
    #print(description.find("h2").text)
    descriptions.append(description.find("h2").text)

###   Finding the links###
product_link = soup.find_all("div", class_="product-offer__cta-block")
links = []
for product in product_link:
    links
    #print(product.find("a")['href'])
    links.append(product.find("a")['href'])

###  Finding Prices ### 
product_price = soup.find_all("span", class_="button__label")
prices = []
for product in product_price:
    prices.append(product.text.split(" ")[0])

###  Finding links ### 
product_image_link = soup.find_all("img", class_="responsive-image__image")
image_links = []
for product in product_image_link:
    image_links.append(product['src'])
print(len(names))
print(len(description))
print(len(links))
print(len(prices))
print(len(image__links))
### putting it all together ### 
#df = pd.DataFrame(np.array([names,description,links,prices,image_links]),
#                   columns=['names', 'description', 'links','prices','image_links'])
#df.to_csv("wired_data.csv")
