import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphone",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Laptop",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
  {
    id: 5,
    name: "Keyboard",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
  },
  {
    id: 6,
    name: "Phone",
    price: 25999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
];

const page = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Category Products</h2>
        <button className="text-blue-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">
                {product.name}
              </h3>

              <p className="text-lg font-bold text-orange-500 mt-2">
                ৳ {product.price}
              </p>

              <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;