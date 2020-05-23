/* src/content.js */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

const getTitle = () => { 
    const product = document.getElementById("productTitle");
    const title = product.textContent
    console.log('asdfqwerzxcvasdfqwer')
    console.log(title)
    fetch()
    return title || '' //we also have to fetch here to get results from database
    
}

const data = { title: title };
const apiEndopoint = 'ngrok' // backend should be here
try{
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const data = await response.json()
  console.log('Success:', data);
} catch(error) {
  console.error('Error:', error);
}

const ContentReact = () => {
  const [data, setData] = useState(null);
  
  return (
    <div className={'react-extension'}>
        <p>Hello From React Extension!</p>
        <p>{getTitle()}</p> 
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