import * as React from "react";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";

export function Sidebar() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="w-1/4 h-full">
        <div className="h-full flex flex-row justify-between">
          <div className="p-4 pb-0 grow">Hello content</div>
          <DrawerFooter className="flex-row items-center">
            <p className="text-lg">Logout</p>
            <Button variant="destructive" className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                strokeWidth={1.5}
                className="w-8"
                stroke="#fa0000"
              >
                <path
                  fill="#fa0000"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                />
              </svg>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
