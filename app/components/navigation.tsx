"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}><strong>✠ KauX AI</strong></div>
      

      <div style={styles.links}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/try-kaux">Try KauX</NavLink>
        <NavLink href="/About">About</NavLink>
        <NavLink href="/testimonials">Testimonials</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={styles.link}>
      {children}
    </Link>
  );
}

const styles = {
  nav: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    borderBottom: "1px solid #eee",
    background: "#fff",
    fontFamily: "Poppins, sans-serif",
  },

  logo: {
    fontSize: "25px",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: "#111",
    fontFamily: "Poppins, sans-serif",
  },

  links: {
    display: "flex",
    gap: "28px",
  },

  link: {
    textDecoration: "none",   // ❌ underline gone
    color: "#000000",            // ❌ blue gone
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s ease",
  },
};