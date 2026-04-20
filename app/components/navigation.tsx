"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      
      <div className="logo">KauX AI</div>

      {/* Desktop Links */}
      <div className="links">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/try-kaux">Try Kaux</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/testimonials">Testimonials</NavLink>
      </div>

      {/* Mobile Button */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/try-kaux">Try Kaux</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/testimonials">Testimonials</NavLink>
        </div>
      )}
      
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link">
      {children}
    </Link>
  );
}