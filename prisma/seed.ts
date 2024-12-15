const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.orderItem.deleteMany({});
    await prisma.orderHistory.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.user.deleteMany({});

    // Create menu items and store their IDs
    const menuItemsData = [
        { name: "Espresso", description: "Strong black coffee in small serving", price: 25000.0, image_url: "@/images/Espresso/1.jpg", is_available: true },
        { name: "Cappuccino", description: "Espresso with steamed milk foam", price: 25000.0, image_url: "@/images/Cappuccino/1.jpg", is_available: true },
        { name: "Cafe Latte", description: "Espresso with steamed milk", price: 23000.0, image_url: "@/images/Espresso/2.jpg", is_available: true },
        { name: "Americano", description: "Espresso diluted with hot water", price: 20000.0, image_url: "@/images/americano/1.jpeg", is_available: true },
        { name: "Mocha", description: "Espresso with chocolate and steamed milk", price: 27000.0, image_url: "@/images/mocha/1.jpg", is_available: true },
    ];

    const menuItems = [];
    for (const item of menuItemsData) {
        const createdItem = await prisma.menuItem.create({
            data: item,
        });
        menuItems.push(createdItem);
    }

    console.log("Seeded MenuItems: ", menuItems);

    // Create users
    const user1 = await prisma.user.create({
        data: {
            email: "user1@example.com",
            password_hash: "hashedpassword1",
            phone_number: "08123456789",
            first_name: "John",
            last_name: "Doe",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "user2@example.com",
            password_hash: "hashedpassword2",
            phone_number: "08198765432",
            first_name: "Jane",
            last_name: "Smith",
        },
    });

    console.log("Seeded Users: ", user1, user2);

    // Create orders
    const order1 = await prisma.order.create({
        data: {
            user_id: user1.user_id,
            order_status: "COMPLETED",
            total_price: 73000.0, // Example total price
        },
    });

    const order2 = await prisma.order.create({
        data: {
            user_id: user2.user_id,
            order_status: "PENDING",
            total_price: 47000.0, // Example total price
        },
    });

    console.log("Seeded Orders: ", order1, order2);

    // Create order items using the actual menu item IDs
    const orderItemsData = [
        { order_id: order1.order_id, item_id: menuItems[0].item_id, quantity: 2, customizations: "Extra shot", price_at_time: 25000.0, subtotal: 50000.0 },
        { order_id: order1.order_id, item_id: menuItems[2].item_id, quantity: 1, customizations: "No sugar", price_at_time: 23000.0, subtotal: 23000.0 },
        { order_id: order2.order_id, item_id: menuItems[1].item_id, quantity: 1, customizations: "Whipped cream", price_at_time: 25000.0, subtotal: 25000.0 },
        { order_id: order2.order_id, item_id: menuItems[3].item_id, quantity: 1, customizations: "Double shot", price_at_time: 20000.0, subtotal: 20000.0 },
    ];

    for (const orderItem of orderItemsData) {
        await prisma.orderItem.create({
            data: orderItem,
        });
    }

    console.log("Seeded OrderItems.");

    // Create order history entries
    const orderHistoryData = [
        { user_id: user1.user_id, order_id: order1.order_id },
        { user_id: user2.user_id, order_id: order2.order_id },
    ];

    for (const history of orderHistoryData) {
        await prisma.orderHistory.create({
            data: history,
        });
    }

    console.log("Seeded OrderHistory.");
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
