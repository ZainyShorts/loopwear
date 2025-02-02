import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  ProductCard  from './components/product-card'
import DataSetter from './components/data-setter';
import Header from './custom/header';


type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};
const products: Product[] = [
    {
        id: '1',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
    },
    {
        id: '2',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
    },
    {
        id: '3',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
    },
    {
        id: '4',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
    },
    {
        id: '5',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
    },
];

export default function Home() {
    // In real life it will come from external apis -> fetch.
    const data = {
        id: 1,
        title: 'computer',
    };



    return (
        <>
            <Header/>
        <div className='mx-32'>
            <DataSetter data={data} />
           
            <section>
                <div className="container py-12">
                    <Tabs defaultValue="pizza">
                        <TabsList>
                            <TabsTrigger value="pizza" className="text-md">
                                Pizza
                            </TabsTrigger>
                            <TabsTrigger value="beverages" className="text-md">
                                Beverages
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="pizza">
                            <div className="grid grid-cols-4 gap-6 mt-6">
                                {products.map((product) => (
                                    <ProductCard product={product} key={product.id} />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="beverages">
                            <div className="grid grid-cols-4 gap-6 mt-6">
                                {products.map((product:any) => (
                                    <ProductCard product={product} key={product.id} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

        </div>
        </>
    );
}