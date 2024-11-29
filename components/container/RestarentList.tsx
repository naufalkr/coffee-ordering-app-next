'use client';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

import Americano1 from '@/images/Americano/1.jpeg';
import Americano2 from '@/images/Americano/2.jpg';
import Americano3 from '@/images/Americano/3.jpg';
import Americano4 from '@/images/Americano/4.jpg';
import Americano5 from '@/images/Americano/5.jpg';

import ColdBrew1 from '@/images/ColdBrew/1.jpeg';
import ColdBrew2 from '@/images/ColdBrew/2.jpeg';
import ColdBrew3 from '@/images/ColdBrew/3.jpg';
import ColdBrew4 from '@/images/ColdBrew/4.png';
import ColdBrew5 from '@/images/ColdBrew/5.jpg';



import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function RestarentList() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <section className="mt-10">
      <h1 className="font-semibold text-2xl">Popular Restarents</h1>
      <div className="mt-6 flex gap-3">
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card className={'p0'}>
  {/* <Link href={`/coffees/classic-americano`}> */}
    <CardContent className="p-0">
      <Image src={Americano1} alt="Classic Americano" width={280} height={280} className="rounded-sm" />
    </CardContent>
    <CardFooter className="py-4 px-6 flex flex-col items-start">
      <p className="flex gap-1 items-center">
        <span className="text-sm text-gray-600">4.3</span>
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarIcon /> <span className="text-sm text-gray-600">(1200)</span>
      </p>
      <h2 className="text-xl font-semibold mt-2">Classic Americano</h2>
      <span className="text-gray-500 text-md font-light mt-1">
        A smooth and rich black coffee made from espresso and hot water.
      </span>
    </CardFooter>
  {/* </Link> */}
</Card>

<Card className={'p0'}>
  {/* <Link href={`/coffees/iced-americano`}> */}
    <CardContent className="p-0">
      <Image src={Americano2} alt="Iced Americano" width={280} height={280} className="rounded-sm" />
    </CardContent>
    <CardFooter className="py-4 px-6 flex flex-col items-start">
      <p className="flex gap-1 items-center">
        <span className="text-sm text-gray-600">4.5</span>
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarIcon /> <span className="text-sm text-gray-600">(1500)</span>
      </p>
      <h2 className="text-xl font-semibold mt-2">Iced Americano</h2>
      <span className="text-gray-500 text-md font-light mt-1">
        A chilled version of the classic Americano, served over ice for a refreshing experience.
      </span>
    </CardFooter>
  {/* </Link> */}
</Card>

<Card className={'p0'}>
  {/* <Link href={`/coffees/americano-black`}> */}
    <CardContent className="p-0">
      <Image src={Americano3} alt="Americano Black" width={280} height={280} className="rounded-sm" />
    </CardContent>
    <CardFooter className="py-4 px-6 flex flex-col items-start">
      <p className="flex gap-1 items-center">
        <span className="text-sm text-gray-600">4.6</span>
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarIcon /> <span className="text-sm text-gray-600">(1300)</span>
      </p>
      <h2 className="text-xl font-semibold mt-2">Americano Black</h2>
      <span className="text-gray-500 text-md font-light mt-1">
        A bold and robust Americano without any added flavors, offering a pure coffee experience.
      </span>
    </CardFooter>
  {/* </Link> */}
</Card>

<Card className={'p0'}>
  {/* <Link href={`/coffees/caramel-americano`}> */}
    <CardContent className="p-0">
      <Image src={Americano4} alt="Caramel Americano" width={280} height={280} className="rounded-sm" />
    </CardContent>
    <CardFooter className="py-4 px-6 flex flex-col items-start">
      <p className="flex gap-1 items-center">
        <span className="text-sm text-gray-600">4.8</span>
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarIcon /> <span className="text-sm text-gray-600">(1800)</span>
      </p>
      <h2 className="text-xl font-semibold mt-2">Caramel Americano</h2>
      <span className="text-gray-500 text-md font-light mt-1">
        A sweet variation of the classic Americano with a rich caramel flavor.
      </span>
    </CardFooter>
  {/* </Link> */}
</Card>

<Card className={'p0'}>
  {/* <Link href={`/coffees/vanilla-americano`}> */}
    <CardContent className="p-0">
      <Image src={Americano5} alt="Vanilla Americano" width={280} height={280} className="rounded-sm" />
    </CardContent>
    <CardFooter className="py-4 px-6 flex flex-col items-start">
      <p className="flex gap-1 items-center">
        <span className="text-sm text-gray-600">4.7</span>
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarFilledIcon className="text-yellow-500" />
        <StarIcon /> <span className="text-sm text-gray-600">(1400)</span>
      </p>
      <h2 className="text-xl font-semibold mt-2">Vanilla Americano</h2>
      <span className="text-gray-500 text-md font-light mt-1">
        A delicious twist on the Americano, enhanced with a smooth vanilla flavor.
      </span>
    </CardFooter>
  {/* </Link> */}
</Card>

<Card className={'p0'}>
  <CardContent className="p-0">
    <Image src={ColdBrew1} alt="Classic Cold Brew" width={280} height={280} className="rounded-sm" />
  </CardContent>
  <CardFooter className="py-4 px-6 flex flex-col items-start">
    <p className="flex gap-1 items-center">
      <span className="text-sm text-gray-600">4.5</span>
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarIcon /> <span className="text-sm text-gray-600">(900)</span>
    </p>
    <h2 className="text-xl font-semibold mt-2">Classic Cold Brew</h2>
    <span className="text-gray-500 text-md font-light mt-1">
      A refreshing and smooth cold brew coffee, perfect for hot days.
    </span>
  </CardFooter>
</Card>

<Card className={'p0'}>
  <CardContent className="p-0">
    <Image src={ColdBrew2} alt="Vanilla Sweet Cream Cold Brew" width={280} height={280} className="rounded-sm" />
  </CardContent>
  <CardFooter className="py-4 px-6 flex flex-col items-start">
    <p className="flex gap-1 items-center">
      <span className="text-sm text-gray-600">4.7</span>
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarIcon /> <span className="text-sm text-gray-600">(1100)</span>
    </p>
    <h2 className="text-xl font-semibold mt-2">Vanilla Sweet Cream Cold Brew</h2>
    <span className="text-gray-500 text-md font-light mt-1">
      A smooth and sweet cold brew with a vanilla cream finish.
    </span>
  </CardFooter>
</Card>

<Card className={'p0'}>
  <CardContent className="p-0">
    <Image src={ColdBrew3} alt="Salted Caramel Cold Brew" width={280} height={280} className="rounded-sm" />
  </CardContent>
  <CardFooter className="py-4 px-6 flex flex-col items-start">
    <p className="flex gap-1 items-center">
      <span className="text-sm text-gray-600">4.6</span>
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarIcon /> <span className="text-sm text-gray-600">(1000)</span>
    </p>
    <h2 className="text-xl font-semibold mt-2">Salted Caramel Cold Brew</h2>
    <span className="text-gray-500 text-md font-light mt-1">
      A delightful blend of cold brew and salted caramel for a sweet-salty twist.
    </span>
  </CardFooter>
</Card>

<Card className={'p0'}>
  <CardContent className="p-0">
    <Image src={ColdBrew4} alt="Mocha Cold Brew" width={280} height={280} className="rounded-sm" />
  </CardContent>
  <CardFooter className="py-4 px-6 flex flex-col items-start">
    <p className="flex gap-1 items-center">
      <span className="text-sm text-gray-600">4.8</span>
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarIcon /> <span className="text-sm text-gray-600">(1200)</span>
    </p>
    <h2 className="text-xl font-semibold mt-2">Mocha Cold Brew</h2>
    <span className="text-gray-500 text-md font-light mt-1">
      A rich mocha flavor combined with cold brew coffee for a chocolatey twist.
    </span>
  </CardFooter>
</Card>

<Card className={'p0'}>
  <CardContent className="p-0">
    <Image src={ColdBrew5} alt="Citrus Cold Brew" width={280} height={280} className="rounded-sm" />
  </CardContent>
  <CardFooter className="py-4 px-6 flex flex-col items-start">
    <p className="flex gap-1 items-center">
      <span className="text-sm text-gray-600">4.4</span>
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarFilledIcon className="text-yellow-500" />
      <StarIcon /> <span className="text-sm text-gray-600">(800)</span>
    </p>
    <h2 className="text-xl font-semibold mt-2">Citrus Cold Brew</h2>
    <span className="text-gray-500 text-md font-light mt-1">
      A refreshing citrus-infused cold brew for a zesty, energizing kick.
    </span>
  </CardFooter>
</Card>

      </div>
    </section>
  );
}
