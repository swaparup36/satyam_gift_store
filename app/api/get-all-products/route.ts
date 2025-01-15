import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(){
    try {
        const allProducts = await prisma.product.findMany();

        return NextResponse.json({
            success: true,
            allProducts: allProducts || []
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: 'error occured'
        });
    }
}