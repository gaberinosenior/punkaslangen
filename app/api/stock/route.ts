import { NextResponse } from "next/server";
import { getAvailableStock } from "@/lib/stock";

export async function GET() {
  const stock = await getAvailableStock();
  return NextResponse.json({ stock, soldOut: stock <= 0 });
}
