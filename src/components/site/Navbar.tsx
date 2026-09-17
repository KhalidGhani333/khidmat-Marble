import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, CONTACT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/newlogo.png";

export function Navbar() {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/tile-marble-polishing", label: t("nav.tileMarble") },
    { to: "/ceramic-porcelain", label: t("nav.ceramicPorcelain") },
    { to: "/project-exhibition", label: t("nav.projects") },
    { to: "/about-us", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_20px_-10px_rgba(0,0,0,0.2)]"
          : "bg-transparent",
      )}
    >
      <div className="container-luxe flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Khidmat Logo"
            className="h-10 w-10 rounded-full object-cover border border-gold"
          />
          <div className="leading-tight">
            <div
              translate="no"
              className={cn(
                "font-display font-black text-xl tracking-tight",
                scrolled ? "text-foreground" : "text-white",
              )}
            >
              {t("site.name")}
            </div>
            <div
              translate="no"
              className={cn(
                "text-[10px] uppercase tracking-[0.2em]",
                scrolled ? "text-muted-foreground" : "text-white/70",
              )}
            >
              {t("tagline")}
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-xs xl:text-sm font-medium transition-colors hover:text-gold whitespace-nowrap",
                scrolled ? "text-foreground" : "text-white",
              )}
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              scrolled
                ? "border-border text-foreground hover:border-gold"
                : "border-white/30 text-white hover:border-gold",
            )}
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className={cn(
              "hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
              scrolled
                ? "border-border text-foreground hover:border-gold"
                : "border-white/30 text-white hover:border-gold",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-lg shadow-gold/20 transition hover:scale-105"
          >
            <Phone className="h-4 w-4" />
            <span dir="ltr">{CONTACT.phone}</span>
          </a>
          <button
            className={cn(
              "lg:hidden flex h-10 w-10 items-center justify-center rounded-md",
              scrolled || open ? "text-foreground" : "text-white",
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container-luxe flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="flex-1 rounded-full border border-border px-3 py-2 text-sm font-semibold"
                >
                  {lang === "en" ? "العربية" : "English"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">{CONTACT.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
