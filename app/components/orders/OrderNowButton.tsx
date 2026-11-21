"use client"
import { IMenuItem } from '@/app/Types/menu-items';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const OrderNowButton = ({ item }: { item: IMenuItem }) => {
    const handleOrderNow = () => {
        console.log("hello")
    }
    return (
        <Button onClick={handleOrderNow} className="h-12 w-full">
            <ShoppingBag />
            Order now
        </Button>
    );
};

export default OrderNowButton;