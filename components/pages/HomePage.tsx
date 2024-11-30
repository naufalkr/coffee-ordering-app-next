import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Banner from '@/images/banner.png';
import Banner1 from '@/images/banner1.png';
import Banner2 from '@/images/banner2.png';

import Category1 from '@/images/Americano/americano.png';
import Category2 from '@/images/Cappuccino/cappuccino.png';
import Category3 from '@/images/ColdBrew/coldbrew.png';
import Category4 from '@/images/Espresso/espresso.png';
import Category5 from '@/images/MilkCoffee/milkcoffee.png';
import Category6 from '@/images/Mocha/mocha.png';
import Category7 from '@/images/NonCoffee/noncoffee.png';
import Category8 from '@/images/TraditionalCoffee/traditionalcoffee.png';

// import Category2 from '@/images/food images/cat2.jpeg';
// import Category3 from '@/images/food images/cat3.jpeg';
// import Category4 from '@/images/food images/cat4.jpeg';
// import Category5 from '@/images/food images/cat5.jpeg';
// import Category6 from '@/images/food images/cat6.jpeg';

// import Category1 from '@/images/Americano/menu.jpg';
// import Category2 from '@/images/Cappuccino/menu.jpg';
// import Category3 from '@/images/ColdBrew/menu.jpeg';
// import Category4 from '@/images/Espresso/menu.jpeg';
// import Category5 from '@/images/MilkCoffee/menu.jpg';
// import Category6 from '@/images/Mocha/menu.jpg';


import Image from 'next/image';

import {MenuList } from "@/components/container/MenuList";

export function HomePage() {
  return (
    <>
      {/* Banner section  */}
      <section className="mt-6">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                src={Banner}
                width={1400}
                height={380}
                alt="Offers 1"
                className="rounded-lg"                
                // className="rounded-sm object-cover h-[200px] w-full
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={Banner1}
                width={1400}
                height={380}
                alt="Offers 2"
                className="rounded-lg"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={Banner2}
                width={1400}
                height={380}
                alt="Offers 3"
                className="rounded-lg"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {/* Category section  */}
      <section className="mt-10">
        <h1 className="font-semibold text-2xl">Discover Our Finest Coffee</h1>
        <Carousel>
        <CarouselContent>
  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category1}
      alt="Americano"
      width={160}
      height={160}
      // className="rounded-sm object-cover h-[200px] w-full" 
      className="rounded-lg"
      // className="rounded-lg object-cover"
    />
    <p className="text-center mt-2 text-l font-semibold">Americano</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category2}
      width={160}
      height={160}
      alt="Cappuccino"
      // className="rounded-lg"
      // className="rounded-sm object-cover h-[160px] w-full" 

    />
    <p className="text-center mt-2 text-l font-semibold">Cappuccino</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category3}
      width={160}
      height={160}
      alt="Cold Brew"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Cold Brew</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category4}
      width={160}
      height={160}
      alt="Espresso"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Espresso</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category5}
      width={160}
      height={160}
      alt="MilkCoffee"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Milk Coffee</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category6}
      width={160}
      height={160}
      alt="Mocha"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Mocha</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category7}
      width={160}
      height={160}
      alt="NonCoffee"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Non Coffee</p>
  </CarouselItem>

  <CarouselItem className="basis-1/6 flex flex-col items-center justify-center">
    <Image
      src={Category8}
      width={160}
      height={160}
      alt="TraditionalCoffee"
      className="rounded-lg"
    />
    <p className="text-center mt-2 text-l font-semibold">Traditional Coffee</p>
  </CarouselItem>
</CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {/* Menu section section  */}
      <MenuList />
    </>
  );
}
