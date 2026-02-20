import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@crestfoods.com.au" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@crestfoods.com.au",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // Create categories
  const food = await prisma.category.upsert({
    where: { slug: "food" },
    update: {},
    create: {
      name: "Food",
      slug: "food",
      description:
        "Delicious Nigerian-Australian fusion meals, hearty mains, and classic favourites",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      colorPrimary: "#e74c3c",
      colorSecondary: "#c0392b",
      colorBg: "#fef5f4",
      sortOrder: 1,
    },
  });

  const bread = await prisma.category.upsert({
    where: { slug: "bread" },
    update: {},
    create: {
      name: "Bread & Pastries",
      slug: "bread",
      description:
        "Freshly baked artisan breads, pastries, and savoury delights",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      colorPrimary: "#d4a853",
      colorSecondary: "#b8860b",
      colorBg: "#fdf8e8",
      sortOrder: 2,
    },
  });

  const cake = await prisma.category.upsert({
    where: { slug: "cakes" },
    update: {},
    create: {
      name: "Cakes & Confections",
      slug: "cakes",
      description:
        "Custom cakes, sweet treats, and confectionary delights for every occasion",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      colorPrimary: "#e91e8c",
      colorSecondary: "#c71585",
      colorBg: "#fdf0f7",
      sortOrder: 3,
    },
  });

  const drinks = await prisma.category.upsert({
    where: { slug: "drinks" },
    update: {},
    create: {
      name: "Drinks",
      slug: "drinks",
      description:
        "Refreshing beverages, smoothies, coffees, and specialty drinks",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
      colorPrimary: "#3498db",
      colorSecondary: "#2980b9",
      colorBg: "#f0f7fd",
      sortOrder: 4,
    },
  });

  // Food products
  const foodProducts = [
    {
      name: "Jollof Rice with Chicken",
      slug: "jollof-rice-chicken",
      description: "Our signature West African classic with perfectly spiced tomato rice and crispy fried chicken",
      fullDesc: "Experience the rich, aromatic flavours of our signature Jollof Rice, slow-cooked in a blend of tomatoes, peppers, and traditional West African spices. Served with golden crispy fried chicken that is marinated for 24 hours in our secret spice blend. A CrestFoods favourite that brings the best of Nigerian cuisine to Melbourne.",
      price: 24.9,
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
      ingredients: JSON.stringify(["Basmati rice", "Tomatoes", "Scotch bonnet peppers", "Onions", "Chicken", "Spice blend", "Vegetable oil"]),
      allergens: JSON.stringify(["May contain traces of nuts"]),
      sortOrder: 1,
    },
    {
      name: "Fried Rice & Plantain",
      slug: "fried-rice-plantain",
      description: "Flavourful fried rice with mixed vegetables, served with sweet fried plantain",
      fullDesc: "Our Nigerian-style fried rice is a vibrant medley of perfectly seasoned rice stir-fried with fresh vegetables, prawns, and our special seasoning. Accompanied by sweet, caramelised fried plantain that adds the perfect touch of sweetness.",
      price: 22.9,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      ingredients: JSON.stringify(["Rice", "Mixed vegetables", "Prawns", "Plantain", "Seasoning", "Vegetable oil"]),
      allergens: JSON.stringify(["Shellfish", "May contain traces of nuts"]),
      sortOrder: 2,
    },
    {
      name: "Peppered Beef & Rice",
      slug: "peppered-beef-rice",
      description: "Tender beef strips in a fiery pepper sauce with steamed rice",
      fullDesc: "Succulent strips of premium Australian beef, slow-cooked in a rich, fiery pepper sauce made with a blend of scotch bonnet and bell peppers. Served on a bed of fluffy steamed jasmine rice.",
      price: 26.9,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
      ingredients: JSON.stringify(["Beef strips", "Bell peppers", "Scotch bonnet", "Onions", "Jasmine rice", "Tomato paste"]),
      allergens: JSON.stringify([]),
      sortOrder: 3,
    },
    {
      name: "Aussie Meat Pie with Mash",
      slug: "aussie-meat-pie-mash",
      description: "Classic Australian meat pie with creamy mashed potato and gravy",
      fullDesc: "A true Aussie classic - flaky golden pastry filled with slow-cooked seasoned beef mince in rich gravy. Served with creamy mashed potatoes, mushy peas, and a generous pour of our homemade gravy.",
      price: 18.9,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
      ingredients: JSON.stringify(["Beef mince", "Pastry", "Potatoes", "Butter", "Peas", "Gravy"]),
      allergens: JSON.stringify(["Gluten", "Dairy"]),
      sortOrder: 4,
    },
    {
      name: "Barramundi & Chips",
      slug: "barramundi-chips",
      description: "Beer-battered barramundi with golden chips and tartare sauce",
      fullDesc: "Fresh Australian barramundi fillet coated in a light, crispy beer batter, fried to golden perfection. Served with thick-cut golden chips, house-made tartare sauce, and a lemon wedge.",
      price: 28.9,
      image: "https://images.unsplash.com/photo-1580217593608-61931ceacfb8?w=800",
      ingredients: JSON.stringify(["Barramundi", "Beer batter", "Potatoes", "Tartare sauce", "Lemon"]),
      allergens: JSON.stringify(["Fish", "Gluten", "Eggs"]),
      sortOrder: 5,
    },
    {
      name: "Chicken Parmigiana",
      slug: "chicken-parmigiana",
      description: "Crumbed chicken breast topped with napoli sauce, ham, and melted cheese",
      fullDesc: "A pub-style favourite - tender chicken breast coated in golden breadcrumbs, topped with our house-made napoli sauce, shaved ham, and a generous blanket of melted mozzarella cheese. Served with chips and garden salad.",
      price: 26.9,
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800",
      ingredients: JSON.stringify(["Chicken breast", "Breadcrumbs", "Napoli sauce", "Ham", "Mozzarella", "Chips"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sortOrder: 6,
    },
    {
      name: "Grilled Lamb Cutlets",
      slug: "grilled-lamb-cutlets",
      description: "Premium lamb cutlets with rosemary, served with roasted vegetables",
      fullDesc: "Four premium Australian lamb cutlets, marinated in rosemary and garlic, grilled to your preference. Served with seasonal roasted vegetables and a mint jus.",
      price: 34.9,
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800",
      ingredients: JSON.stringify(["Lamb cutlets", "Rosemary", "Garlic", "Seasonal vegetables", "Mint jus"]),
      allergens: JSON.stringify([]),
      sortOrder: 7,
    },
    {
      name: "Big Brekkie",
      slug: "big-brekkie",
      description: "The full Australian breakfast with eggs, bacon, sausages, and toast",
      fullDesc: "Start your day the Aussie way - two free-range eggs cooked your way, crispy bacon rashers, pork sausages, grilled tomato, sautéed mushrooms, hash browns, baked beans, and thick sourdough toast.",
      price: 24.9,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
      ingredients: JSON.stringify(["Eggs", "Bacon", "Sausages", "Tomato", "Mushrooms", "Hash browns", "Beans", "Sourdough"]),
      allergens: JSON.stringify(["Gluten", "Eggs", "Dairy"]),
      sortOrder: 8,
    },
    {
      name: "Suya Skewers",
      slug: "suya-skewers",
      description: "Spicy Nigerian beef skewers with peanut spice rub and fresh onions",
      fullDesc: "Traditional Nigerian street food elevated - tender beef pieces coated in our signature suya spice (yaji) blend, grilled over charcoal. Served with sliced onions, tomatoes, and spicy pepper sauce.",
      price: 19.9,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      ingredients: JSON.stringify(["Beef", "Suya spice (yaji)", "Peanuts", "Onions", "Tomatoes", "Pepper sauce"]),
      allergens: JSON.stringify(["Peanuts"]),
      sortOrder: 9,
    },
    {
      name: "Chicken Shawarma",
      slug: "chicken-shawarma",
      description: "Marinated chicken in fresh flatbread with garlic sauce and pickles",
      fullDesc: "Juicy chicken thigh marinated in a blend of Middle Eastern spices, slow-roasted on a vertical spit. Wrapped in warm flatbread with crunchy lettuce, pickles, tomatoes, and our signature garlic cream sauce.",
      price: 16.9,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
      ingredients: JSON.stringify(["Chicken thigh", "Flatbread", "Lettuce", "Pickles", "Tomatoes", "Garlic sauce"]),
      allergens: JSON.stringify(["Gluten", "Dairy"]),
      sortOrder: 10,
    },
  ];

  // Bread products
  const breadProducts = [
    {
      name: "Artisan Sourdough",
      slug: "artisan-sourdough",
      description: "Traditional 48-hour fermented sourdough with a crispy crust",
      fullDesc: "Our signature artisan sourdough is made using a 48-hour fermentation process with our house-maintained starter. The result is a beautifully crusty loaf with a soft, tangy interior.",
      price: 9.9,
      image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=800",
      ingredients: JSON.stringify(["Flour", "Water", "Salt", "Sourdough starter"]),
      allergens: JSON.stringify(["Gluten"]),
      sortOrder: 1,
    },
    {
      name: "French Baguette",
      slug: "french-baguette",
      description: "Crispy, golden baguette baked fresh every morning",
      fullDesc: "Authentic French-style baguette with a shatteringly crisp crust and light, airy interior. Baked fresh throughout the day using traditional French baking techniques.",
      price: 6.5,
      image: "https://images.unsplash.com/photo-1549931319-a545753d62ce?w=800",
      ingredients: JSON.stringify(["Flour", "Water", "Yeast", "Salt"]),
      allergens: JSON.stringify(["Gluten"]),
      sortOrder: 2,
    },
    {
      name: "Cinnamon Rolls (6 pcs)",
      slug: "cinnamon-rolls-6",
      description: "Soft, fluffy rolls with cinnamon filling and cream cheese glaze",
      fullDesc: "Six irresistible cinnamon rolls made from soft, pillowy brioche dough, filled with buttery cinnamon sugar and topped with a luscious cream cheese glaze.",
      price: 18.9,
      image: "https://images.unsplash.com/photo-1609127843989-49c7d73c2415?w=800",
      ingredients: JSON.stringify(["Flour", "Butter", "Sugar", "Cinnamon", "Cream cheese", "Eggs"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sortOrder: 3,
    },
    {
      name: "Nigerian Meat Pie (4 pcs)",
      slug: "nigerian-meat-pie-4",
      description: "Flaky pastry filled with seasoned minced beef and vegetables",
      fullDesc: "Four golden, flaky meat pies filled with a savoury mixture of seasoned minced beef, potatoes, and carrots. A beloved Nigerian snack made with love.",
      price: 16.9,
      image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=800",
      ingredients: JSON.stringify(["Flour", "Butter", "Beef mince", "Potatoes", "Carrots", "Seasoning"]),
      allergens: JSON.stringify(["Gluten", "Dairy"]),
      sortOrder: 4,
    },
    {
      name: "Sausage Rolls (6 pcs)",
      slug: "sausage-rolls-6",
      description: "Flaky puff pastry filled with seasoned pork and herb filling",
      fullDesc: "Six classic Aussie sausage rolls made with flaky, buttery puff pastry wrapped around a seasoned pork and herb filling. Perfect for a quick lunch or party snack.",
      price: 14.9,
      image: "https://images.unsplash.com/photo-1585535758534-aca8a6b8b3a5?w=800",
      ingredients: JSON.stringify(["Puff pastry", "Pork mince", "Herbs", "Onion", "Breadcrumbs"]),
      allergens: JSON.stringify(["Gluten", "Dairy"]),
      sortOrder: 5,
    },
    {
      name: "Butter Croissants (3 pcs)",
      slug: "butter-croissants-3",
      description: "Classic French butter croissants, golden and flaky",
      fullDesc: "Three authentic French butter croissants made with premium European butter, laminated by hand for 27 delicate layers of flaky, golden pastry.",
      price: 12.9,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=800",
      ingredients: JSON.stringify(["Flour", "Butter", "Sugar", "Yeast", "Salt", "Eggs"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sortOrder: 6,
    },
    {
      name: "Damper Bread",
      slug: "damper-bread",
      description: "Traditional Australian bush bread, rustic and hearty",
      fullDesc: "Traditional Australian damper bread, a rustic and hearty loaf that pays homage to Australia's bush heritage. Made with simple ingredients for a dense, satisfying bread.",
      price: 8.9,
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800",
      ingredients: JSON.stringify(["Self-raising flour", "Butter", "Milk", "Salt"]),
      allergens: JSON.stringify(["Gluten", "Dairy"]),
      sortOrder: 7,
    },
    {
      name: "Coconut Bread",
      slug: "coconut-bread",
      description: "Sweet, moist bread with real coconut flavour",
      fullDesc: "A sweet, moist loaf infused with coconut milk and topped with toasted coconut flakes. A beloved treat inspired by Nigerian and Caribbean baking traditions.",
      price: 8.5,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      ingredients: JSON.stringify(["Flour", "Coconut milk", "Sugar", "Coconut flakes", "Eggs"]),
      allergens: JSON.stringify(["Gluten", "Eggs", "Tree nuts"]),
      sortOrder: 8,
    },
  ];

  // Cake products
  const cakeProducts = [
    {
      name: "Classic Birthday Cake",
      slug: "classic-birthday-cake",
      description: "Three-layer vanilla sponge with buttercream frosting",
      fullDesc: "A stunning three-layer vanilla sponge cake, filled and frosted with silky smooth buttercream. Available in multiple sizes and flavours. Custom decorations and messages available.",
      price: 65.0,
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
      ingredients: JSON.stringify(["Flour", "Sugar", "Butter", "Eggs", "Vanilla", "Buttercream"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sizes: JSON.stringify(["6 inch", "8 inch", "10 inch", "12 inch"]),
      flavors: JSON.stringify(["Vanilla", "Chocolate", "Red Velvet", "Lemon"]),
      sortOrder: 1,
    },
    {
      name: "Chocolate Truffle Cake",
      slug: "chocolate-truffle-cake",
      description: "Rich chocolate cake with dark chocolate ganache",
      fullDesc: "An indulgent chocolate lover's dream - moist, rich chocolate sponge layers sandwiched with velvety dark chocolate ganache and finished with a glossy chocolate mirror glaze.",
      price: 75.0,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      ingredients: JSON.stringify(["Dark chocolate", "Flour", "Sugar", "Butter", "Eggs", "Cocoa", "Cream"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs", "Soy"]),
      sizes: JSON.stringify(["6 inch", "8 inch", "10 inch"]),
      flavors: JSON.stringify(["Dark Chocolate", "Milk Chocolate", "White Chocolate"]),
      sortOrder: 2,
    },
    {
      name: "Lamington Cake",
      slug: "lamington-cake",
      description: "Classic Aussie lamington in cake form with chocolate and coconut",
      fullDesc: "Our take on Australia's beloved lamington - layers of light vanilla sponge, dipped in chocolate and coated in desiccated coconut, with a layer of strawberry jam and cream.",
      price: 55.0,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
      ingredients: JSON.stringify(["Flour", "Sugar", "Eggs", "Chocolate", "Coconut", "Jam", "Cream"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs", "Tree nuts"]),
      sizes: JSON.stringify(["8 inch", "10 inch"]),
      flavors: JSON.stringify(["Classic", "Chocolate", "Raspberry"]),
      sortOrder: 3,
    },
    {
      name: "Wedding Cake (Custom)",
      slug: "wedding-cake-custom",
      description: "Elegant custom wedding cakes designed to your vision",
      fullDesc: "Create the wedding cake of your dreams with our expert bakers. Starting from a classic three-tier design, every element can be customised. Consultation and tasting included.",
      price: 350.0,
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800",
      ingredients: JSON.stringify(["Premium ingredients", "Custom to order"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sizes: JSON.stringify(["2 Tier", "3 Tier", "4 Tier", "5 Tier"]),
      flavors: JSON.stringify(["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Carrot"]),
      sortOrder: 4,
    },
    {
      name: "Cupcakes (Box of 12)",
      slug: "cupcakes-box-12",
      description: "Assorted gourmet cupcakes with buttercream swirls",
      fullDesc: "A beautiful box of 12 gourmet cupcakes, each topped with a generous swirl of flavoured buttercream. Perfect for parties, gifts, or just because.",
      price: 48.0,
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800",
      ingredients: JSON.stringify(["Flour", "Sugar", "Butter", "Eggs", "Buttercream", "Decorations"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sizes: JSON.stringify(["Box of 6", "Box of 12", "Box of 24"]),
      flavors: JSON.stringify(["Mixed", "All Chocolate", "All Vanilla", "All Red Velvet"]),
      sortOrder: 5,
    },
    {
      name: "Pavlova",
      slug: "pavlova",
      description: "Classic Aussie pavlova with fresh cream and seasonal fruits",
      fullDesc: "A magnificent crispy-on-the-outside, marshmallow-on-the-inside pavlova, topped with billows of fresh whipped cream and a cascade of seasonal fruits and passionfruit pulp.",
      price: 45.0,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      ingredients: JSON.stringify(["Egg whites", "Sugar", "Cream", "Seasonal fruits", "Passionfruit"]),
      allergens: JSON.stringify(["Eggs", "Dairy"]),
      sortOrder: 6,
    },
    {
      name: "Glazed Doughnuts (6 pcs)",
      slug: "glazed-doughnuts-6",
      description: "Light, fluffy doughnuts with a sweet glaze",
      fullDesc: "Six light and fluffy ring doughnuts, freshly fried and dipped in a sweet vanilla glaze. Simple perfection.",
      price: 18.0,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
      ingredients: JSON.stringify(["Flour", "Sugar", "Yeast", "Milk", "Eggs", "Vanilla glaze"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs"]),
      sortOrder: 7,
    },
    {
      name: "Tim Tam Cheesecake",
      slug: "tim-tam-cheesecake",
      description: "Creamy baked cheesecake with Tim Tam biscuit base and topping",
      fullDesc: "An indulgent baked cheesecake with a crushed Tim Tam biscuit base, creamy chocolate cheesecake filling, and topped with Tim Tam pieces and chocolate drizzle. An Aussie twist on a classic dessert.",
      price: 55.0,
      image: "https://images.unsplash.com/photo-1524351199432-d330b3a5f655?w=800",
      ingredients: JSON.stringify(["Cream cheese", "Tim Tam biscuits", "Sugar", "Eggs", "Chocolate", "Cream"]),
      allergens: JSON.stringify(["Gluten", "Dairy", "Eggs", "Soy"]),
      sortOrder: 8,
    },
  ];

  // Drink products
  const drinkProducts = [
    {
      name: "Flat White",
      slug: "flat-white",
      description: "Classic Australian flat white with velvety microfoam",
      fullDesc: "Our signature flat white made with a double shot of premium espresso and velvety steamed milk with a thin layer of microfoam. The quintessential Aussie coffee.",
      price: 5.5,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800",
      ingredients: JSON.stringify(["Espresso", "Steamed milk"]),
      allergens: JSON.stringify(["Dairy"]),
      sortOrder: 1,
    },
    {
      name: "Mango Smoothie",
      slug: "mango-smoothie",
      description: "Fresh mango blended with yoghurt and honey",
      fullDesc: "A refreshing tropical smoothie made with fresh Australian mangoes, creamy Greek yoghurt, a touch of honey, and ice. Pure sunshine in a glass.",
      price: 8.9,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800",
      ingredients: JSON.stringify(["Mango", "Greek yoghurt", "Honey", "Ice"]),
      allergens: JSON.stringify(["Dairy"]),
      sortOrder: 2,
    },
    {
      name: "Fresh Orange Juice",
      slug: "fresh-orange-juice",
      description: "Freshly squeezed Australian oranges",
      fullDesc: "Freshly squeezed juice from premium Australian navel oranges. No added sugar, no preservatives - just pure, fresh orange juice.",
      price: 7.5,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800",
      ingredients: JSON.stringify(["Fresh oranges"]),
      allergens: JSON.stringify([]),
      sortOrder: 3,
    },
    {
      name: "Iced Chocolate",
      slug: "iced-chocolate",
      description: "Rich chocolate milk blended with ice and topped with cream",
      fullDesc: "A decadent iced chocolate made with premium Belgian chocolate, blended with ice and topped with whipped cream and chocolate shavings.",
      price: 7.9,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
      ingredients: JSON.stringify(["Chocolate", "Milk", "Ice", "Whipped cream"]),
      allergens: JSON.stringify(["Dairy", "Soy"]),
      sortOrder: 4,
    },
  ];

  // Insert products
  for (const p of foodProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, categoryId: food.id },
    });
  }
  for (const p of breadProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, categoryId: bread.id },
    });
  }
  for (const p of cakeProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, categoryId: cake.id },
    });
  }
  for (const p of drinkProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, categoryId: drinks.id },
    });
  }

  // Site settings
  const settings = [
    { key: "site_name", value: "CrestFoods" },
    { key: "site_tagline", value: "Your one-stop destination for delicious food, freshly baked bread, and custom cakes" },
    { key: "delivery_fee", value: "8.00" },
    { key: "free_delivery_minimum", value: "50.00" },
    { key: "phone", value: "(03) 9123 4567" },
    { key: "email", value: "hello@crestfoods.com.au" },
    { key: "address", value: "42 Collins Street, Melbourne VIC 3000" },
    { key: "hours_weekday", value: "Mon-Fri: 7:00 AM - 9:00 PM" },
    { key: "hours_saturday", value: "Sat: 8:00 AM - 10:00 PM" },
    { key: "hours_sunday", value: "Sun: 9:00 AM - 8:00 PM" },
    { key: "hero_title", value: "Delicious Food, Freshly Made" },
    { key: "hero_subtitle", value: "Experience the best of Nigerian-Australian fusion cuisine, artisan breads, and custom cakes — all made with love in Melbourne." },
    { key: "hero_image", value: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600" },
    { key: "about_text", value: "At CrestFoods, we bring together the best of Nigerian and Australian culinary traditions. From our signature Jollof Rice to classic Aussie meat pies, every dish is prepared with the freshest ingredients and a whole lot of love." },
    { key: "currency_symbol", value: "$" },
    { key: "currency_code", value: "AUD" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
