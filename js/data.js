// Cake Crest Menu Data

const menuData = {
    food: [
        {
            id: "food-1",
            name: "Jollof Rice with Chicken",
            price: 2500,
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
            price: 2200,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
            shortDesc: "Colorful fried rice with sweet fried plantains",
            fullDesc: "Delicious fried rice loaded with vegetables and your choice of protein, served with perfectly ripened fried plantains.",
            ingredients: ["Rice", "Mixed vegetables", "Eggs", "Plantains", "Seasonings"],
            allergens: ["Eggs"],
            category: "food"
        },
        {
            id: "food-3",
            name: "Spaghetti Bolognese",
            price: 2000,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
            shortDesc: "Classic Italian pasta with rich meat sauce",
            fullDesc: "Al dente spaghetti topped with our homemade bolognese sauce made with premium ground beef, tomatoes, and Italian herbs.",
            ingredients: ["Spaghetti", "Ground beef", "Tomatoes", "Garlic", "Italian herbs", "Parmesan"],
            allergens: ["Gluten", "Dairy"],
            category: "food"
        },
        {
            id: "food-4",
            name: "Grilled Chicken Platter",
            price: 3500,
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
            shortDesc: "Juicy grilled chicken with sides",
            fullDesc: "Perfectly marinated and grilled chicken breast served with coleslaw, fries, and our special sauce.",
            ingredients: ["Chicken breast", "Marinade spices", "Potatoes", "Cabbage", "Carrots"],
            allergens: ["None"],
            category: "food"
        },
        {
            id: "food-5",
            name: "Peppered Beef & Rice",
            price: 3000,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
            shortDesc: "Spicy peppered beef served with steamed rice",
            fullDesc: "Tender chunks of beef cooked in our signature pepper sauce, served with fluffy steamed rice.",
            ingredients: ["Beef", "Bell peppers", "Scotch bonnets", "Onions", "Rice"],
            allergens: ["None"],
            category: "food"
        },
        {
            id: "food-6",
            name: "English Breakfast",
            price: 2800,
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400",
            shortDesc: "Full English breakfast with all the classics",
            fullDesc: "A hearty breakfast featuring eggs, bacon, sausages, baked beans, grilled tomatoes, and toast.",
            ingredients: ["Eggs", "Bacon", "Sausages", "Baked beans", "Tomatoes", "Bread"],
            allergens: ["Gluten", "Eggs"],
            category: "food"
        },
        {
            id: "food-7",
            name: "Chicken Shawarma",
            price: 1800,
            image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400",
            shortDesc: "Middle Eastern wrap with tender chicken",
            fullDesc: "Seasoned chicken wrapped in soft pita bread with fresh vegetables, pickles, and creamy garlic sauce.",
            ingredients: ["Chicken", "Pita bread", "Lettuce", "Tomatoes", "Garlic sauce", "Pickles"],
            allergens: ["Gluten", "Dairy"],
            category: "food"
        },
        {
            id: "food-8",
            name: "Fish & Chips",
            price: 2500,
            image: "https://images.unsplash.com/photo-1579208030886-b1a5ed1e9b28?w=400",
            shortDesc: "Crispy battered fish with golden fries",
            fullDesc: "Fresh fish fillet in crispy beer batter served with golden fries and tartar sauce.",
            ingredients: ["Fish fillet", "Flour", "Potatoes", "Tartar sauce"],
            allergens: ["Gluten", "Fish"],
            category: "food"
        }
    ],
    bread: [
        {
            id: "bread-1",
            name: "Artisan Sourdough",
            price: 1500,
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
            price: 800,
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
            price: 2000,
            image: "https://images.unsplash.com/photo-1609127102567-8a9a21dc27d8?w=400",
            shortDesc: "Soft rolls with cinnamon and cream cheese frosting",
            fullDesc: "Fluffy, warm cinnamon rolls swirled with cinnamon sugar and topped with rich cream cheese frosting.",
            ingredients: ["Flour", "Butter", "Cinnamon", "Sugar", "Cream cheese"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "bread"
        },
        {
            id: "bread-4",
            name: "Meat Pie (4 pcs)",
            price: 1600,
            image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400",
            shortDesc: "Flaky pastry filled with seasoned meat",
            fullDesc: "Golden flaky pastry pockets filled with well-seasoned minced meat and vegetables. A Nigerian favorite!",
            ingredients: ["Flour", "Butter", "Minced meat", "Potatoes", "Carrots", "Onions"],
            allergens: ["Gluten", "Dairy"],
            category: "bread"
        },
        {
            id: "bread-5",
            name: "Sausage Rolls (6 pcs)",
            price: 1500,
            image: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=400",
            shortDesc: "Crispy pastry wrapped around juicy sausage",
            fullDesc: "Perfectly seasoned sausage wrapped in golden, flaky puff pastry. Great as a snack or party food.",
            ingredients: ["Puff pastry", "Sausage meat", "Seasonings"],
            allergens: ["Gluten"],
            category: "bread"
        },
        {
            id: "bread-6",
            name: "Butter Croissants (3 pcs)",
            price: 1800,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
            shortDesc: "Buttery, flaky French pastries",
            fullDesc: "Light, airy croissants made with layers of butter-infused dough, baked to golden perfection.",
            ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"],
            allergens: ["Gluten", "Dairy"],
            category: "bread"
        },
        {
            id: "bread-7",
            name: "Whole Wheat Loaf",
            price: 1200,
            image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400",
            shortDesc: "Nutritious whole grain bread",
            fullDesc: "Hearty whole wheat bread packed with fiber and nutrients. Perfect for healthy sandwiches and toast.",
            ingredients: ["Whole wheat flour", "Water", "Yeast", "Honey", "Salt"],
            allergens: ["Gluten"],
            category: "bread"
        },
        {
            id: "bread-8",
            name: "Coconut Bread",
            price: 1000,
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
            price: 15000,
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
            price: 18000,
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
            name: "Red Velvet Cake",
            price: 16000,
            image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400",
            shortDesc: "Iconic red cake with cream cheese frosting",
            fullDesc: "The classic red velvet cake with its subtle chocolate flavor, paired with luxurious cream cheese frosting.",
            ingredients: ["Flour", "Cocoa", "Buttermilk", "Cream cheese", "Butter"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: true,
            sizes: ["6 inch", "8 inch", "10 inch"],
            flavors: ["Classic Red Velvet"]
        },
        {
            id: "cake-4",
            name: "Wedding Cake (Custom)",
            price: 50000,
            image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400",
            shortDesc: "Elegant multi-tiered wedding cake",
            fullDesc: "Beautifully crafted multi-tiered wedding cake, fully customizable to match your special day. Includes consultation and delivery.",
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
            price: 8000,
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
            name: "New York Cheesecake",
            price: 12000,
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
            shortDesc: "Creamy classic cheesecake",
            fullDesc: "Rich and creamy New York style cheesecake on a buttery graham cracker crust. Simply divine!",
            ingredients: ["Cream cheese", "Eggs", "Sugar", "Graham crackers", "Butter"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: false
        },
        {
            id: "cake-7",
            name: "Glazed Doughnuts (6 pcs)",
            price: 3000,
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
            name: "Chocolate Chip Cookies (12 pcs)",
            price: 2500,
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
            shortDesc: "Chewy cookies loaded with chocolate",
            fullDesc: "Soft and chewy cookies packed with premium chocolate chips. Baked fresh daily.",
            ingredients: ["Flour", "Butter", "Brown sugar", "Chocolate chips", "Eggs"],
            allergens: ["Gluten", "Dairy", "Eggs"],
            category: "cake",
            customizable: false
        }
    ]
};

// Delivery fee
const DELIVERY_FEE = 500;

// Format currency in Naira
function formatPrice(price) {
    return "₦" + price.toLocaleString();
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
