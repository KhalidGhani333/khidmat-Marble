import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import React, { Suspense, useState } from "react";
import {
  ArrowRight, ChevronDown, Sparkles, Droplets, Gem, Award, Wrench, Zap, Wallet, MessageCircle, Phone, X,
  Layers, Home, Building2,
} from "lucide-react";
import heroImg from "@/assets/hero-marble.jpg";
import { useApp, CONTACT } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Gallery & Transformation Images
import g1 from "@/assets/1.jpeg";
import g2 from "@/assets/2.jpeg";
import g3 from "@/assets/3.jpeg";
import g4 from "@/assets/4.jpeg";
import g5 from "@/assets/5.jpeg";
import g6 from "@/assets/6.jpeg";
import g7 from "@/assets/7.jpeg";
import g8 from "@/assets/8.jpeg";
import g9 from "@/assets/9.jpeg";
import g15 from "@/assets/15.jpeg";
import g16 from "@/assets/16.jpeg";
import g18 from "@/assets/18.jpeg";

// Service Circular Images
import s01 from "@/assets/01.png";
import s02 from "@/assets/02.png";
import s03 from "@/assets/03.png";
import s04 from "@/assets/04.png";
import s05 from "@/assets/05.png";
import s06 from "@/assets/06.png";

// Lazy load the heavy slider component
const ReactCompareSlider = React.lazy(() => import("react-compare-slider").then(m => ({ default: m.ReactCompareSlider })));

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useApp();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const whatsappMessage = `New Inquiry:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`${CONTACT.whatsapp.split('?')[0]}?text=${encodedMessage}`, "_blank");
  };

  const services = [
    { id: "01", img: s01, title: t("service.tile.title"), desc: t("service.tile.desc") },
    { id: "02", img: s02, title: t("service.marble.title"), desc: t("service.marble.desc") },
    { id: "03", img: s03, title: t("service.ceramic.title"), desc: t("service.ceramic.desc") },
    { id: "04", img: s04, title: t("service.porcelain.title"), desc: t("service.porcelain.desc") },
    { id: "05", img: s05, title: t("service.courtyard.title"), desc: t("service.courtyard.desc") },
    { id: "06", img: s06, title: t("service.tanks.title"), desc: t("service.tanks.desc") },
  ];

  const features = [
    { icon: Award, title: t("feature.expert.title"), desc: t("feature.expert.desc") },
    { icon: Wrench, title: t("feature.italy.title"), desc: t("feature.italy.desc") },
    { icon: Zap, title: t("feature.fast.title"), desc: t("feature.fast.desc") },
    { icon: Wallet, title: t("feature.price.title"), desc: t("feature.price.desc") },
  ];

  const gallery = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g15, g18];

  const ba = [
    { after: g2, id: "ba1" },
    { after: g15, id: "ba2" },
    { after: g16, id: "ba3" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt={t("service.marble.title")} 
            className="h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/85" />
        </div>
        <div className="relative z-10 pt-32 pb-20 w-full pl-10 pr-6 sm:pl-12 sm:pr-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {t("hero.badge")}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 max-w-4xl font-display font-black leading-tight text-white tracking-tight"
          >
            {lang === "ar" ? (
              <>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block text-3xl sm:text-4xl lg:text-5xl">
                  <span className="text-white">جلي بلاط، </span>
                  <span className="text-gold drop-shadow-[0_0_20px_rgba(201,180,0,0.4)]">تلميع رخام،</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-white">تنظيف سيراميك وبورسلان،</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-white">أسطح وخزانات،</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-gold drop-shadow-[0_0_20px_rgba(201,180,0,0.4)]">حوش، </span>
                  <span className="text-white">سطح، </span>
                  <span className="text-gold italic drop-shadow-[0_0_20px_rgba(201,180,0,0.5)]">— أرشد</span>
                </motion.span>
              </>
            ) : (
              <>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block text-3xl sm:text-4xl lg:text-5xl">
                  <span className="text-white">Tile polishing, </span>
                  <span className="text-gold drop-shadow-[0_0_20px_rgba(201,180,0,0.4)]">marble polishing,</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-white">ceramic and porcelain cleaning,</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-white">and water tanks,</span>
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                  <span className="text-gold drop-shadow-[0_0_20px_rgba(201,180,0,0.4)]">yard, </span>
                  <span className="text-white">roof, </span>
                  <span className="text-gold italic drop-shadow-[0_0_20px_rgba(201,180,0,0.5)]">—Arshad</span>
                </motion.span>
              </>
            )}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-6 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed font-medium drop-shadow-sm">
            {t("hero.sub")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-8 flex flex-wrap gap-4">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground shadow-[0_15px_40px_-10px_rgba(201,180,0,0.5)] transition hover:scale-105 active:scale-95">
              <MessageCircle className="h-5 w-5" /> {t("cta.whatsapp")}
            </a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-navy active:scale-95">
              <Phone className="h-5 w-5" /> {t("cta.call")}
            </a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-navy text-navy-foreground py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="container-luxe grid grid-cols-2 gap-8 md:grid-cols-4 relative z-10">
          {[
            { n: 5, s: "+", l: t("stats.years") },
            { n: 100, s: "+", l: t("stats.projects") },
            { n: 100, s: "%", l: t("stats.satisfaction") },
            { n: 5, s: "+", l: t("stats.active") },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-black text-gold">
                <Counter to={stat.n} suffix={stat.s} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/60">{stat.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container-luxe">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("nav.about")}</span>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-black text-foreground">{t("about.title")}</h2>
              <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
              <img src={g7} alt={t("about.title")} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-20">
        <div className="container-luxe">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("services.label")}</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-black text-foreground">{t("services.title")}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>{t("services.intro.p1")}</p>
              <p>{t("services.intro.p2")}</p>
              <p>{t("services.intro.p3")}</p>
            </div>
          </Reveal>
          <div className="mt-16 relative">
            <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="relative mb-6">
                      <div className="relative h-56 w-56 md:h-64 md:w-64 overflow-hidden rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 bg-white">
                        <img 
                          src={s.img} 
                          alt={s.title} 
                          className="h-full w-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      {/* Number Badge */}
                      <div className={`absolute top-1.5 ${lang === 'ar' ? 'left-1.5' : 'right-1.5'} flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-black text-gold-foreground border-4 border-white shadow-lg`}>
                        {s.id}.
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground transition-colors group-hover:text-gold">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section className="py-12 md:py-20">
        <div className="container-luxe">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("gallery.label")}</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-black">{t("gallery.title")}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <Reveal key={i} delay={(i % 3) * 0.05}>
                <div 
                  className="group relative overflow-hidden rounded-xl bg-muted aspect-[4/3] cursor-pointer"
                  onClick={() => setSelectedImg(src)}
                >
                  <img 
                    src={src} 
                    alt={`${t("gallery.title")} ${i + 1}`} 
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition group-hover:bg-navy/60 group-hover:opacity-100">
                    <span className="rounded-full border border-gold bg-gold/20 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">{t("gallery.view")}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center max-w-4xl mx-auto">
             <div className="space-y-5 text-muted-foreground leading-relaxed italic text-sm md:text-base">
                <p>{t("gallery.desc.p1")}</p>
                <p>{t("gallery.desc.p2")}</p>
             </div>
          </Reveal>
        </div>
      </section>

      {/* CRACKS & PATIO */}
      <section className="py-12 md:py-20 bg-navy text-navy-foreground overflow-hidden">
        <div className="container-luxe space-y-24">
          {/* CRACKS */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal className="lg:order-2">
              <h2 className="font-display text-xl md:text-3xl font-black text-gold">{t("cracks.title")}</h2>
              <div className="mt-6 space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
                <p>{t("cracks.p1")}</p>
                <p>{t("cracks.p2")}</p>
                <p>{t("cracks.p3")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-md mx-auto lg:max-w-none">
              <img src={g8} alt={t("cracks.title")} className="h-full w-full object-cover" />
            </Reveal>
          </div>

          {/* PATIO */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <h2 className="font-display text-xl md:text-3xl font-black text-gold">{t("patio.title")}</h2>
              <div className="mt-6 space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
                <p>{t("patio.p1")}</p>
                <p>{t("patio.p2")}</p>
                <p>{t("patio.p3")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-md mx-auto lg:max-w-none">
              <img src={g9} alt={t("patio.title")} className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY */}

      <section className="bg-muted/40 py-12 md:py-20">
        <div className="container-luxe">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("why.label")}</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-black">{t("why.title")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-card p-6 ring-1 ring-border transition hover:ring-gold">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-luxe max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("nav.contact")}</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-black">{t("contact.form.title")}</h2>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">{t("contact.form.sub")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-2xl shadow-black/5">
              <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.form.name")}</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} placeholder={t("contact.form.name.ph")} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact.form.email")}</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t("contact.form.email.ph")} required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("contact.form.subject")}</label>
                  <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Marble polishing inquiry..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("contact.form.message")}</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t("contact.form.message.ph")} className="min-h-[120px]" required />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-bold h-11">
                    {t("contact.form.submit")}
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy text-navy-foreground py-12 md:py-20">
        <div className="container-luxe text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-black text-balance">
              {t("finalcta.title")}
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/70 max-w-xl mx-auto">{t("finalcta.sub")}</p>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-gold-foreground shadow-xl shadow-gold/30 transition hover:scale-105">
              <MessageCircle className="h-5 w-5" /> {t("cta.whatsappShort")}
            </a>
          </Reveal>
        </div>
      </section>

      {/* LIGHTBOX DIALOG */}
      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 overflow-visible border-none bg-transparent shadow-none ring-0 focus:ring-0 focus-visible:ring-0 outline-none">
          <DialogTitle className="sr-only">Gallery Image Preview</DialogTitle>
          <DialogDescription className="sr-only">Fullscreen view of the selected project image.</DialogDescription>
          
          <div className="relative flex items-center justify-center min-h-[50vh] max-h-[90vh]">
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute -top-4 -right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-xl transition-transform hover:scale-110 active:scale-95 border-2 border-white/20"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6 stroke-[3]" />
            </button>

            <AnimatePresence mode="wait">
              {selectedImg && (
                <motion.img
                  key={selectedImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  src={selectedImg}
                  alt="Gallery Preview"
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                />
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
