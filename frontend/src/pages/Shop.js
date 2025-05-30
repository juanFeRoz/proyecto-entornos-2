import React, { useState, useEffect } from "react";
import PageHeading from "../common/PageHeading";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { useProducts } from "../data/ProductsData";
import { addProductToCart as callAddToCartApi } from "../Api/cartApi"; 
import { useSearchParams } from "react-router-dom"; 

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const { products: allProducts, loading, error } = useProducts();
  const [searchParams] = useSearchParams(); 
  const initialCategoryFilter = searchParams.get('category'); 

  const [filters, setFilters] = useState({
    categories: initialCategoryFilter ? [initialCategoryFilter] : [], 
    brands: [],
    priceRange: [0, 200000],
  });

  useEffect(() => {
    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL && !filters.categories.includes(categoryFromURL)) {
      setFilters(prevFilters => ({ ...prevFilters, categories: [categoryFromURL] }));
    } else if (!categoryFromURL) {
      if (initialCategoryFilter && filters.categories.includes(initialCategoryFilter)) {
        setFilters(prevFilters => ({ ...prevFilters, categories: [] }));
      }
    }
  }, [searchParams, initialCategoryFilter]);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };

  const categoryList = allProducts
    ? Array.from(new Set(allProducts.map((product) => product.category?.name))).filter(Boolean)
    : [];
  console.log("categoryList:", categoryList);

  const brandList = allProducts
    ? Array.from(new Set(allProducts.map((product) => product.brand))).filter(Boolean)
    : [];
  console.log("brandList:", brandList);

  const filteredProducts = allProducts
    ? allProducts.filter((product) => {
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category?.name?.toLowerCase());
        const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
        const price = parseFloat(product.price);
        const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1];
        return categoryMatch && brandMatch && priceMatch;
      })
    : [];

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = [...filters[filterType]];
    const index = updatedFilters.indexOf(value);
    if (index === -1) {
      updatedFilters.push(value);
    } else {
      updatedFilters.splice(index, 1);
    }
    setFilters({ ...filters, [filterType]: updatedFilters });
  };

  const handleAddToCart = async (productName) => {
    try {
      const result = await callAddToCartApi(productName);
      console.log("Producto añadido al carrito:", result);
    } catch (error) {
      console.error("Error al añadir producto al carrito:", error);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div>
      <PageHeading home={"home"} pagename={"Shop"} />

      <div>
        <div className="w-10/12 m-auto flex gap-3 items-start mt-8 ">
          <div className="filterproduct w-1/4 bg-white shadow-lg p-4">
            <div>
              <h3 className="font-semibold mb-2">Precio</h3>
              <div className="mb-4">
                <Slider
                  range
                  min={0}
                  max={200000}
                  defaultValue={filters.priceRange}
                  onChange={handlePriceChange}
                />
                <div className="text-sm text-gray-600 mt-2">
                  Rango: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Categorías</h3>
                {categoryList.map((category) => (
                  <div key={category} className="mb-1">
                    <label>
                      <input
                        type="checkbox"
                        value={category}
                        checked={filters.categories.includes(category.toLowerCase())}
                        onChange={(e) => handleCheckboxChange('categories', e.target.value)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Marcas</h3>
                {brandList.map((brand) => (
                  <div key={brand} className="mb-1">
                    <label>
                      <input
                        type="checkbox"
                        value={brand}
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => handleCheckboxChange('brands', e.target.value)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-8/12">
            <div className="grid grid-cols-3 gap-3">
              {filteredProducts.map((item, index) => (
                <div key={index} className="mt-8">
                  <div className="overflow-hidden relative group"> {/* Añadido 'group' */}
                    <div className="image-container relative">
                      <div className="rounded-3xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-3xl w-full h-auto object-contain max-h-200px"
                        />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 m-4 flex flex-col gap-2 transition-opacity duration-300 ease-in-out"> {/* Flex column para los iconos de arriba */}
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                          <IoMdHeartEmpty size={20} />
                        </button>
                        <button
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                          onClick={() => handleOpen(item.id)}
                        >
                          <IoMdSearch size={20} />
                        </button>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 bg-white p-2 rounded-full shadow transition-opacity duration-300 ease-in-out">
                        <button
                          className="bg-black text-white h-8 w-8 grid place-items-center rounded-full text-sm"
                          onClick={() => handleAddToCart(item.name)}
                        >
                          <BiCart />
                        </button>
                      </div>
                    </div>

                    <div className="product-details mt-2">
                      <p className="mb-1">{item.name}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal
          data={allProducts && allProducts.find((item) => item.id === isModalOpen) ? {
            img: allProducts.find((item) => item.id === isModalOpen)?.image,
            title: allProducts.find((item) => item.id === isModalOpen)?.name,
            price: allProducts.find((item) => item.id === isModalOpen)?.price,
            description: allProducts.find((item) => item.id === isModalOpen)?.brand || "Marca no disponible",
            ...allProducts.find((item) => item.id === isModalOpen),
          } : null}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Shop;