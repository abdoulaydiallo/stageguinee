import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const {
      fullName,
      email,
      residenceCity,
      phoneNumber,
      clerkId,
      profileImage,
    } = body;

    if (!userId) {
      return new NextResponse("Unuthorized", { status: 401 });
    }
    if (!fullName) {
      return new NextResponse("FullName is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }
    if (!residenceCity) {
      return new NextResponse("residenceCity is required", { status: 400 });
    }
    if (!phoneNumber) {
      return new NextResponse("phoneNumber is required", { status: 400 });
    }
    if (!profileImage) {
      return new NextResponse("profileImage is required", { status: 400 });
    }
    if (!clerkId) {
      return new NextResponse("clerkId is required", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        fullName,
        email,
        residenceCity,
        phoneNumber,
        clerkUserId: clerkId,
        profile: {
          create: {
            profilePicture: profileImage,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unuthorized", { status: 401 });
    }
    const user = await prismadb.user.findFirst({
      where: {
        clerkUserId: userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
