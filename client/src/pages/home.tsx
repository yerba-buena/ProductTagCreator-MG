import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type Product, type InsertProduct } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


import { BarcodeDisplay } from "@/components/BarcodeDisplay";
import { useToast } from "@/hooks/use-toast";
import { Tag, Edit, Save, Plus, Dice6 } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "Premium Smartphone Pro",
      price: 899.99,
      barcode: "1234567890123456789012345678",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1067"
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: (product: Product) => {
      setCurrentProduct(product);
      toast({
        title: "Product saved successfully",
        description: "Your product tag has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: () => {
      toast({
        title: "Error saving product",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  });

  const generateBarcodeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/barcode/generate");
      return response.json();
    },
    onSuccess: (data: { barcode: string }) => {
      form.setValue("barcode", data.barcode);
    }
  });

  const watchedValues = form.watch();

  const handleSaveProduct = () => {
    const data = form.getValues();
    createProductMutation.mutate(data);
  };

  const handleNewProduct = () => {
    form.reset({
      name: "",
      price: 0,
      barcode: "",
      imageUrl: ""
    });
    setCurrentProduct(null);
  };

  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    form.setValue("imageUrl", imageUrl);
    toast({
      title: "Image uploaded",
      description: "Image has been set for the product tag.",
    });
  };



  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Tag className="text-primary text-2xl" />
              <h1 className="text-xl font-semibold text-slate-800">Product Tag Designer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSaveProduct}
                disabled={createProductMutation.isPending}
                className="bg-primary text-white hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
              <Button 
                onClick={handleNewProduct}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Tag
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="text-primary" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-80" style={{ aspectRatio: '3/4' }}>
                  {/* White Info Box - full height without image */}
                  <div className="h-full bg-transparent p-6 flex flex-col justify-between" style={{ backgroundColor: 'rgba(255, 218, 185, 0.3)' }}>
                    {/* Top section with name and price */}
                    <div className="flex flex-col items-center justify-center flex-1">
                      {/* Product Name */}
                      <h3 className="product-name text-center text-slate-800 text-[35px] ml-[0px] mr-[0px] mt-[8px] mb-[8px] pt-[0px] pb-[0px]">
                        {watchedValues.name || 'Product Name'}
                      </h3>
                      
                      {/* Price */}
                      <div className="text-center">
                        <span className="font-bold text-primary text-[28px]">
                          ${watchedValues.price?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Barcode at bottom - stretched wider */}
                    <div className="w-full">
                      {watchedValues.barcode ? (
                        <div className="w-full">
                          <BarcodeDisplay barcode={watchedValues.barcode} />
                        </div>
                      ) : (
                        <div className="bg-primary p-2 rounded w-full text-center">
                          <div className="text-sm text-primary-foreground font-mono">No barcode</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Editing Panel */}
          <div className="space-y-6">
            {/* Product Details Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="text-primary" />
                  <span>Edit Product Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter product name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                              <Input 
                                {...field}
                                type="number"
                                step="0.01"
                                min="0"
                                className="pl-8"
                                placeholder="0.00"
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="barcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barcode</FormLabel>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input 
                                {...field}
                                placeholder="Enter barcode number"
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => generateBarcodeMutation.mutate()}
                                disabled={generateBarcodeMutation.isPending}
                              >
                                <Dice6 className="w-4 h-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}