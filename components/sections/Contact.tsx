"use client";

import Cavalier from "../ui/Cavalier";
import Button from "../ui/Button";
import InputGroup from "../ui/InputGroup";

export default function Contact() {
  return (
    <section
      id="contact"
      data-section="six"
      aria-hidden="true"
      className="home-section bg-bg py-24 sm:py-20 lg:py-0"
    >
      <div className="w-full flex flex-col items-center px-6 sm:px-10 lg:px-16 max-w-3xl mx-auto">
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
          action="https://formspree.io/f/yourformid"
          method="POST"
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

          <Button type="submit" variant="primary" className="self-start sm:self-center mt-4">
            Shoot
          </Button>
        </form>
      </div>
    </section>
  );
}
