// CrestFoods Menu Data - Australian Restaurant with Nigerian & Australian Cuisine

const menuData = {
    food: [
        // Nigerian Dishes
        {
            id: "food-1",
            name: "Jollof Rice with Chicken",
            price: 24.90,
            image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
            shortDesc: "Smoky Nigerian jollof rice served with grilled chicken",
            fullDesc: "Our signature jollof rice cooked with the perfect blend of tomatoes, peppers, and spices, served with tender grilled chicken. A true West African classic that will leave you craving more.",
            ingredients: ["Long grain rice", "Tomatoes", "Bell peppers", "Onions", "Chicken", "Spices"],
            allergens: ["None"],
            category: "food"
        },
        {
            id: "food-2",
            name: "Fried Rice & Plantain",
            price: 22.90,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
            shortDesc: "Colorful fried rice with sweet fried plantains",
            fullDesc: "Delicious fried rice loaded with vegetables and your choice of protein, served with perfectly ripened fried plantains.",
            ingredients: ["Rice", "Mixed vegetables", "Eggs", "Plantains", "Seasonings"],
            allergens: ["Eggs"],
            category: "food"
        },
        {
            id: "food-3",
            name: "Peppered Beef & Rice",
            price: 26.90,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
            shortDesc: "Spicy peppered beef served with steamed rice",
            fullDesc: "Tender chunks of Australian beef cooked in our signature pepper sauce, served with fluffy steamed rice.",
            ingredients: ["Beef", "Bell peppers", "Scotch bonnets", "Onions", "Rice"],
            allergens: ["None"],
            category: "food"
        },
        // Australian Dishes
        {
            id: "food-4",
            name: "Aussie Meat Pie with Mash",
            price: 18.90,
            image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400",
            shortDesc: "Classic Australian meat pie with creamy mash",
            fullDesc: "Traditional Australian beef pie with rich gravy, served with creamy mashed potatoes and mushy peas. A true Aussie classic!",
            ingredients: ["Beef mince", "Pastry", "Gravy", "Potatoes", "Peas"],
            allergens: ["Gluten", "Dairy"],
            category: "food"
        },
        {
            id: "food-5",
            name: "Barramundi & Chips",
            price: 28.90,
            image: "https://images.unsplash.com/photo-1579208030886-b1a5ed1e9b28?w=400",
            shortDesc: "Fresh Australian barramundi with golden chips",
            fullDesc: "Crispy beer-battered barramundi fillet served with golden chips, tartare sauce, and lemon. Fresh Australian seafood at its best.",
            ingredients: ["Barramundi fillet", "Beer batter", "Potatoes", "Tartare sauce", "Lemon"],
            allergens: ["Gluten", "Fish"],
            category: "food"
        },
        {
            id: "food-6",
            name: "Chicken Parmigiana",
            price: 26.90,
            image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400",
            shortDesc: "Aussie pub classic with chips & salad",
            fullDesc: "Crispy crumbed chicken breast topped with Napoli sauce, melted cheese, and ham. Served with chips and garden salad.",
            ingredients: ["Chicken breast", "Breadcrumbs", "Napoli sauce", "Mozzarella", "Ham"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "food"
        },
        {
            id: "food-7",
            name: "Grilled Lamb Cutlets",
            price: 34.90,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
            shortDesc: "Premium Australian lamb with rosemary",
            fullDesc: "Succulent Australian lamb cutlets marinated in rosemary and garlic, served with roasted vegetables and mint sauce.",
            ingredients: ["Lamb cutlets", "Rosemary", "Garlic", "Seasonal vegetables", "Mint sauce"],
            allergens: ["None"],
            category: "food"
        },
        {
            id: "food-8",
            name: "Big Brekkie",
            price: 24.90,
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400",
            shortDesc: "Full Aussie breakfast with all the works",
            fullDesc: "Two eggs your way, crispy bacon, sausages, grilled tomato, mushrooms, hash browns, baked beans, and sourdough toast.",
            ingredients: ["Eggs", "Bacon", "Sausages", "Tomatoes", "Mushrooms", "Hash browns", "Beans", "Sourdough"],
            allergens: ["Gluten", "Eggs"],
            category: "food"
        },
        {
            id: "food-9",
            name: "Suya Skewers",
            price: 19.90,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
            shortDesc: "Nigerian spiced beef skewers",
            fullDesc: "Tender beef strips marinated in suya spice (ground peanuts and spices), grilled to perfection. Served with sliced onions and tomatoes.",
            ingredients: ["Beef", "Suya spice", "Peanuts", "Onions", "Tomatoes"],
            allergens: ["Peanuts"],
            category: "food"
        },
        {
            id: "food-10",
            name: "Chicken Shawarma",
            price: 16.90,
            image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400",
            shortDesc: "Middle Eastern wrap with tender chicken",
            fullDesc: "Seasoned chicken wrapped in soft pita bread with fresh vegetables, pickles, and creamy garlic sauce.",
            ingredients: ["Chicken", "Pita bread", "Lettuce", "Tomatoes", "Garlic sauce", "Pickles"],
            allergens: ["Gluten", "Dairy"],
            category: "food"
        }
    ],
    bread: [
        {
            id: "bread-1",
            name: "Artisan Sourdough",
            price: 9.90,
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
            shortDesc: "Traditional fermented sourdough bread",
            fullDesc: "Our signature sourdough made with a 24-hour fermented starter, creating a perfectly tangy and crusty loaf.",
            ingredients: ["Flour", "Water", "Salt", "Sourdough starter"],
            allergens: ["Gluten"],
            category: "bread"
        },
        {
            id: "bread-2",
            name: "French Baguette",
            price: 6.50,
            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400",
            shortDesc: "Classic crispy French bread",
            fullDesc: "Authentic French baguette with a crispy golden crust and soft, airy interior. Perfect for sandwiches or with butter.",
            ingredients: ["Flour", "Water", "Yeast", "Salt"],
            allergens: ["Gluten"],
            category: "bread"
        },
        {
            id: "bread-3",
            name: "Cinnamon Rolls (6 pcs)",
            price: 18.90,
            image: "https://images.unsplash.com/photo-1609127102567-8a9a21dc27d8?w=400",
            shortDesc: "Soft rolls with cinnamon and cream cheese frosting",
            fullDesc: "Fluffy, warm cinnamon rolls swirled with cinnamon sugar and topped with rich cream cheese frosting.",
            ingredients: ["Flour", "Butter", "Cinnamon", "Sugar", "Cream cheese"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "bread"
        },
        {
            id: "bread-4",
            name: "Nigerian Meat Pie (4 pcs)",
            price: 16.90,
            image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400",
            shortDesc: "Flaky pastry filled with seasoned meat",
            fullDesc: "Golden flaky pastry pockets filled with well-seasoned minced meat and vegetables. A Nigerian favorite now in Australia!",
            ingredients: ["Flour", "Butter", "Minced meat", "Potatoes", "Carrots", "Onions"],
            allergens: ["Gluten", "Dairy"],
            category: "bread"
        },
        {
            id: "bread-5",
            name: "Sausage Rolls (6 pcs)",
            price: 14.90,
            image: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=400",
            shortDesc: "Aussie-style crispy pastry with juicy sausage",
            fullDesc: "Perfectly seasoned sausage wrapped in golden, flaky puff pastry. An Australian party essential!",
            ingredients: ["Puff pastry", "Sausage meat", "Seasonings"],
            allergens: ["Gluten"],
            category: "bread"
        },
        {
            id: "bread-6",
            name: "Butter Croissants (3 pcs)",
            price: 12.90,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
            shortDesc: "Buttery, flaky French pastries",
            fullDesc: "Light, airy croissants made with layers of butter-infused dough, baked to golden perfection.",
            ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"],
            allergens: ["Gluten", "Dairy"],
            category: "bread"
        },
        {
            id: "bread-7",
            name: "Damper Bread",
            price: 8.90,
            image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400",
            shortDesc: "Traditional Australian soda bread",
            fullDesc: "Classic Australian damper - a simple, rustic bread traditionally baked over coals. Perfect with butter and golden syrup.",
            ingredients: ["Flour", "Butter", "Milk", "Baking powder", "Salt"],
            allergens: ["Gluten", "Dairy"],
            category: "bread"
        },
        {
            id: "bread-8",
            name: "Coconut Bread",
            price: 8.50,
            image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400",
            shortDesc: "Sweet bread with coconut flavor",
            fullDesc: "Soft, sweet bread infused with coconut milk and topped with shredded coconut. A tropical delight!",
            ingredients: ["Flour", "Coconut milk", "Shredded coconut", "Sugar", "Butter"],
            allergens: ["Gluten", "Dairy", "Tree nuts"],
            category: "bread"
        }
    ],
    cake: [
        {
            id: "cake-1",
            name: "Classic Birthday Cake",
            price: 65.00,
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
            shortDesc: "Beautiful vanilla cake with buttercream",
            fullDesc: "A stunning multi-layered vanilla sponge cake covered in silky buttercream frosting. Perfect for birthdays and celebrations. Can be customized with your message.",
            ingredients: ["Flour", "Eggs", "Butter", "Sugar", "Vanilla", "Buttercream"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: true,
            sizes: ["6 inch", "8 inch", "10 inch", "12 inch"],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"]
        },
        {
            id: "cake-2",
            name: "Chocolate Truffle Cake",
            price: 75.00,
            image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
            shortDesc: "Rich, decadent chocolate indulgence",
            fullDesc: "Layers of moist chocolate cake filled with chocolate ganache and covered in a glossy chocolate glaze. A chocolate lover's dream!",
            ingredients: ["Dark chocolate", "Flour", "Eggs", "Butter", "Cocoa", "Cream"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: true,
            sizes: ["6 inch", "8 inch", "10 inch"],
            flavors: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"]
        },
        {
            id: "cake-3",
            name: "Lamington Cake",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
            shortDesc: "Classic Australian lamington as a cake",
            fullDesc: "A tribute to Australia's iconic lamington - vanilla sponge coated in chocolate and rolled in desiccated coconut. A true Aussie classic!",
            ingredients: ["Flour", "Eggs", "Butter", "Chocolate", "Coconut"],
            allergens: ["Gluten", "Dairy", "Eggs", "Tree nuts"],
            category: "cake",
            customizable: true,
            sizes: ["6 inch", "8 inch", "10 inch"],
            flavors: ["Classic", "Raspberry filled"]
        },
        {
            id: "cake-4",
            name: "Wedding Cake (Custom)",
            price: 350.00,
            image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400",
            shortDesc: "Elegant multi-tiered wedding cake",
            fullDesc: "Beautifully crafted multi-tiered wedding cake, fully customizable to match your special day. Includes consultation and delivery within Melbourne.",
            ingredients: ["Custom based on selection"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: true,
            sizes: ["2 Tier", "3 Tier", "4 Tier", "5 Tier"],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Carrot", "Lemon"]
        },
        {
            id: "cake-5",
            name: "Cupcakes (Box of 12)",
            price: 48.00,
            image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
            shortDesc: "Assorted gourmet cupcakes",
            fullDesc: "A beautiful box of 12 gourmet cupcakes in assorted flavors, each topped with swirls of buttercream frosting.",
            ingredients: ["Flour", "Eggs", "Butter", "Sugar", "Vanilla", "Buttercream"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: true,
            sizes: ["Box of 6", "Box of 12", "Box of 24"],
            flavors: ["Assorted", "All Chocolate", "All Vanilla", "All Red Velvet"]
        },
        {
            id: "cake-6",
            name: "Pavlova",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
            shortDesc: "Classic Aussie meringue dessert",
            fullDesc: "Crispy on the outside, marshmallow soft inside - topped with fresh cream and seasonal fruits. The ultimate Australian dessert!",
            ingredients: ["Egg whites", "Sugar", "Cream", "Fresh fruits"],
            allergens: ["Eggs", "Dairy"],
            category: "cake",
            customizable: false
        },
        {
            id: "cake-7",
            name: "Glazed Doughnuts (6 pcs)",
            price: 18.00,
            image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
            shortDesc: "Soft doughnuts with sweet glaze",
            fullDesc: "Fluffy, pillowy doughnuts covered in a sweet vanilla glaze. Fresh from our bakery every morning.",
            ingredients: ["Flour", "Yeast", "Sugar", "Milk", "Vanilla glaze"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: false
        },
        {
            id: "cake-8",
            name: "Tim Tam Cheesecake",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
            shortDesc: "Aussie twist on classic cheesecake",
            fullDesc: "Creamy cheesecake loaded with crushed Tim Tams on a chocolate biscuit base. An Australian favourite!",
            ingredients: ["Cream cheese", "Tim Tams", "Chocolate biscuits", "Butter", "Cream"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: false
        }
    ]
};

// Delivery fee in AUD
const DELIVERY_FEE = 8.00;

// Format currency in Australian Dollars
function formatPrice(price) {
    return "$" + price.toFixed(2);
}

// Get all items from all categories
function getAllItems() {
    return [...menuData.food, ...menuData.bread, ...menuData.cake];
}

// Get item by ID
function getItemById(id) {
    return getAllItems().find(item => item.id === id);
}

// Get items by category
function getItemsByCategory(category) {
    return menuData[category] || [];
}
