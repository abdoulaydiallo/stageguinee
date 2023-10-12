import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { skillName, userId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const experience = await prismadb.skill.create({
      data: {
        skillName,
        userId,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log("[SKILL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, skillName, userId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userByUserId = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const experience = await prismadb.skill.update({
      where: {
        id: id,
      },
      data: {
        skillName: skillName,
        userId,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log("[SKILL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
