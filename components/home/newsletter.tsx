"use client"

import { Button } from "@/components/ui/button"
import Form from "next/form"
import { useState } from "react"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.message('Success!', {
            description: "You've been subscribed to our newsletter."
        })
        setEmail("")
      } else {
        toast.message('Error!', {
            description: "Failed to subscribe. Please try again."
        })
      }
    } catch (error) {
        console.log('🚀 ~ :34 ~ handleSubmit ~ error:', error)
        toast.message('Error!', {
            description: "Something went wrong. Please try again."
        })
    }
  }

  return (
    <section className="bg-secondary/10 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
      <p className="mb-6 max-w-md mx-auto">
        Subscribe to our newsletter and get 10% off your first purchase plus updates on new arrivals and special offers.
      </p>
      <Form action={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
        <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white">
          Subscribe
        </Button>
      </Form>
    </section>
  )
}

