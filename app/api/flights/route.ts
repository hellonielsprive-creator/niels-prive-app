import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  try {

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_flights&type=2&departure_id=${from}&arrival_id=${to}&outbound_date=${date}&currency=USD&hl=en&api_key=${process.env.NEXT_PUBLIC_SERPAPI_KEY}`
    );

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );

  }

}