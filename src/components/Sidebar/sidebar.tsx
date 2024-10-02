import * as React from "react";
import Cookies from "js-cookie";

import { Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { getAccessToken } from "../../util/authentication";
//@ts-ignore
import start_gg_logo from "../../media/startgg-logo.png";

export function Sidebar({
  isLoggedIn,
  setLoggedIn,
}: {
  isLoggedIn: boolean;
  setLoggedIn: Function;
}) {
  const logout = () => {
    console.log("Logging out");
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
    setLoggedIn(false);
  };

  const attemptLogin = () => {
    getAccessToken();
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Menu className="p-2 h-14 w-14" />
      </DrawerTrigger>
      <DrawerContent className="w-1/4 h-full bg-mpprimary text-mpsecondary">
        <div className="h-full flex flex-col justify-between">
          <div className="p-4 pb-0 grow">{/** To be implemented */}</div>
          <DrawerFooter className="flex-row items-center justify-end">
            {isLoggedIn ? (
              <Button
                className="text-xl"
                variant="destructive"
                onClick={logout}
              >
                Logout
                <LogOut className="ml-2" color="red" />
              </Button>
            ) : (
              <Button
                className="text-lg"
                variant="secondary"
                onClick={attemptLogin}
              >
                <img
                  className="mr-4 w-6"
                  src={start_gg_logo}
                  alt="Start GG logo"
                />
                Log in
              </Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
