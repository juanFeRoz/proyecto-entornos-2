import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryImage = (id) => {
    const imageMap = {
      1: "https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2023/09/25/3132b5756c0da4a84a22fe41e48fc427.jpg", // Boho
      2: "https://img.archiexpo.es/images_ae/photo-g/65765-10958937.jpg", // Clasico
      3: "https://m.media-amazon.com/images/I/81whqTySB4L._AC_SL1500_.jpg", // Industrial
      4: "https://blog.jamar.com/wp-content/smush-webp/ESPEJO-3.jpg.webp", // Minimalista
      5: "https://ebani.com.co/cdn/shop/files/NVESPEJO6.png?v=1707233076&width=600", // Moderno
      6: "https://imagenes.elpais.com/resizer/v2/HCSA5KO7OABGMTAIVN2N5M3BKA.jpg?auth=86381476cb56e0c652f418ca96b7e4df6647a7e631b027bc7ec01e9abb50de23&width=1960&height=1470&smart=true", // Nordico
      7: "https://i.etsystatic.com/27174858/r/il/238814/4671557910/il_570xN.4671557910_4mdu.jpg", // Rustico
      8: "https://hips.hearstapps.com/hmg-prod/images/lommaryd-espejo-1111412-pe870765-s5-66dac1c386453.jpg?resize=980:*", // Art Deco
      9: "https://www.centroespejos.com/20064/espejo-salon-estilo-nordico-marco-blanco.jpg" // Escandinavo
    };
    return imageMap[id] || "https://via.placeholder.com/300x200?text=Categoría";
  };

  if (loading) return <div className="text-center py-8">Cargando categorías...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="w-10/12 m-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Nuestras Categorías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from(categories).map((category) => (
          <Link key={category.id} to={`/shop?category=${category.name.toLowerCase()}`} className="group relative block">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={getCategoryImage(category.id)}
                alt={category.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg capitalize">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;