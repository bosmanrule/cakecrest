import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark-red text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-1 text-2xl font-bold">
              <span className="text-3xl">🎂</span>
              <span className="text-white">Crest</span>
              <span className="text-brand-light-red">Foods</span>
            </div>
            <p className="text-sm text-gray-300">
              Your one-stop destination for delicious food, freshly baked bread,
              and custom cakes in Melbourne.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/menu"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Full Menu
              </Link>
              <Link
                href="/menu?category=food"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Food
              </Link>
              <Link
                href="/menu?category=bread"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Bread & Pastries
              </Link>
              <Link
                href="/menu?category=cakes"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Cakes & Confections
              </Link>
              <Link
                href="/menu?category=drinks"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Drinks
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 flex-shrink-0" />
                (03) 9123 4567
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                hello@crestfoods.com.au
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                42 Collins Street, Melbourne VIC 3000
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Opening Hours</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4 flex-shrink-0" />
                Mon-Fri: 7:00 AM - 9:00 PM
              </div>
              <div className="text-sm text-gray-300 pl-6">
                Sat: 8:00 AM - 10:00 PM
              </div>
              <div className="text-sm text-gray-300 pl-6">
                Sun: 9:00 AM - 8:00 PM
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CrestFoods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
