"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const [priceRange, setPriceRange] = React.useState([0])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#F6E7DB]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif">Filter</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-8">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">By Price</h3>
            <Slider
              defaultValue={[0]}
              max={200000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              {priceRange[0]} Rs - 200000 Rs
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">By Category</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="bridal" />
                <label htmlFor="bridal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Bridal
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="party-wear" />
                <label htmlFor="party-wear" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Party Wear
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="non-bridal" />
                <label htmlFor="non-bridal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Non-Bridal
                </label>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">By Color</h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="w-8 h-8 rounded-full bg-red-600 ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:outline-none focus:ring-gray-300"
                aria-label="Red"
              />
              <button
                className="w-8 h-8 rounded-full bg-amber-600 ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:outline-none focus:ring-gray-300"
                aria-label="Muatard"
              />
              <button
                className="w-8 h-8 rounded-full bg-purple-600 ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:outline-none focus:ring-gray-300"
                aria-label="Purple"
              />
              <button
                className="w-8 h-8 rounded-full bg-pink-400 ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:outline-none focus:ring-gray-300"
                aria-label="Pink"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
