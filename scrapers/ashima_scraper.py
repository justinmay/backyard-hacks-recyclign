import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

r = requests.get('https://www.theahimsacollective.com/collections/all?page=1')

soup = BeautifulSoup(r.text, features="html.parser")

###   Finding the names ### ok
products = soup.find_all("div", class_="grid-view-item product-card")
names = []
for product in products:
    price = product.find("div", class_="price-item price-item--regular")
    print(price.text)
    break