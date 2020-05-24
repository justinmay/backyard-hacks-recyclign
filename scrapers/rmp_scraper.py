import requests
import re
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

# load webpage - needed different code because of dynamically loaded elements on page
driver = webdriver.Chrome()
url = "https://recyclemoreplastic.org/buyrecycled"
driver.get(url)
html = driver.page_source

soup = BeautifulSoup(html, features="html.parser")

###   Finding each listing   ###
listings = soup.find_all("img", alt=True)

pattern = re.compile(r"['\"](http(?:s?)://[^'\"]+)")

names=[]
imgLinks=[]
descriptions=[]
prodLinks=[]
percRecs=[]

for listing in listings:

	# Get product name/title
	name = listing['alt']
	# Remove ads or self rating system
	if name == 'Multi-Material' or name == 'Certified PCR'\
		or name == 'Buy Recycled Directory' or name == "Buy Recycled Products Directory":
		continue

	# image link	
	imgLink = listing['src']

	# percent recycled
	percRec = listing.next_sibling.next_sibling.next_sibling.text

	# description (which reall will be a tag)
	listingPar = listing.parent
	descDiv = listingPar.next_sibling.next_sibling
	desc = descDiv.div.text

	# link to product/company page
	prodDiv = descDiv.next_sibling.next_sibling.next_sibling
	prodLinkSoup = prodDiv.find("div", onclick=re.compile(r"['\"](http(?:s?)://[^'\"]+)"))
	prodLink = re.search(pattern, prodLinkSoup["onclick"]).group(1)

	# append all info to relevant arrays
	names.append(name)
	imgLinks.append(imgLink)
	descriptions.append(desc)
	prodLinks.append(prodLink)
	percRecs.append(percRec)

# build csv file
d = {'names': names, 'links': prodLinks, 'image_links': imgLinks,\
'percent recycled': percRecs, 'descriptions_tags': descriptions}
df = pd.DataFrame(data=d)
df.to_csv("recycleMorePlas_data.csv")