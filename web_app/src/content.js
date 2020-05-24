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

const fetchData = async (title) => {
  const apiEndpoint = `https://b4275166.ngrok.io/product` // backend should be here
  const url = new URL(apiEndpoint)
  const params = {productName: title}
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
  const title = getTitle()
  // const data = [
  //   {
  //     name: title,
  //     description: 'The material Couch uses is typically deadstock, meaning it’s unused and in new condition, but was made long ago by another company. When Couch finds it gathering dust in a warehouse, it buys it and turns it into guitar straps, camera straps, belts, wallets, handbags, sunglasses cases, and more. The product line is always changing and has included Army truck seat belts, upholstery intended for 1970s VW Beetles, and trippy patterned cloth once destined for 1960s furniture.',
  //     price: 64,
  //     recycled_percent: '',
  //     link: 'https://cna.st/p/2hc5hQAHwfj8VPYK7Qk9GwUbxRSgyWyQM4qy5vcfAxpwRRvuUDvTuzBSVWMcABiMN8d5QibMtBuqC44K8YaakBiSVtrKgT394DMKx8PtkMd?cid=5cb63f20b9c1161402febad5',
  //     image_link: 'https://media.wired.com/photos/5eb2018d0371f8083eb2ceb8/master/w_400%2Cc_limit/Gear-GreenPolly-trash-bags-SOURCE-GreenPolly.jpg'
  //   },
  //   {
  //     name: "Rothy's Copper Flat",
  //     description: "They're lightweight, comfortable, and come in a bewildering variety of shapes, colors, and sizes. The knit uppers are made of 100 percent post-consumer plastic bottles, and the foam components are made from other recycled shoes. The shoeboxes are also made from 85 percent recycled materials, and—it should go without saying—the boxes are 100 percent recyclable, too.",
  //     price: 125,
  //     recycled_percent: '',
  //     link: "https://cna.st/p/2hc5hQAHwfj8VPYK7Qk9GwUbxRSgyWyQM4qy5vcfAxkgdb5i4DEU4sewPs56yYsZBZAuAqGZPjrGz5w9qmZngJtHXDffDwz9EeHvTCV1QLC?cid=5cb63f20b9c1161402febad5",
  //     image_link: "https://media.wired.com/photos/5cba5d589ef3721114271289/master/w_1600%2Cc_limit/Rothy's-Copper-Flat.jpg"
  //   }
  // ]

  useEffect(() => {
    fetchData(title)
      .then(result => {
        console.log(`result: ${result}`)
        console.log(`result: ${result['products']}`)
        setData(result['products'])
      })
      .catch(error => console.log(error));
  }, [title]);


  // useEffect(async () => {
  //   // Create an scoped async function in the hook
  //   async function getData() {
  //     console.log('useeffect')
  //     return await fetchData(title);
  //   }    // Execute the created function directly
  //   let newData = getData();
  //   console.log(`new data: ${newData}`)
  //   setData(newData)
  //   console.log(`data: ${data}`)
  // }, [data, title]);

  return ( 
    <div className={'react-extension'}>
      <ul className={'modal-wrapper'}>{data &&
        data.map((row) => {
          const { name, description, price, link, image_link } = row
          return (
            <li className="flex-container">
              <div><img src={image_link} alt={name}/></div>
              <div><a href={link}>{name}</a></div>
              <div>{description}</div>
              <div>${price}</div>
            </li>
          )
        })
      }</ul>
    </div>
  )
}

const app = document.createElement('div');


app.style.display = "block";
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);
function toggle(){
   if(app.style.display === "block"){
     app.style.display = "none";
   }else{
     app.style.display = "block";
   }
}

document.body.appendChild(app); //instead of appending child we should do something else 
ReactDOM.render(<ContentReact />, app);