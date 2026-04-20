import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Shivaali",
  description: "Get in touch with us for queries, orders, or collaborations",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            We&apos;d love to hear from you. Reach out for any queries or support.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                WhatsApp
              </h3>
              <p className="text-muted-foreground mb-3">
                Chat with us for quick responses
              </p>
              <span className="text-green-600 font-medium group-hover:underline">
                +91 98765 43210
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Call Us
              </h3>
              <p className="text-muted-foreground mb-3">
                Mon-Sat, 10am-7pm IST
              </p>
              <span className="text-primary font-medium group-hover:underline">
                +91 98765 43210
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@shivaali.com"
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Email
              </h3>
              <p className="text-muted-foreground mb-3">
                We reply within 24 hours
              </p>
              <span className="text-primary font-medium group-hover:underline">
                hello@shivaali.com
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/shivaali.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Instagram
              </h3>
              <p className="text-muted-foreground mb-3">
                Follow us for the latest styles
              </p>
              <span className="text-primary font-medium group-hover:underline">
                @shivaali.in
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="p-8 rounded-2xl bg-background border border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  Store Address
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Shivaali Ethnic Wear
                <br />
                123 Fashion Street
                <br />
                Surat, Gujarat 395001
                <br />
                India
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  Store Hours
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Monday - Saturday: 10:00 AM - 7:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}