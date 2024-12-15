'use client';

import * as React from 'react';

import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

type Checked = boolean;

export function UserAuth() {
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'link'}>
          <Avatar>
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback className='bg-slate-800 text-white'>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side='bottom' align='end'>
        <DropdownMenuLabel>User Email Placeholder</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={(value: boolean) => {
            setShowPanel(value);
            // Add any custom frontend logic here if needed
            console.log("Logout clicked");
          }}
        >
          Logout
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
