import './App.css'
import ProductCard from './Components/ProductCard';
import SearchBar from './Components/SearchBar'
import { useEffect, useRef, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  


const [allproducts, setAllProducts] = useState([]);
const [searchResults, setSearchResults] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

useEffect(()=>{
  fetch(`${API_BASE}/api/products`).then(res => res.json()).then(setAllProducts);
},[]);

const productsToShow = searchResults.length > 0 ? searchResults : allproducts;


 const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

 

  return (
    <div className=' bg-gray-900 text-white'>
    <header>
      <h1 className='text-5xl font-sans'>Discover Products</h1>
    <SearchBar onResults={setSearchResults}/>
    </header>
     <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
        {productsToShow.map((product) => (
          <div
            key={product.id}
            onClick={() => handleOpenModal(product)}
            className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300 h-auto"
          >
            <div className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {product.name}
              </h3>
              
             
              
            </div>
          </div>
        ))}
      </div>

      {/* Modal Container */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-4xl overflow-hidden relative"
          >
            <div className="flex justify-end p-4 absolute top-0 right-0 z-10">
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold hover:text-purple-500 transition-colors duration-200 bg-gray-900 bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col">
              <div className="w-full flex justify-center bg-gray-900 px-4 pt-16">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full max-w-2xl max-h-[60vh] object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="lg:p-8 p-6">
                <h3 className="lg:text-3xl font-bold text-white mb-4 text-md">
                  {selectedProduct.name}
                </h3>
                 <p className="text-xl text-purple-400">${selectedProduct.price}</p>
                 <p className="text-white">{selectedProduct.description}</p>
                
                
              </div>
            </div>
          </div>
        </div>
      )}
     {/* <p>Hello</p> */}
    </div>
  )
}

export default App
