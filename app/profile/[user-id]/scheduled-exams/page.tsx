"use client"

import { getUserExams } from "@/utils/examUtils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ScheduledExam = () => {


        const router = useRouter()


        const { userId } = router.query

        const [userData, setUserData] = useState(null)

        const fetchUserExam = async () => {

                const res = await getUserExams(userId)

        }
}

export default ScheduledExam
