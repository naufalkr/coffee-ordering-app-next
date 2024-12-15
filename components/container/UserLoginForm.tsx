'use client';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../components/ui/sheet';
import { PersonIcon } from '@radix-ui/react-icons';
import { ChangeEvent, useCallback, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export function UserLoginForm() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onRegisterFormChange = useCallback(
    (key: string, value: string) => {
      setRegisterForm({
        ...registerForm,
        [key]: value
      });
    },
    [registerForm]
  );

  const onChange = useCallback(
    (key: string, value: string) => {
      setData({
        ...data,
        [key]: value
      });
    },
    [data]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center"
        >
          <PersonIcon /> Sign In
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Tabs defaultValue="account" className="w-[320px] mt-4">
          <TabsList>
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Create an Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <SheetHeader>
              <SheetTitle>Login</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={data.email}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange('email', e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange('password', e.target.value);
                  }}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    console.log('Login data:', data);
                  }}
                >
                  Sign In
                </Button>
              </SheetClose>
            </SheetFooter>
          </TabsContent>
          <TabsContent value="password">
            <SheetHeader>
              <SheetTitle>Create an Account</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={registerForm.firstName}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onRegisterFormChange('firstName', e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={registerForm.lastName}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onRegisterFormChange('lastName', e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="registerEmail" className="text-right">
                  Email
                </Label>
                <Input
                  id="registerEmail"
                  value={registerForm.email}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onRegisterFormChange('email', e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="registerPassword" className="text-right">
                  Password
                </Label>
                <Input
                  id="registerPassword"
                  type="password"
                  value={registerForm.password}
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onRegisterFormChange('password', e.target.value);
                  }}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    console.log('Register data:', registerForm);
                  }}
                >
                  Register
                </Button>
              </SheetClose>
            </SheetFooter>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
