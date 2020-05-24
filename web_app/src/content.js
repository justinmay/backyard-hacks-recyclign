/* src/content.js */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

const getTitle = () => { 
    const product = document.getElementById("productTitle");
    const title = product.textContent
    console.log('asdfqwerzxcvasdfqwer')
    console.log(title)
    return title || '' //we also have to fetch here to get results from database
}

const getKeyWords = () => {
    const searchElt = document.getElementById("twotabsearchtextbox")
    const searchVal = searchElt.value
    console.log(`value: ${searchVal}`)
    return searchVal || ''
}

const fetchData = async (title, keyword) => {
  const apiEndpoint = `https://b4275166.ngrok.io/product` // backend should be here
  const url = new URL(apiEndpoint)
  const params = {productName: title, keyword: keyword}
  url.search = new URLSearchParams(params).toString();

  try{
    const response = await fetch(url)
    const result = await response.json()
    console.log('Success:', result);
    return result
  } catch(error) {
    console.error('Error:', error);
  }
}

const ContentReact = () => {
  const [data, setData] = useState(null)
  const title = getTitle() || null
  const keyword = getKeyWords() || null
  
  useEffect(() => {
    fetchData(title, keyword)
      .then(result => {
        let products = result['products']
        if (products === undefined || products.length === 0) {
            products = null
        }
    
        console.log(`result: ${result}`)
        console.log(`result: ${result['products']}`)
        setData(products)
      })
      .catch(error => console.log(error));
  }, [title]);

  return ( 
    <div className={'react-extension'}>
      <ul className={'modal-wrapper'}>
        <li className='header'>
          <img src="https://webstockreview.net/images/clipart-leaf-cartoon-4.png" alt="leaf" class="logoBoy"/><p><span class='title'>New Leaf</span> <span class='caption'> - Recommending Green Alternatives for Everyday Purchases</span></p>
        </li>
        {data ?
        data.map((row) => {
          const { name, description, price, link, image_link } = row
          return (
            <li className="flex-container">
              <div className='image'><img src={image_link} alt={''}/></div>
              <div className='name'><a href={link}>{name}</a></div>
              <div className='description'><p className='desc'>{description}</p></div>
              <div className='jahaan_price'><p>${price}</p></div>
            </li>
          )
        }) :
        <li className="error">
          <br/>
          <p className="errorMessage">Sorry! We couldn't find any matching eco-friendly products :(</p>
        </li>
      }</ul>
    </div>
  )
}

const app = document.createElement('div');

app.style.display = "none";
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if(request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}

document.body.appendChild(app); //instead of appending child we should do something else 
ReactDOM.render(<ContentReact />, app);