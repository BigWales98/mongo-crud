import connectMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/topic";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function PUT(request: NextRequest, {params}: {params: {id:string}}) {
    try {
        const {id} = params
        const { newTitle: title, newDescription: description } = await request.json()
        if (!title || !description) {
            return NextResponse.json(
                { message: 'Title and description are required'},
                {status: 400}
            )
        }
        await connectMongoDB()
        const updatedTopic = await Topic.findByIdAndUpdate(id, {title, description}, {new: true})
        if(!updatedTopic) {
            return NextResponse.json({ message: 'Topic not found'},
                {status: 404}
            )
        }
        return NextResponse.json(
            { message: 'Topic updated', topic:updatedTopic},
            {status: 200}
        )
    } catch (error) {
        console.error('Error in PUT /api/topics/[id]:', error)
        return NextResponse.json(
            { message: 'Internal Server Error'},
            { status: 500}
        )

    }
}

type RouteContext = { params: { id: string } };

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const {id} = params;
        await connectMongoDB();
        const topic = await Topic.findOne({_id: new ObjectId(id) });
        if(!topic) {
            return NextResponse.json({message: 'Topic not found'}, {status: 404})
        }
        return NextResponse.json({topic}, {status: 200});

    } catch (error) {
        console.error('Error in GET /api/topics/[id]:', error);
        return NextResponse.json(
            { message: 'Internal Server Error'},
            { status: 500}
        )
    }
}