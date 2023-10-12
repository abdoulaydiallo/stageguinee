import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organization, title, startDate, endDate, userId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!organization) {
      return new NextResponse("organization is required", { status: 400 });
    }
    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }
    if (!startDate) {
      return new NextResponse("startDate is required", { status: 400 });
    }
    if (!endDate) {
      return new NextResponse("endDate is required", { status: 400 });
    }

    const experience = await prismadb.experience.create({
      data: {
        organization,
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log("[EXPERIENCE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      organization,
      title,
      fieldOfStudy,
      startDate,
      endDate,
      userId,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!organization) {
      return new NextResponse("organisation is required", { status: 400 });
    }
    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }
    if (!startDate) {
      return new NextResponse("startDate is required", { status: 400 });
    }

    const userByUserId = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const education = await prismadb.experience.update({
      where: {
        id: id,
      },
      data: {
        organization,
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.log("[EXPERIENCE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
