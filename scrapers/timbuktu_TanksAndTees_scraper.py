import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

r = requests.get('https://teamtimbuktu.com/collections/organic-cotton')

soup = BeautifulSoup(r.text, features="html.parser")

###   Finding the names ### 
product_names = soup.find_all("h2", class_="ProductItem__Title Heading")
names = []
for product in product_names:
    names.append(product.find("a").text)

###   Finding the links ### 
product_link = soup.find_all("h2", class_="ProductItem__Title Heading")
links = []
for product in product_link:
    links
    #print(product.find("a")['href'])
    links.append("https://teamtimbuktu.com"+product.find("a")['href'])

###  Finding Prices ### 
product_price = soup.find_all("span", class_="money")
prices = []
for product in product_price:
    prices.append(product.text.split(" ")[1])

###  Finding image links ### 
product_image_link = soup.find_all("div", class_="ProductItem__Wrapper")
image_links = []
for product in product_image_link:
     image_links.append("https://teamtimbuktu.com"+product.find("a")['href'])


print(len(names))

print(len(prices))

print(len(links))

print(len(image_links))

### putting it all together ### 
d = {'names': names, 'prices': prices, 'links': links, 'image_links': image_links}
df = pd.DataFrame(data=d)
df.to_csv("timbuktu_TAT_data.csv")