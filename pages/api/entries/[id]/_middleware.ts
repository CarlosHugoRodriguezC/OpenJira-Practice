import mongoose from 'mongoose';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const id: string = req.page.params?.id as string || '';


  const checkMongoID = new RegExp( '^[0-9a-fA-F]{24}$');

  if (!checkMongoID.test( id  )) {
    // return res.status(400).json({ message: ' Invalid ID' });
    return new Response(
      JSON.stringify({
        message: ' Invalid ID',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
}
