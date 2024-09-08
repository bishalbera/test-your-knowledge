import { prisma } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const POST = async (req: NextRequest, res: NextResponse) => {

        const reqBody = await req.text()
        const sig = req.headers.get("stripe-signature")

        let event: Stripe.Event


        try {

                if (!sig || !webhookSecret) return
                event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret!)


        } catch (error) {
                console.error("webhook signature verification failed", error)


                return NextResponse.json({ message: "webhook error" }, { status: 400 })

        }

        switch (event.type) {

                case "checkout.session.completed":
                        const session = event.data.object as Stripe.Checkout.Session
                        const userId = session.metadata?.user
                        const examId = session.metadata?.examId


                        try {



                                await prisma.userExam.update({
                                        where: {
                                                userId_examId: {
                                                        userId: userId!,
                                                        examId: examId!,
                                                },
                                        },
                                        data: {
                                                paid: true,
                                        },
                                });

                                console.log("userExam paid status updated for userId:", userId)

                        } catch (error) { console.error("error updating userExam paid status", error) }

                        break

                default:
                        console.log(`unhandled event type ${event.type}`)




        }

        return NextResponse.json("event received", { status: 200 })





}
