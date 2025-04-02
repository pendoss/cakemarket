"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Get unique values for filter options
const categories = [
  "Cakes",
  "Cookies",
  "Pastries",
  "Italian Desserts",
  "Tarts",
  "Brownies",
  "International Desserts",
  "Pies",
  "Chocolates",
  "Cupcakes",
]

const dietaryOptions = [
  "Gluten-Free",
  "Vegan",
  "Dairy-Free",
  "Contains Nuts",
  "Contains Gluten",
  "Contains Dairy",
  "May Contain Nuts",
]

const sellers = [
  "Sweet Delights Bakery",
  "Cheesecake Heaven",
  "Parisian Delicacies",
  "Morning Bakery",
  "Green Treats",
  "Italian Sweets",
  "Tart House",
  "Allergy-Friendly Bakery",
  "Mediterranean Sweets",
  "Pie Paradise",
  "Truffle Artisans",
  "Cupcake Corner",
]

const ratingOptions = [
  { value: 4.9, label: "4.9 & up" },
  { value: 4.7, label: "4.7 & up" },
  { value: 4.5, label: "4.5 & up" },
  { value: 4.0, label: "4.0 & up" },
]

export function FilterSidebar({ filters, applyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters)
  const [priceRange, setPriceRange] = useState(filters.priceRange)

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters)
    setPriceRange(filters.priceRange)
  }, [filters])

  const handleCategoryChange = (category, checked) => {
    let newCategories = [...localFilters.categories]

    if (checked) {
      newCategories.push(category)
    } else {
      newCategories = newCategories.filter((c) => c !== category)
    }

    const newFilters = { ...localFilters, categories: newCategories }
    setLocalFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleDietaryChange = (option, checked) => {
    let newDietary = [...localFilters.dietary]

    if (checked) {
      newDietary.push(option)
    } else {
      newDietary = newDietary.filter((d) => d !== option)
    }

    const newFilters = { ...localFilters, dietary: newDietary }
    setLocalFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleSellerChange = (seller, checked) => {
    let newSellers = [...localFilters.sellers]

    if (checked) {
      newSellers.push(seller)
    } else {
      newSellers = newSellers.filter((s) => s !== seller)
    }

    const newFilters = { ...localFilters, sellers: newSellers }
    setLocalFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleRatingChange = (rating) => {
    const newFilters = { ...localFilters, rating }
    setLocalFilters(newFilters)
    applyFilters(newFilters)
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)

    // Debounce price changes to avoid too many rerenders
    clearTimeout(window.priceTimeout)
    window.priceTimeout = setTimeout(() => {
      const newFilters = { ...localFilters, priceRange: value }
      setLocalFilters(newFilters)
      applyFilters(newFilters)
    }, 300)
  }

  const handleReset = () => {
    const resetFilters = {
      priceRange: [0, 30],
      categories: [],
      dietary: [],
      rating: 0,
      sellers: [],
    }
    setLocalFilters(resetFilters)
    setPriceRange([0, 30])
    applyFilters(resetFilters)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={handleReset} className="mb-4">
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <Slider
            defaultValue={priceRange}
            value={priceRange}
            max={30}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["categories", "dietary", "rating", "sellers"]} className="w-full">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={localFilters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dietary">
            <AccordionTrigger>Dietary</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dietary-${option}`}
                      checked={localFilters.dietary.includes(option)}
                      onCheckedChange={(checked) => handleDietaryChange(option, checked)}
                    />
                    <Label htmlFor={`dietary-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {ratingOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${option.value}`}
                      checked={localFilters.rating === option.value}
                      onCheckedChange={(checked) => {
                        if (checked) handleRatingChange(option.value)
                        else handleRatingChange(0)
                      }}
                    />
                    <Label htmlFor={`rating-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sellers">
            <AccordionTrigger>Sellers</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {sellers.map((seller) => (
                  <div key={seller} className="flex items-center space-x-2">
                    <Checkbox
                      id={`seller-${seller}`}
                      checked={localFilters.sellers.includes(seller)}
                      onCheckedChange={(checked) => handleSellerChange(seller, checked)}
                    />
                    <Label htmlFor={`seller-${seller}`} className="text-sm">
                      {seller}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

