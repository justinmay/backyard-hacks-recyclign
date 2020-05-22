import requests
from bs4 import BeautifulSoup

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

###   Finding the links and price ###
product_link = soup.find_all("div", class_="product-offer__cta-block")
links = []
prices = []
for product in product_link:
    print(product.find("a")['href'])
