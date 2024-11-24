import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './Espresso/menu.jpg';  
import menu_2 from './Cappuccino/menu.jpg'; 
import menu_3 from './Americano/menu.jpg'; 
import menu_4 from './Mocha/menu.jpg';      
import menu_5 from './ColdBrew/menu.jpeg';   
import menu_6 from './MilkCoffee/menu.jpg'; 
import menu_7 from './TraditionalCoffee/menu.jpg';
import menu_8 from './NonCoffee/menu.jpg';  

import food_11 from './Espresso/1.jpg';
import food_12 from './Espresso/2.jpg';
import food_13 from './Espresso/3.jpeg';
import food_14 from './Espresso/4.jpg';
import food_15 from './Espresso/5.jpg';

import food_21 from './Cappuccino/1.jpg';
import food_22 from './Cappuccino/2.jpeg';
import food_23 from './Cappuccino/3.jpeg';
import food_24 from './Cappuccino/4.jpeg';
import food_25 from './Cappuccino/5.jpeg';

import food_31 from './Americano/1.jpeg';
import food_32 from './Americano/2.jpg';
import food_33 from './Americano/3.jpg';
import food_34 from './Americano/4.jpg';
import food_35 from './Americano/5.jpg';

import food_41 from './Mocha/1.jpg';
import food_42 from './Mocha/2.jpg';
import food_43 from './Mocha/3.jpg';
import food_44 from './Mocha/4.jpg';
import food_45 from './Mocha/5.jpeg';

import food_51 from './ColdBrew/1.jpeg';
import food_52 from './ColdBrew/2.jpeg';
import food_53 from './ColdBrew/3.jpg';
import food_54 from './ColdBrew/4.png';
import food_55 from './ColdBrew/5.jpg';

import food_61 from './MilkCoffee/1.jpg';
import food_62 from './MilkCoffee/2.jpg';
import food_63 from './MilkCoffee/3.jpg';
import food_64 from './MilkCoffee/4.jpg';
import food_65 from './MilkCoffee/5.jpeg';

import food_71 from './TraditionalCoffee/1.jpg';
import food_72 from './TraditionalCoffee/2.jpg';
import food_73 from './TraditionalCoffee/3.jpg';
import food_74 from './TraditionalCoffee/4.jpg';
import food_75 from './TraditionalCoffee/5.jpg';

import food_81 from './NonCoffee/1.jpg';
import food_82 from './NonCoffee/2.jpg';
import food_83 from './NonCoffee/3.jpg';
import food_84 from './NonCoffee/4.jpeg';
import food_85 from './NonCoffee/5.jpg';


import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Espresso",
        menu_image: menu_1
    },
    {
        menu_name: "Cappuccino",
        menu_image: menu_2
    },
    {
        menu_name: "Americano",
        menu_image: menu_3
    },
    {
        menu_name: "Mocha",
        menu_image: menu_4
    },
    {
        menu_name: "Cold Brew",
        menu_image: menu_5
    },    
    {
        menu_name: "Milk Coffee",
        menu_image: menu_6
    },
    {
        menu_name: "Traditional Coffee",
        menu_image: menu_7
    },
    {
        menu_name: "Non Coffee",
        menu_image: menu_8
    }
];
export const food_list = [
    // Espresso Menu
    {
        _id: "101",
        name: "Classic Espresso",
        image: food_11,
        price: 5,
        description: "Rich and bold shot of espresso, perfect to start your day.",
        category: "Espresso"
    },
    {
        _id: "102",
        name: "Double Shot Espresso",
        image: food_12,
        price: 7,
        description: "A double shot of pure espresso for the bold coffee lover.",
        category: "Espresso"
    },
    {
        _id: "103",
        name: "Espresso Macchiato",
        image: food_13,
        price: 18,
        description: "A rich espresso with a touch of milk foam.",
        category: "Espresso"
    },
    {
        _id: "104",
        name: "Cortado",
        image: food_14,
        price: 17,
        description: "A balance of espresso and steamed milk in perfect harmony.",
        category: "Espresso"
    },
    {
        _id: "105",
        name: "Espresso Tonic",
        image: food_15,
        price: 21,
        description: "A bubbly and bitter-sweet mix of espresso and tonic water.",
        category: "Espresso"
    },

    // Cappuccino Menu
    {
        _id: "201",
        name: "Classic Cappuccino",
        image: food_21,
        price: 6,
        description: "Smooth espresso with steamed milk and a layer of froth.",
        category: "Cappuccino"
    },
    {
        _id: "202",
        name: "Vanilla Cappuccino",
        image: food_22,
        price: 7,
        description: "Classic cappuccino infused with a hint of vanilla.",
        category: "Cappuccino"
    },
    {
        _id: "203",
        name: "Caramel Cappuccino",
        image: food_23,
        price: 8,
        description: "Cappuccino topped with caramel drizzle for a sweet finish.",
        category: "Cappuccino"
    },
    {
        _id: "204",
        name: "Mocha Cappuccino",
        image: food_24,
        price: 9,
        description: "A blend of chocolate and espresso with a frothy top.",
        category: "Cappuccino"
    },
    {
        _id: "205",
        name: "Hazelnut Cappuccino",
        image: food_25,
        price: 8,
        description: "Rich cappuccino with a nutty hazelnut twist.",
        category: "Cappuccino"
    },

    // Americano Menu
    {
        _id: "301",
        name: "Classic Americano",
        image: food_31, // ganti path sesuai gambar
        price: 5,
        description: "Rich espresso diluted with hot water, creating a smooth yet bold flavor.",
        category: "Americano"
    },
    {
        _id: "302",
        name: "Iced Americano",
        image: food_32,
        price: 6,
        description: "Chilled Americano for a refreshing and bold coffee experience.",
        category: "Americano"
    },
    {
        _id: "303",
        name: "Americano Black",
        image: food_33,
        price: 5,
        description: "A simple black Americano, no frills, just pure espresso and water.",
        category: "Americano"
    },
    {
        _id: "304",
        name: "Caramel Americano",
        image: food_34,
        price: 7,
        description: "Americano with a touch of caramel for a sweet twist.",
        category: "Americano"
    },
    {
        _id: "305",
        name: "Vanilla Americano",
        image: food_35,
        price: 7,
        description: "Americano with a hint of vanilla for a smooth flavor.",
        category: "Americano"
    },
    // Mocha Menu
    {
        _id: "401",
        name: "Classic Mocha",
        image: food_41,
        price: 7,
        description: "Chocolate and espresso mixed with steamed milk.",
        category: "Mocha"
    },
    {
        _id: "402",
        name: "White Chocolate Mocha",
        image: food_42,
        price: 8,
        description: "A creamy mocha with white chocolate and espresso.",
        category: "Mocha"
    },
    {
        _id: "403",
        name: "Mint Mocha",
        image: food_43,
        price: 9,
        description: "Refreshing mint blended with rich mocha.",
        category: "Mocha"
    },
    {
        _id: "404",
        name: "Salted Caramel Mocha",
        image: food_44,
        price: 9,
        description: "Mocha with a touch of salted caramel for a sweet and salty treat.",
        category: "Mocha"
    },
    {
        _id: "405",
        name: "Spicy Mexican Mocha",
        image: food_45,
        price: 10,
        description: "Mocha infused with cinnamon and a hint of chili spice.",
        category: "Mocha"
    },
    // Cold Brew Menu
    {
        _id: "501",
        name: "Classic Cold Brew",
        image: food_51,
        price: 6,
        description: "Smooth and refreshing coffee brewed cold for hours.",
        category: "Cold Brew"
    },
    {
        _id: "502",
        name: "Vanilla Sweet Cream Cold Brew",
        image: food_52,
        price: 7,
        description: "Cold brew topped with a layer of sweet vanilla cream.",
        category: "Cold Brew"
    },
    {
        _id: "503",
        name: "Salted Caramel Cold Brew",
        image: food_53,
        price: 8,
        description: "Cold brew with salted caramel syrup and a hint of sweetness.",
        category: "Cold Brew"
    },
    {
        _id: "504",
        name: "Mocha Cold Brew",
        image: food_54,
        price: 8,
        description: "Cold brew infused with a touch of rich chocolate.",
        category: "Cold Brew"
    },
    {
        _id: "505",
        name: "Citrus Cold Brew",
        image: food_55,
        price: 9,
        description: "Cold brew with a zesty twist of orange and lemon.",
        category: "Cold Brew"
    },

    // Milk Coffee Menu
    {
        _id: "601",
        name: "Classic Milk Coffee",
        image: food_61,
        price: 5,
        description: "Rich espresso blended with creamy milk.",
        category: "Milk Coffee"
    },
    {
        _id: "602",
        name: "Caramel Milk Coffee",
        image: food_62,
        price: 6,
        description: "Milk coffee with a sweet caramel touch.",
        category: "Milk Coffee"
    },
    {
        _id: "603",
        name: "Hazelnut Milk Coffee",
        image: food_63,
        price: 7,
        description: "Milk coffee flavored with nutty hazelnut syrup.",
        category: "Milk Coffee"
    },
    {
        _id: "604",
        name: "Vanilla Milk Coffee",
        image: food_64,
        price: 7,
        description: "Smooth milk coffee with a hint of vanilla.",
        category: "Milk Coffee"
    },
    {
        _id: "605",
        name: "Iced Milk Coffee",
        image: food_65,
        price: 6,
        description: "Chilled milk coffee for a refreshing treat.",
        category: "Milk Coffee"
    },

    // Traditional Coffee Menu
    {
        _id: "701",
        name: "Kopi Tubruk",
        image: food_71,
        price: 4,
        description: "Traditional Indonesian coffee brewed with hot water.",
        category: "Traditional Coffee"
    },
    {
        _id: "702",
        name: "Brazilian Coffee",
        image: food_72,
        price: 5,
        description: "A rich and smooth traditional Brazilian coffee, brewed to perfection.",
        category: "Traditional Coffee"
    },    
    {
        _id: "703",
        name: "Vietnamese Drip Coffee",
        image: food_73,
        price: 6,
        description: "Coffee brewed using a Vietnamese drip filter.",
        category: "Traditional Coffee"
    },
    {
        _id: "704",
        name: "Turkish Coffee",
        image: food_74,
        price: 7,
        description: "Thick and aromatic coffee brewed in traditional Turkish style.",
        category: "Traditional Coffee"
    },
    {
        _id: "705",
        name: "Kopi Luwak",
        image: food_75,
        price: 25,
        description: "Luxury Indonesian coffee made from civet-processed beans.",
        category: "Traditional Coffee"
    },

    // Non Coffee Menu
    {
        _id: "801",
        name: "Hot Chocolate",
        image: food_81,
        price: 5,
        description: "Rich and creamy hot chocolate topped with whipped cream.",
        category: "Non Coffee"
    },
    {
        _id: "802",
        name: "Matcha Latte",
        image: food_82,
        price: 6,
        description: "A creamy and vibrant matcha green tea latte.",
        category: "Non Coffee"
    },
    {
        _id: "803",
        name: "Chai Tea Latte",
        image: food_83,
        price: 6,
        description: "Spiced chai tea with creamy milk for a warming drink.",
        category: "Non Coffee"
    },
    {
        _id: "804",
        name: "Iced Lemon Tea",
        image: food_84,
        price: 4,
        description: "Refreshing iced tea with a twist of lemon.",
        category: "Non Coffee"
    },
    {
        _id: "805",
        name: "Berry Smoothie",
        image: food_85,
        price: 7,
        description: "A blend of fresh berries and yogurt for a healthy treat.",
        category: "Non Coffee"
    },
];
