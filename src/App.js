
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import loader from "./assets/loader.gif"
import ReactPaginate from 'react-paginate';


function App() {
 const  [image, setImage] = useState([])

 const getImage = async(count = 1) =>{
  try{
console.log(count)
    const {data} = await axios.get(
      `https://picsum.photos/v2/list?page=${count}&limit=10`
    )
    setImage(data)

  }catch(err){
    console.log(err)
  }
 }

 useEffect(() =>{
  getImage();
 }, [])

 const handlePageClick = ({selected}) =>{
  getImage(selected +1 )

 }

 let imagelist = [];
 if (image.length > 0) {
     imagelist = image.map((image, index) => (
    
         <div
             key={index}
           
             className="me-3 mb-3 card"
             style={{ width: "18.9vmax" }}
         >
          <h1>Gallery images</h1>
             <img
                 src={image.download_url}
                 className="card-img-top"
                 alt={image.download_url}
             />
             <div className="card-body">
                 <p className="card-text">{image.author}</p>
             </div>
         </div>
     ));
 }

  return (
  <>
<div  className="main ">
  <div className='image'>
  {image.length > 0 ? (imagelist) : (<img style={{width:"100vmax", height:"100vh", margin:"0"}} src={loader} alt="" />)}
  </div>

<ReactPaginate
className='radius'
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< "
      />
</div>
  </>
  );
}

export default App;
