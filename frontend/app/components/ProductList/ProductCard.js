// components/ProductCard.js

const ProductCard = ({ product }) => {
  const categoryImagePath = `/image/logo/${product.category.toLowerCase()}.png`;

  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-300">

      <img src={product.image} alt={product.name} className="w-full h-390 object-cover" />

      <div className="p-4">
        <div className="border-t-2 border-gray-200 mt-4"></div>
        <h3 className="text-xl font-raleway font-semibold text-gray-800 mt-4">{product.name}</h3>

        <div className="flex items-center mt-2">
          <p className="text-xl font-raleway font-bold text-blue-500">Rp {product.price}</p>
          <p className="text-sm font-raleway font-light text-gray-500 ml-auto">{product.sold} units sold</p>
        </div>
        <img
          src={categoryImagePath}
          alt={product.category}
          className="w-24 object-contain ml-auto"
        />
      </div>
    </div>
  );
};

export default ProductCard;
