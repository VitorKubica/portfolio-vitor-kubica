"use client";

import { useState } from "react";
import Cavalier from "../ui/Cavalier";
import Button from "../ui/Button";
import InputGroup from "../ui/InputGroup";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("_replyto") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      data-section="six"
      aria-hidden="true"
      className="home-section bg-bg"
    >
      <div className="w-full h-full overflow-y-auto flex flex-col justify-center">
      <div className="w-full flex flex-col items-center px-6 sm:px-10 lg:px-16 max-w-3xl mx-auto lg:py-20">
        <Cavalier
          heading="Send me a message!"
          className="mb-6 sm:mb-10 sm:text-center [&_h2]:!text-3xl [&_h2]:sm:!text-4xl [&_h2]:lg:!text-5xl [&_h2]:!max-w-none"
          textSlot={
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-accent/70 sm:text-center tracking-wide">
              Got a question or proposal, or just want
              <br className="hidden sm:block" /> to say hello? Go ahead.
            </p>
          }
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg"
        >
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-5 mb-5 sm:mb-8">
            <InputGroup
              id="full-name"
              name="name"
              label="Your Name"
              placeholder="Enter your name"
              required
            />
            <InputGroup
              id="email"
              name="_replyto"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-5 sm:mb-8">
            <InputGroup
              id="message"
              name="message"
              label="Your Message"
              textarea
              required
              minLength={30}
              placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
            />
          </div>

          {status === "success" && (
            <p className="mb-4 text-sm text-primary font-medium">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="mb-4 text-sm text-red-600 font-medium">
              Something went wrong. Please try again.
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="self-start sm:self-center mt-4"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Shoot"}
          </Button>
        </form>
      </div>
      </div>
    </section>
  );
}
