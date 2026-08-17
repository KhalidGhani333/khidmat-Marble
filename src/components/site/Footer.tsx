import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music2, Mail, Phone, MapPin } from "lucide-react";
import { useApp, CONTACT } from "@/lib/i18n";
import logoImg from "@/assets/newlogo.png";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Khidmat Logo" className="h-10 w-10 rounded-full object-cover border border-gold" />
            <div className="leading-tight">
              <div className="font-display font-black text-xl">{t("site.name")}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">{t("tagline")}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">{t("footer.desc")}</p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.facebook.com/share/1EFU3Md8QZ/" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold text-blue-500">
              <Facebook className="h-5 w-5 fill-current" />
            </a>
            <a href="https://www.instagram.com/arshad62857?utm_source=qr&igsh=ZGZ4NjRkYTBiZXZq" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold text-pink-500">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.tiktok.com/@user651311276?_r=1&_t=ZS-97BD0F4Sv0Z" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold text-white">
              <Music2 className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">{t("footer.quickLinks")}</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-gold">{t("nav.home")}</Link></li>
            <li><Link to="/services" className="hover:text-gold">{t("nav.services")}</Link></li>
            <li><Link to="/tile-marble-polishing" className="hover:text-gold">{t("nav.tileMarble")}</Link></li>
            <li><Link to="/ceramic-porcelain" className="hover:text-gold">{t("nav.ceramicPorcelain")}</Link></li>
            <li><Link to="/project-exhibition" className="hover:text-gold">{t("nav.projects")}</Link></li>
            <li><Link to="/about-us" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> <span dir="ltr">{CONTACT.phone}</span></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> <span className="break-all">{CONTACT.email}</span></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> {CONTACT.location}</li>
          </ul>
        </div>

      </div>
      <div className="border-t border-white/10">
        <div className="container-luxe py-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Khidmat Marble & Tile Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function CallFloat() {
  const { t } = useApp();
  return (
    <a
      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
      aria-label="Call"
      className="fixed bottom-24 right-6 z-40 flex h-14 items-center gap-2 rounded-full bg-gold px-6 text-gold-foreground shadow-xl animate-pulse-gold transition hover:scale-105"
    >
      <span className="text-sm font-semibold whitespace-nowrap">{t("cta.callShort")}</span>
      <Phone className="h-6 w-6 shrink-0" />
    </a>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-6 text-white shadow-xl animate-pulse-gold transition hover:scale-105"
    >
      <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 shrink-0 fill-white">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.83.74 5.49 2.03 7.8L.5 31.5l7.93-2.07A15.44 15.44 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.2 13.2 0 0 1-6.73-1.84l-.48-.29-4.71 1.23 1.26-4.6-.31-.5A13.2 13.2 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.24-9.87c-.4-.2-2.35-1.16-2.71-1.29-.37-.13-.63-.2-.9.2s-1.03 1.29-1.26 1.56c-.23.26-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.62.17-.82.18-.18.4-.46.6-.69.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5s-1.4 1.36-1.4 3.32 1.43 3.85 1.63 4.12c.2.26 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.35-.96 2.68-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z"/>
      </svg>
    </a>
  );
}

