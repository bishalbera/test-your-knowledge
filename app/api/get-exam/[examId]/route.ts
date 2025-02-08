import { getExam } from "@/utils/examUtils"
import { NextResponse, NextRequest } from "next/server"


export const GET = async (req: NextRequest, props: { params: Promise<{ examId: string }> }) => {
        const params = await props.params;

        try {

                const { examId } = params

                if (!examId) {

                        return NextResponse.json({ error: "examId is required" }, { status: 400 })




                }

                const exam = await getExam(examId)
                return NextResponse.json(exam, { status: 200 })





        } catch (error) {

                console.error("couldn't get the exam", error)
                return NextResponse.json({ error: "Failer to retrieve the exam" }, { status: 500 })

        }
}
