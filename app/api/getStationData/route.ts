import {NextResponse} from "next/server";

//Section made by Mia O'Halloran

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse> {
    const {searchParams} = new URL(request.url);

    const countrycode = searchParams.get("countrycode");

    if (!countrycode) {
        return NextResponse.json({error: "State invalid or not provided"}, {status:400});
    }

    const res = await fetch(`https://de1.api.radio-browser.info/json/stations/search?countrycode=${countrycode}&limit=20`)

    if (res.status !== 200) {
        return NextResponse.json({error: "Something went wrong"}, {status:500});
    }

    const data = await res.json();
    return NextResponse.json(data);
}