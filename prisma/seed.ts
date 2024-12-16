const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.orderItem.deleteMany({});
    await prisma.orderHistory.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.user.deleteMany({});
  
    const menuItemsData = [
      // Espresso variants
      { name: "Espresso Classic", description: "Strong black coffee in small serving", price: 25000.0, image_url: "https://eldioniswestminster.com/wp-content/uploads/2024/11/ec178d83e5f597b162cda1e60cb64194.png", is_available: true },
      { name: "Espresso Double", description: "Double shot of espresso for a stronger taste", price: 28000.0, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMJFbrtHau3DMlgnDTva6TK23n48G7FsC8lHVPiKvUrnkco3EwxWLYBD1CcbHoOJM0B0&usqp=CAU", is_available: true },
      { name: "Espresso Ristretto", description: "A more concentrated version of espresso", price: 27000.0, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLfQaF9syeejbpTzrWKbCKcFUSqeKS9Aqqw&s", is_available: true },
      { name: "Espresso Lungo", description: "Espresso with more water for a milder taste", price: 26000.0, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQFoaapT_Cwsq5dcnVaS57lC0j-kp-_xYLQ&s", is_available: true },
    
      // Cappuccino variants
      { name: "Cappuccino Classic", description: "Espresso with steamed milk foam", price: 25000.0, image_url: "https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg?v=1701189122", is_available: true },
      { name: "Cappuccino Vanilla", description: "Cappuccino with a hint of vanilla flavor", price: 27000.0, image_url: "https://www.caffesociety.co.uk/assets/recipe-images/cappuccino-small.jpg", is_available: true },
      { name: "Cappuccino Mocha", description: "Cappuccino with chocolate syrup", price: 28000.0, image_url: "https://recettes.vedrenne.fr/1269-medium_default/gingerbread-cappuccino.jpg", is_available: true },
      { name: "Cappuccino Caramel", description: "Cappuccino with caramel syrup", price: 29000.0, image_url: "https://www.castironketo.net/wp-content/uploads/2023/10/is-cappuccino-espresso-keto-friendly-header-image.jpg", is_available: true },
    
      // Cafe Latte variants
      { name: "Cafe Latte Classic", description: "Espresso with steamed milk", price: 23000.0, image_url: "https://www.allrecipes.com/thmb/0lmwtmIpBcxM-EHM71vW-NmB9eo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/96629-cafe-latte-ddmfs-hero-2x1-52ced4a6ce4f42b2ac3c18a2c9d85be6.jpg", is_available: true },
      { name: "Cafe Latte Vanilla", description: "Cafe latte with vanilla syrup", price: 25000.0, image_url: "https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg", is_available: true },
      { name: "Cafe Latte Hazelnut", description: "Cafe latte with hazelnut syrup", price: 26000.0, image_url: "https://asset.kompas.com/crops/N6R6BU6e6q_bpFOxVTl4WReHXbc=/101x66:899x599/1200x800/data/photo/2023/04/08/6431098ec2fdf.jpg", is_available: true },
      { name: "Cafe Latte Cinnamon", description: "Cafe latte with a dash of cinnamon", price: 24000.0, image_url: "https://coffee-dictionary.com/wp-content/uploads/cafe-latte.jpg", is_available: true },
    
      // Americano variants
      { name: "Americano Classic", description: "Espresso diluted with hot water", price: 20000.0, image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-54187613/freshly_baked_by_origin_bakery_americano_full02_kd07blpv.jpg", is_available: true },
      { name: "Americano Iced", description: "Iced Americano for a refreshing twist", price: 22000.0, image_url: "https://fibercreme.com/wp-content/uploads/2024/10/Sub-1.jpg", is_available: true },
      { name: "Americano Black", description: "Americano with no added water for a stronger taste", price: 21000.0, image_url: "https://elfuego.uk/wp-content/uploads/2019/11/Americano-Black-coffee.jpg", is_available: true },
      { name: "Americano Honey", description: "Americano with a touch of honey", price: 23000.0, image_url: "https://balancecoffee.co.uk/cdn/shop/articles/black-coffee-americano.jpg?v=1699069380", is_available: true },
    
      // Mocha variants
      { name: "Mocha Classic", description: "Espresso with chocolate and steamed milk", price: 27000.0, image_url: "https://www.folgerscoffee.com/folgers/recipes/_Hero%20Images/Detail%20Pages/6330/image-thumb__6330__schema_image/CafeMocha-hero.61028a28.jpg", is_available: true },
      { name: "Mocha White", description: "Mocha with white chocolate", price: 29000.0, image_url: "https://hoxtoncoffee.com/cdn/shop/articles/latte-art-on-mocha_1200x1200.jpg?v=1660069726", is_available: true },
      { name: "Mocha Mint", description: "Mocha with mint flavor", price: 30000.0, image_url: "https://www.mommyhatescooking.com/wp-content/uploads/2023/10/mocha-4-scaled.jpg", is_available: true },
      { name: "Mocha Caramel", description: "Mocha with caramel flavor", price: 31000.0, image_url: "https://www.mommyhatescooking.com/wp-content/uploads/2023/10/mocha-4-scaled.jpg", is_available: true }
    ];
    
    const menuItems = [];
    for (const item of menuItemsData) {
      const createdItem = await prisma.menuItem.create({
        data: item,
      });
      menuItems.push(createdItem);
    }
  
    console.log("Seeded MenuItems: ", menuItems);
  
    // // Create users
    // const user1 = await prisma.user.create({
    //   data: {
    //     email: "user1@example.com",
    //     password_hash: "hashedpassword1",
    //     phone_number: "08123456789",
    //     first_name: "John",
    //     last_name: "Doe",
    //   },
    // });
  
    // const user2 = await prisma.user.create({
    //   data: {
    //     email: "user2@example.com",
    //     password_hash: "hashedpassword2",
    //     phone_number: "08198765432",
    //     first_name: "Jane",
    //     last_name: "Smith",
    //   },
    // });
  
    // console.log("Seeded Users: ", user1, user2);
  
//     // Create orders
//     const order1 = await prisma.order.create({
//       data: {
//         user_id: user1.user_id,
//         order_status: "completed",
//         total_price: 72000.0,
//         created_at: new Date(),
//       },
//     });
  
//     const order2 = await prisma.order.create({
//       data: {
//         user_id: user2.user_id,
//         order_status: "pending",
//         total_price: 45000.0,
//         created_at: new Date(),
//       },
//     });
  
//     console.log("Seeded Orders: ", order1, order2);
  
//     // Create order items using the actual menu item IDs
//     const orderItemsData = [
//       { order_id: order1.order_id, item_id: menuItems[0].item_id, quantity: 2, customizations: "Extra shot", price: 50000.0 },
//       { order_id: order1.order_id, item_id: menuItems[2].item_id, quantity: 1, customizations: "No sugar", price: 23000.0 },
//       { order_id: order2.order_id, item_id: menuItems[1].item_id, quantity: 1, customizations: "Whipped cream", price: 27000.0 },
//       { order_id: order2.order_id, item_id: menuItems[3].item_id, quantity: 1, customizations: "Double shot", price: 20000.0 },
//     ];
  
//     for (const orderItem of orderItemsData) {
//       await prisma.orderItem.create({
//         data: orderItem,
//       });
//     }
  
//     console.log("Seeded OrderItems.");
  
//     // Create order history entries
//     const orderHistoryData = [
//       { user_id: user1.user_id, order_id: order1.order_id, created_at: new Date() },
//       { user_id: user2.user_id, order_id: order2.order_id, created_at: new Date() },
//     ];

//     for (const history of orderHistoryData) {
//       await prisma.orderHistory.create({
//         data: history,
//       });
//     }
  
//     console.log("Seeded OrderHistory.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
