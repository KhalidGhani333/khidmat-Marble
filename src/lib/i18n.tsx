import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ar";
type Theme = "light" | "dark";

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (k: string) => string;
}

const dict: Record<string, { en: string; ar: string }> = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.about": { en: "About Us", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.guides": { en: "Guides", ar: "الدليل" },
  "nav.blog": { en: "Blog", ar: "المدونة" },
  "nav.tileMarble": { en: "Tile & Marble", ar: "جلي بلاط ورخام" },
  "nav.ceramicPorcelain": { en: "Ceramic & Porcelain", ar: "سيراميك وبورسلان" },
  "nav.projects": { en: "Projects", ar: "معرض المشاريع" },
  "nav.cta": { en: "Contact", ar: "تواصل" },
  "site.name": { en: "Tile and Marble polishing", ar: "جلي بلاط تلميع" },
  tagline: { en: "Marble & Tile Care", ar: "العناية بالرخام والسيراميك" },

  "hero.badge": {
    en: "✦ Riyadh's #1 Marble & Tile Polishing Specialists",
    ar: "✦ متخصصو جلي البلاط وتلميع الرخام رقم 1 في الرياض",
  },
  "hero.title": {
    en: "Tile polishing, marble polishing, ceramic and porcelain cleaning, yard, roof, and water tanks - Arshad",
    ar: "جلي بلاط وتلميع رخام وتنظيف سيراميك وبورسلان وحوش وسطح وخزانات - أرشد",
  },
  "hero.sub": {
    en: "Marble and tile polishing services. Cleaning ceramic and porcelain for yards, roofs, bathrooms, tanks and kitchens.",
    ar: "خدمات جلي وتلميع الرخام والبلاط. تنظيف السيراميك والبورسلان للأحواش والأسطح والحمامات والخزانات والمطابخ.",
  },
  "cta.whatsapp": { en: "Get Free Quote on WhatsApp", ar: "احصل على عرض مجاني عبر واتساب" },
  "cta.call": { en: "Call Now +966 53 650 8959", ar: "اتصل الآن ‎+966 53 650 8959" },
  "cta.whatsappShort": { en: "WhatsApp Us Now", ar: "راسلنا عبر واتساب" },
  "cta.callShort": { en: "Call Us Now", ar: "اتصل بنا الآن" },
  "cta.bookService": { en: "Book Service", ar: "احجز الخدمة" },

  "stats.years": { en: "Years of Experience", ar: "سنوات من الخبرة" },
  "stats.projects": { en: "Projects Completed", ar: "مشروع مكتمل" },
  "stats.satisfaction": { en: "Client Satisfaction", ar: "رضا العملاء" },
  "stats.active": { en: "Riyadh Districts Served", ar: "أحياء الرياض التي نخدمها" },

  "about.title": { en: "About marble polishing in Riyadh", ar: "حول جلي وتلميع الرخام في الرياض" },
  "about.p1": {
    en: "We specialize in marble polishing in Riyadh, offering professional services designed to restore your marble to its original, luxurious, and elegant appearance. We utilize the latest polishing equipment and advanced treatment techniques to remove scratches, stains, and fading, while fully preserving the marble's quality and integrity, giving your floors a long-lasting, brilliant shine.",
    ar: "نحن متخصصون في جلي وتلميع الرخام في الرياض، ونقدم خدمات احترافية مصممة لاستعادة مظهر الرخام الأصلي والفاخر والأنيق. نحن نستخدم أحدث معدات التلميع وتقنيات المعالجة المتقدمة لإزالة الخدوش والبقع والبهتان، مع الحفاظ الكامل على جودة الرخام وسلامته، مما يمنح أرضياتك لمعاناً رائعاً يدوم طويلاً.",
  },
  "about.p2": {
    en: "Our team possesses extensive practical experience working with all types of marble and natural stone, whether in homes, villas, offices, or commercial establishments. We adhere to the highest standards of quality and precision at every stage of the work, and we strive to complete the service as quickly as possible without compromising the quality of the final results.",
    ar: "يمتلك فريقنا خبرة عملية واسعة في التعامل مع جميع أنواع الرخام والحجر الطبيعي، سواء في المنازل أو الفلل أو المكاتب أو المنشآت التجارية. نحن نلتزم بأعلى معايير الجودة والدقة في كل مرحلة من مراحل العمل، ونسعى جاهدين لإكمال الخدمة في أسرع وقت ممكن دون المساس بجودة النتائج النهائية.",
  },
  "about.p3": {
    en: "We believe that customer satisfaction is the foundation of our success, so we provide customized solutions tailored to each client's needs, with competitive prices and reliable service. With marble polishing in Riyadh, we guarantee an elegant appearance, high quality, and professional care that enhances the beauty and value of your space.",
    ar: "نحن نؤمن بأن رضا العملاء هو أساس نجاحنا، لذلك نقدم حلولاً مخصصة تناسب احتياجات كل عميل، بأسعار تنافسية وخدمة موثوقة. مع جلي وتلميع الرخام في الرياض، نضمن مظهراً أنيقاً وجودة عالية وعناية احترافية تعزز جمال وقيمة مساحتك.",
  },

  "services.label": { en: "WHAT WE DO", ar: "ماذا نقدم" },
  "services.title": { en: "Our services", ar: "خدماتنا" },
  "services.intro.p1": {
    en: "Thank you for your interest in our marble polishing services in Riyadh. We offer specialized marble and tile polishing and cleaning services at the highest quality and best prices in Riyadh. Our aim is to provide effective solutions that restore floors to their natural shine and maintain their beauty for a long time, with a firm commitment to precision and punctuality.",
    ar: "نشكرك على اهتمامك بخدماتنا لجلي وتلميع الرخام في الرياض. نحن نقدم خدمات جلي وتلميع وتنظيف الرخام والبلاط المتخصصة بأعلى جودة وأفضل الأسعار في الرياض. هدفنا هو تقديم حلول فعالة تعيد للأرضيات لمعانها الطبيعي وتحافظ على جمالها لفترة طويلة، مع التزام صارم بالدقة والمواعيد.",
  },
  "services.intro.p2": {
    en: "We understand the importance of maintaining the cleanliness and elegance of marble and tiles in homes and offices, so we use the latest equipment and advanced technologies for floor cleaning and polishing. Our highly trained and experienced team is committed to executing each project with meticulous care to ensure outstanding results that satisfy our clients.",
    ar: "نحن ندرك أهمية الحفاظ على نظافة وأناقة الرخام والبلاط في المنازل والمكاتب، لذلك نستخدم أحدث المعدات والتقنيات المتقدمة لتنظيف وتلميع الأرضيات. يلتزم فريقنا المدرب تدريباً عالياً وذو الخبرة بتنفيذ كل مشروع بعناية فائقة لضمان نتائج متميزة ترضي عملائنا.",
  },
  "services.intro.p3": {
    en: "Whether you need kitchen marble polishing, bathroom tile cleaning, or floor treatment for large spaces, marble polishing in Riyadh offers a comprehensive service at an affordable price. Regardless of the surface type or size, we guarantee professional results that reflect beauty and sophistication and fully meet your expectations.",
    ar: "سواء كنت بحاجة إلى جلي رخام المطبخ، أو تنظيف بلاط الحمام، أو معالجة الأرضيات للمساحات الكبيرة، فإن جلي وتلميع الرخام في الرياض يقدم خدمة شاملة بسعر مناسب. بغض النظر عن نوع السطح أو حجمه، نضمن نتائج احترافية تعكس الجمال والرقي وتلبي توقعاتك تماماً.",
  },

  "cracks.title": {
    en: "Repairing tile cracks and making special arrangements for polishing old tiles",
    ar: "إصلاح تشققات البلاط وعمل ترتيبات خاصة لتلميع البلاط القديم",
  },
  "cracks.p1": {
    en: "In Riyadh, we offer specialized marble polishing services, including tile cleaning and crack repair. We understand that tile cracks are among the most common problems and require prompt intervention to prevent further damage. These cracks can result from natural factors such as temperature and humidity changes, or from technical issues like poor installation or excessive pressure on the tiles over time.",
    ar: "في الرياض، نقدم خدمات متخصصة في جلي وتلميع الرخام، بما في ذلك تنظيف البلاط وإصلاح التشققات. نحن ندرك أن تشققات البلاط من بين المشاكل الأكثر شيوعاً وتتطلب تدخلاً فورياً لمنع المزيد من الضرر. يمكن أن تنتج هذه التشققات عن عوامل طبيعية مثل تغيرات درجات الحرارة والرطوبة، أو عن مشاكل فنية مثل سوء التركيب أو الضغط الزائد على البلاط بمرور الوقت.",
  },
  "cracks.p2": {
    en: "We carefully assess cracks to determine their type, whether they are superficial cracks caused by weather conditions or deep cracks that may indicate a problem in the underlying structure. After inspection, we choose the most suitable repair method that addresses the root cause while preserving the quality and durability of the tiles.",
    ar: "نحن نقيم التشققات بعناية لتحديد نوعها، سواء كانت تشققات سطحية ناتجة عن الظروف الجوية أو تشققات عميقة قد تشير إلى مشكلة في الهيكل الأساسي. بعد الفحص، نختار طريقة الإصلاح الأكثر ملاءمة التي تعالج السبب الجذري مع الحفاظ على جودة ومتانة البلاط.",
  },
  "cracks.p3": {
    en: "The marble polishing team in Riyadh uses high-quality adhesives and specialized mixtures to fill cracks, reinforcing damaged areas with fiberglass when necessary. The surface is then smoothed and treated with protective coatings such as sealer or tile wax to ensure a consistent appearance and long-lasting shine. They also provide preventative guidance to help maintain the tiles and their beauty for as long as possible.",
    ar: "يستخدم فريق جلي وتلميع الرخام في الرياض مواد لاصقة عالية الجودة وخلطات متخصصة لملء التشققات، مع تعزيز المناطق المتضررة بالألياف الزجاجية عند الضرورة. ثم يتم تنعيم السطح ومعالجته بطبقات واقية مثل العازل أو شمع البلاط لضمان مظهر متناسق ولمعان يدوم طويلاً. كما يقدمون إرشادات وقائية للمساعدة في الحفاظ على البلاط وجماله لأطول فترة ممكنة.",
  },

  "patio.title": {
    en: "The importance of polishing patio tiles",
    ar: "أهمية جلي وتلميع بلاط الحوش",
  },
  "patio.p1": {
    en: "We believe that polishing patio tiles is essential for maintaining the elegance and cleanliness of outdoor spaces. Over time, tiles accumulate dust, stains, and weather elements that affect their appearance and shine. We utilize modern techniques and specialized cleaning materials that effectively remove dirt and restore the tiles' natural luster and vitality, leaving your patio looking stylish and refreshed.",
    ar: "نحن نؤمن بأن جلي وتلميع بلاط الحوش ضروري للحفاظ على أناقة ونظافة المساحات الخارجية. بمرور الوقت، يتراكم الغبار والبقع والعوامل الجوية على البلاط مما يؤثر على مظهره ولمعانه. نحن نستخدم تقنيات حديثة ومواد تنظيف متخصصة تزيل الأوساخ بفعالية وتعيد للبلاط بريقه وحيويته الطبيعية، مما يترك حوش منزلك يبدو أنيقاً ومتجدداً.",
  },
  "patio.p2": {
    en: "The tile polishing process begins with a deep cleaning that removes stubborn deposits and stains using advanced equipment, ensuring the tiles are protected from any damage. Whether you're looking for routine maintenance or a complete overhaul of your faded patio tiles, our team offers flexible and tailored solutions for every situation, transforming your patio into a comfortable and inviting space for everyday use.",
    ar: "تبدأ عملية تلميع البلاط بتنظيف عميق يزيل الترسبات والبقع المستعصية باستخدام معدات متقدمة، مما يضمن حماية البلاط من أي ضرر. سواء كنت تبحث عن صيانة روتينية أو تجديد شامل لبلاط الحوش الباهت، يقدم فريقنا حلولاً مرنة ومخصصة لكل موقف، مما يحول حوش منزلك إلى مساحة مريحة وجذابة للاستخدام اليومي.",
  },
  "patio.p3": {
    en: "Our services don't just focus on enhancing the exterior appearance; we also aim to improve the durability of your tiles and extend their lifespan. By using high-quality materials and advanced polishing techniques, we guarantee long-lasting results that keep your patio looking beautiful and clean. Choose our services for a professional polish that will give your outdoor space a lasting shine.",
    ar: "لا تركز خدماتنا فقط على تحسين المظهر الخارجي؛ نهدف أيضاً إلى تحسين متانة البلاط وإطالة عمره الافتراضي. باستخدام مواد عالية الجودة وتقنيات تلميع متقدمة، نضمن نتائج تدوم طويلاً تحافظ على جمال ونظافة حوش منزلك. اختر خدماتنا للحصول على تلميع احترافي يمنح مساحتك الخارجية لمعاناً يدوم طويلاً.",
  },

  "transform.label": { en: "BEFORE & AFTER", ar: "قبل وبعد" },
  "transform.title": { en: "See the Transformation", ar: "شاهد التحول" },
  "gallery.label": { en: "OUR WORK", ar: "أعمالنا" },
  "gallery.title": { en: "Our Work Gallery", ar: "معرض أعمالنا" },
  "gallery.view": { en: "View", ar: "عرض" },
  "why.label": { en: "OUR ADVANTAGE", ar: "ميزتنا" },
  "why.title": { en: "Why Choose Us", ar: "لماذا تختارنا" },
  "finalcta.title": { en: "Ready to Transform Your Space?", ar: "هل أنت مستعد لتحويل مساحتك؟" },
  "finalcta.sub": {
    en: "Free inspection and quote available across all Riyadh",
    ar: "فحص وعرض سعر مجاني في جميع أنحاء الرياض",
  },

  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.contact": { en: "Contact Info", ar: "معلومات الاتصال" },
  "footer.quote": { en: "Get Free Quote", ar: "احصل على عرض مجاني" },
  "footer.desc": {
    en: "We specialize in marble polishing in Riyadh, offering professional services designed to restore your marble to its original, luxurious, and elegant appearance.",
    ar: "نحن متخصصون في جلي وتلميع الرخام في الرياض، ونقدم خدمات احترافية مصممة لاستعادة مظهر الرخام الأصلي والفاخر والأنيق.",
  },

  // Services
  "service.marble.title": { en: "Marble polishing in Riyadh", ar: "تلميع الرخام في الرياض" },
  "service.marble.desc": {
    en: "We take care of marble polishing in Riyadh to restore the natural shine to stone floors and remove any signs of damage or fading, while maintaining their durability and beauty.",
    ar: "نحن نهتم بجلي وتلميع الرخام في الرياض لاستعادة اللمعان الطبيعي للأرضيات الحجرية وإزالة أي علامات للتلف أو البهتان، مع الحفاظ على متانتها وجمالها.",
  },
  "service.tile.title": { en: "Tile polishing in Riyadh", ar: "جلي البلاط في الرياض" },
  "service.tile.desc": {
    en: "We offer tile polishing services in Riyadh to remove stains and scratches and restore the shine to the floors, making them clean and shiny with the highest quality and high professionalism.",
    ar: "نحن نقدم خدمات جلي البلاط في الرياض لإزالة البقع والخدوش واستعادة اللمعان للأرضيات، مما يجعلها نظيفة ولامعة بأعلى جودة واحترافية عالية.",
  },
  "service.ceramic.title": {
    en: "Ceramic tile cleaning in Riyadh",
    ar: "تنظيف بلاط السيراميك في الرياض",
  },
  "service.ceramic.desc": {
    en: "Our ceramic cleaning service in Riyadh guarantees the easy removal of dirt and grease, so that your floors look clean and tidy without any extra effort from you.",
    ar: "تضمن خدمة تنظيف السيراميك لدينا في الرياض سهولة إزالة الأوساخ والشحوم، لتبدو أرضياتك نظيفة ومرتبة دون أي مجهود إضافي منك.",
  },
  "service.porcelain.title": {
    en: "Porcelain cleaning in Riyadh",
    ar: "تنظيف البورسلان في الرياض",
  },
  "service.porcelain.desc": {
    en: "We provide porcelain cleaning services in Riyadh using safe and effective materials and techniques that preserve its shine and appearance. We utilize the latest equipment to extend its lifespan without any scratches or damage.",
    ar: "نحن نقدم خدمات تنظيف البورسلان في الرياض باستخدام مواد وتقنيات آمنة وفعالة تحافظ على لمعانه ومظهره. نحن نستخدم أحدث المعدات لإطالة عمره الافتراضي دون أي خدوش أو تلف.",
  },
  "service.courtyard.title": { en: "Yard cleaning in Riyadh", ar: "تنظيف الحوش في الرياض" },
  "service.courtyard.desc": {
    en: "We take care of cleaning the yard in Riyadh to remove accumulated dust and dirt, while providing a neat and bright appearance that adds a touch of beauty to the place.",
    ar: "نحن نهتم بتنظيف الحوش في الرياض لإزالة الغبار والأوساخ المتراكمة، مع توفير مظهر أنيق ومشرق يضيف لمسة من الجمال للمكان.",
  },
  "service.tanks.title": {
    en: "Roof and tank cleaning in Riyadh",
    ar: "تنظيف الأسطح والخزانات في الرياض",
  },
  "service.tanks.desc": {
    en: "Our roof and tank cleaning service in Riyadh ensures a healthy and safe environment, as we remove dirt and impurities while guaranteeing the complete cleanliness of the water and tanks.",
    ar: "تضمن خدمة تنظيف الأسطح والخزانات لدينا في الرياض بيئة صحية وآمنة، حيث نقوم بإزالة الأوساخ والشوائب مع ضمان النظافة الكاملة للمياه والخزانات.",
  },

  // Educational Content
  "edu.cracks.title": { en: "Understanding Floor Cracks", ar: "فهم تشققات الأرضيات" },
  "edu.cracks.desc": {
    en: "Not all cracks are the same. Learn to distinguish between surface weathering and structural issues.",
    ar: "ليست كل التشققات متشابهة. تعلم كيفية التمييز بين التجوية السطحية والمشاكل الهيكلية.",
  },
  "edu.cracks.types": {
    en: "Surface Cracks vs Structural Cracks",
    ar: "التشققات السطحية مقابل التشققات الهيكلية",
  },
  "edu.cracks.causes": {
    en: "Causes: Temperature changes, poor installation, or foundation pressure.",
    ar: "الأسباب: تغيرات درجة الحرارة، سوء التركيب، أو ضغط الأساس.",
  },

  "edu.maintenance.title": { en: "Pro Maintenance Tips", ar: "نصائح صيانة احترافية" },
  "edu.maintenance.acid": {
    en: "Never use acidic cleaners (lemon, vinegar) on marble.",
    ar: "لا تستخدم أبداً المنظفات الحمضية (الليمون، الخل) على الرخام.",
  },
  "edu.maintenance.dust": {
    en: "Regularly dust-mop to prevent micro-scratches from grit.",
    ar: "استخدم الممسحة بانتظام لمنع الخدوش الدقيقة الناتجة عن الحصى.",
  },

  "edu.process.diamond": { en: "The Science of Diamond Polishing", ar: "علم التلميع بالألماس" },
  "edu.process.diamond.desc": {
    en: "Why true restoration beats chemical waxing every time.",
    ar: "لماذا يتفوق الترميم الحقيقي على التشميع الكيميائي في كل مرة.",
  },
  "edu.process.diamond.leveling": {
    en: "Precision Leveling (Lippage Removal)",
    ar: "تسوية دقيقة (إزالة الفروق بين الرخام)",
  },
  "edu.process.diamond.leveling.desc": {
    en: "We grind down uneven edges to create a perfectly flat, monolithic floor surface.",
    ar: "نقوم بجلي الحواف غير المستوية لإنشاء سطح أرضية مسطح تماماً ومتجانس.",
  },
  "edu.process.diamond.wet": {
    en: "100% Dust-Free Process",
    ar: "عملية خالية من الغبار بنسبة 100%",
  },
  "edu.process.diamond.wet.desc": {
    en: "Our wet-grinding technique ensures no dust enters your home or HVAC system.",
    ar: "تقنية الجلي الرطب لدينا تضمن عدم دخول الغبار إلى منزلك أو نظام التكييف.",
  },
  "edu.process.diamond.longevity": { en: "Lasts 3-5x Longer", ar: "يدوم لفترة أطول بـ 3-5 مرات" },
  "edu.process.diamond.longevity.desc": {
    en: "Diamond polishing restores the stone itself, not just a temporary top coat.",
    ar: "التلميع بالألماس يرمم الحجر نفسه، وليس مجرد طبقة علوية مؤقتة.",
  },

  "comp.diamond": { en: "Diamond Polishing", ar: "التلميع بالألماس" },
  "comp.wax": { en: "Traditional Waxing", ar: "التشميع التقليدي" },
  "comp.res.diamond": { en: "Natural, mirror-like depth", ar: "عمق طبيعي يشبه المرآة" },
  "comp.res.wax": { en: "Artificial, plastic-looking shine", ar: "لمعان اصطناعي يشبه البلاستيك" },
  "comp.dur.diamond": { en: "Years of durability", ar: "سنوات من المتانة" },
  "comp.dur.wax": { en: "Weeks/Months before yellowing", ar: "أسابيع/أشهر قبل الاصفرار" },

  // Guides Page
  "guides.hero.title": { en: "Expert Care Guides", ar: "أدلة العناية من الخبراء" },
  "guides.hero.sub": {
    en: "Deep dives into stone restoration, maintenance, and protection.",
    ar: "تعمق في ترميم الحجر وصيانته وحمايته.",
  },

  "guide.cracks.title": {
    en: "The Ultimate Guide to Tile Cracks",
    ar: "الدليل النهائي لتشققات البلاط",
  },
  "guide.cracks.sub": {
    en: "How to identify, repair, and prevent future damage.",
    ar: "كيفية تحديد وإصلاح ومنع الأضرار المستقبلية.",
  },

  "guide.marble.title": { en: "Marble Care 101", ar: "أساسيات العناية بالرخام" },
  "guide.marble.sub": {
    en: "Keep your luxury floors looking like new for decades.",
    ar: "حافظ على أرضياتك الفاخرة لتبدو وكأنها جديدة لعقود.",
  },

  "guide.tanks.title": { en: "Water Tank Hygiene", ar: "نظافة خزانات المياه" },
  "guide.tanks.sub": {
    en: "Why cleaning your Riyadh tank is vital for health.",
    ar: "لماذا يعد تنظيف خزانك في الرياض حيوياً للصحة.",
  },

  // Features
  "feature.expert.title": { en: "Expert Technicians", ar: "فنيون متخصصون" },
  "feature.expert.desc": {
    en: "Specialist craftsmen with 10+ years of marble and tile restoration experience across Riyadh.",
    ar: "حرفيون متخصصون بخبرة تزيد عن 10 سنوات في ترميم الرخام والبلاط في الرياض.",
  },
  "feature.italy.title": { en: "Italian Equipment", ar: "معدات إيطالية" },
  "feature.italy.desc": {
    en: "Premium Lavor, Fimap, Ghibli and Klindex machinery - diamond pads and crystal polishing materials.",
    ar: "ماكينات لافور وفيماب وجيبلي وكليندكس - أقراص ألماس ومواد تلميع كريستال.",
  },
  "feature.fast.title": { en: "Fast Turnaround", ar: "إنجاز سريع" },
  "feature.fast.desc": {
    en: "Most residential jobs completed within 24–48 hours. Larger commercial spaces in 3–5 days.",
    ar: "معظم الأعمال السكنية تنتهي خلال 24-48 ساعة. المساحات التجارية في 3-5 أيام.",
  },
  "feature.price.title": { en: "Budget-Friendly Pricing", ar: "أسعار تناسب الميزانية" },
  "feature.price.desc": {
    en: "Competitive, transparent quotes with no hidden fees - free site visit and inspection included.",
    ar: "عروض أسعار تنافسية وشفافة بلا رسوم خفية - زيارة الموقع والفحص مجانية.",
  },

  // Testimonials
  "testi.label": { en: "CLIENT REVIEWS", ar: "آراء العملاء" },
  "testi.title": { en: "What Clients Say", ar: "ماذا يقول عملاؤنا" },
  "testi.ahmed.name": { en: "Ahmed Al-Rashidi", ar: "أحمد الرشيدي" },
  "testi.ahmed.role": { en: "Villa Owner, Al Olaya", ar: "صاحب فيلا، العليا" },
  "testi.ahmed.quote": {
    en: "Our marble floors look brand new. Khidmat's team was punctual, professional and the result exceeded our expectations. The shine has lasted for over a year.",
    ar: "تبدو أرضيات الرخام لدينا كأنها جديدة. كان فريق خدمة منضبطاً ومحترفاً والنتيجة تجاوزت توقعاتنا. استمر اللمعان لأكثر من عام.",
  },
  "testi.sara.name": { en: "Sara Al-Mutairi", ar: "سارة المطيري" },
  "testi.sara.role": { en: "Interior Designer, Riyadh", ar: "مصممة ديكور، الرياض" },
  "testi.sara.quote": {
    en: "I recommend Khidmat to every one of my clients. Their attention to detail, the diamond polishing technique and the final finish quality is genuinely in another league.",
    ar: "أوصي بخدمة لكل عملائي. اهتمامهم بالتفاصيل وتقنية التلميع بالألماس وجودة التشطيب النهائي في مستوى آخر تماماً.",
  },
  "testi.khalid.name": { en: "Khalid Al-Dosari", ar: "خالد الدوسري" },
  "testi.khalid.role": { en: "Hotel Manager, Al Malaz", ar: "مدير فندق، الملز" },
  "testi.khalid.quote": {
    en: "We've used Khidmat across three of our properties. Consistent quality, fast execution and the shine genuinely lasts. Without a doubt the best marble polishing team in Riyadh.",
    ar: "لقد استخدمنا خدمة في ثلاثة عقارات. جودة ثابتة وتنفيذ سريع واللمعان يدوم حقاً. بلا شك أفضل فريق لتلميع الرخام في الرياض.",
  },

  // Services Page
  "services.hero.title": { en: "Tile Polishing & Marble Buffing", ar: "جلي البلاط وتلميع الرخام" },
  "services.hero.sub": {
    en: "Tile Polishing · Marble Staircase · Ceramic · Courtyard & Tank Cleaning - All Riyadh",
    ar: "جلي بلاط · تلميع درج رخام · سيراميك · هوش وخزانات - جميع أحياء الرياض",
  },
  "services.offer.title": { en: "Built on Excellence", ar: "بني على التميز" },
  "services.offer.label": { en: "What We Offer", ar: "ما نقدمه" },
  "services.all.label": { en: "ALL SERVICES", ar: "جميع خدماتنا" },
  "services.all.title": { en: "Everything We Do", ar: "كل ما نقدمه" },
  "services.special.title": { en: "Surfaces We Polish", ar: "الأسطح التي نلمعها" },
  "services.special.label": { en: "Specialties", ar: "تخصصاتنا" },
  "services.process.title": { en: "Our 6-Step Process", ar: "عمليتنا المكونة من 6 خطوات" },
  "services.process.label": { en: "Methodology", ar: "منهجيتنا" },
  "services.equip.title": { en: "Equipment We Use", ar: "المعدات التي نستخدمها" },
  "services.equip.label": { en: "Tools of the Craft", ar: "أدوات الحرفة" },
  "services.faq.title": { en: "Common Questions", ar: "الأسئلة الشائعة" },
  "faq.label": { en: "FAQ", ar: "الأسئلة الشائعة" },

  // Benefits
  "benefit.stains": {
    en: "Eliminates stains, scratches & dullness",
    ar: "يزيل البقع والخدوش والبهتان",
  },
  "benefit.shine": { en: "Restores natural shine & luster", ar: "يعيد اللمعان والبريق الطبيعي" },
  "benefit.new": { en: "Makes floors look brand new", ar: "يجعل الأرضيات تبدو وكأنها جديدة" },
  "benefit.durability": { en: "Increases surface durability", ar: "يزيد من متانة السطح" },
  "benefit.luxury": { en: "Enhances luxury appearance", ar: "يعزز المظهر الفاخر" },
  "benefit.value": { en: "Improves property value", ar: "يحسن قيمة العقار" },
  "benefit.revitalize": {
    en: "Revitalizes old tiles & marble",
    ar: "يحيي السيراميك والرخام القديم",
  },
  "benefit.highend": {
    en: "High-end polished finish for homes & offices",
    ar: "تشطيب مصقول راقٍ للمنازل والمكاتب",
  },
  "benefit.lasting": { en: "Professional shine that lasts", ar: "لمعان احترافي يدوم طويلاً" },
  "benefit.expert": { en: "10+ years of expert experience", ar: "أكثر من 10 عاماً من الخبرة" },

  // Surfaces
  "surface.marble": { en: "Marble Floor Polishing", ar: "تلميع أرضيات الرخام" },
  "surface.granite": { en: "Granite Polishing", ar: "تلميع الجرانيت" },
  "surface.tile": { en: "Tile Polishing", ar: "جلي البلاط وتلميعه" },
  "surface.stairs": { en: "Marble Staircase Polishing", ar: "تلميع درج الرخام" },
  "surface.bathroom": { en: "Ceramic & Bathroom Restoration", ar: "السيراميك وترميم الحمامات" },
  "surface.courtyard": { en: "Courtyard & Apartment", ar: "الحوش والشقق" },
  "surface.commercial": { en: "Commercial & Hotel Spaces", ar: "المساحات التجارية والفنادق" },

  // Steps
  "step.inspection.title": { en: "Inspection & Assessment", ar: "الفحص والتقييم" },
  "step.inspection.desc": {
    en: "We evaluate surface condition, damage and the right treatment plan.",
    ar: "نقيم حالة السطح والأضرار وخطة العلاج المناسبة.",
  },
  "step.cleaning.title": { en: "Deep Cleaning", ar: "التنظيف العميق" },
  "step.cleaning.desc": {
    en: "Industrial cleaners lift dirt, grease and built-up residue.",
    ar: "المنظفات الصناعية تزيل الأوساخ والشحوم والبقايا المتراكمة.",
  },
  "step.honing.title": { en: "Honing", ar: "التنعيم" },
  "step.honing.desc": {
    en: "Diamond pads remove scratches and level the surface evenly.",
    ar: "أقراص الألماس تزيل الخدوش وتساوي السطح بشكل متجانس.",
  },
  "step.polishing.title": { en: "Polishing", ar: "التلميع" },
  "step.polishing.desc": {
    en: "Progressive grits restore the high-gloss mirror finish.",
    ar: "درجات تلميع متدرجة تعيد اللمعان العالي كالمراية.",
  },
  "step.sealing.title": { en: "Sealing", ar: "العزل" },
  "step.sealing.desc": {
    en: "Penetrating sealers protect against stains and moisture.",
    ar: "مواد العزل المتغلغلة تحمي من البقع والرطوبة.",
  },
  "step.final.title": { en: "Final Inspection", ar: "الفحص النهائي" },
  "step.final.desc": {
    en: "Quality check, walkthrough and care guidance for you.",
    ar: "فحص الجودة، جولة نهائية وإرشادات العناية لك.",
  },

  // Equipment
  "equip.lavor.name": { en: "Industrial Floor Scrubber", ar: "جلاية أرضيات صناعية" },
  "equip.lavor.desc": {
    en: "High-performance floor scrubber dryer for efficient and precise cleaning in various commercial environments.",
    ar: "ماكينة غسيل وتجفيف الأرضيات عالية الأداء لتنظيف فعال ودقيق في مختلف البيئات التجارية.",
  },
  "equip.fimap.name": { en: "Automatic Walk-Behind Scrubber", ar: "جلاية أوتوماتيكية خلفية" },
  "equip.fimap.desc": {
    en: "Advanced walk-behind scrubber designed for high-productivity floor maintenance and superior drying results.",
    ar: "جلاية متطورة مصممة لصيانة الأرضيات بإنتاجية عالية ونتائج تجفيف فائقة.",
  },
  "equip.ghibli.name": { en: "Single-Disc Floor Polisher", ar: "ماكينة تلميع أحادية القرص" },
  "equip.ghibli.desc": {
    en: "Versatile single-disc machine ideal for professional floor restoration, including deep cleaning and surface polishing.",
    ar: "ماكينة أحادية القرص متعددة الاستخدامات مثالية لترميم الأرضيات الاحترافي، بما في ذلك التنظيف العميق وتلميع الأسطح.",
  },
  "equip.klindex.name": { en: "Planetary Marble Grinder", ar: "جلاية رخام كوكبية" },
  "equip.klindex.desc": {
    en: "Powerful planetary floor grinder engineered for heavy-duty marble restoration and high-gloss mirror finishing.",
    ar: "ماكينة جلي أرضيات كوكبية قوية مصممة لترميم الرخام الشاق والحصول على تشطيب عالي اللمعان كالمراية.",
  },

  // FAQs
  "faq.duration.q": { en: "How long does polishing take?", ar: "كم من الوقت يستغرق التلميع؟" },
  "faq.duration.a": {
    en: "Most residential projects are completed within 1–2 days depending on surface area. Larger commercial spaces may take 3–5 days.",
    ar: "يتم الانتهاء من معظم المشاريع السكنية في غضون 1-2 يوم حسب المساحة. قد تستغرق المساحات التجارية الكبيرة 3-5 أيام.",
  },
  "faq.shine.q": { en: "Will the shine last?", ar: "هل سيدوم اللمعان؟" },
  "faq.shine.a": {
    en: "With proper care, our high-gloss finish typically lasts 2–5 years. We provide aftercare guidance to extend it.",
    ar: "مع العناية المناسبة، عادة ما يدوم التشطيب عالي اللمعان من 2 إلى 5 سنوات. نحن نقدم إرشادات العناية اللاحقة لإطالته.",
  },
  "faq.safety.q": {
    en: "Is it safe for kids or pets?",
    ar: "هل هو آمن للأطفال أو الحيوانات الأليفة؟",
  },
  "faq.safety.a": {
    en: "Yes. We use non-toxic cleaners and sealers. The area is safe to use a few hours after finishing.",
    ar: "نعم. نحن نستخدم منظفات وعوازل غير سامة. المنطقة آمنة للاستخدام بعد بضع ساعات من الانتهاء.",
  },
  "faq.frequency.q": { en: "How often should polishing be done?", ar: "كم مرة يجب إجراء التلميع؟" },
  "faq.frequency.a": {
    en: "Residential marble: every 2–3 years. High-traffic commercial floors: yearly or as needed.",
    ar: "الرخام السكني: كل 2-3 سنوات. الأرضيات التجارية ذات الحركة المرورية العالية: سنوياً أو حسب الحاجة.",
  },
  "faq.warranty.q": { en: "Do you provide a warranty?", ar: "هل تقدمون ضماناً؟" },
  "faq.warranty.a": {
    en: "Yes, we offer a satisfaction guarantee and warranty on all polishing work performed.",
    ar: "نعم، نحن نقدم ضمان الرضا وضماناً على جميع أعمال التلميع التي نقوم بها.",
  },

  "gallery.desc.p1": {
    en: "We offer marble, tile, granite, and staircase polishing services using the latest technologies and state-of-the-art equipment. We pay special attention to polishing stairs and marble facades to achieve a luxurious, long-lasting crystal-like shine. We are committed to the highest standards of precision and professionalism in our work and are fully punctual.",
    ar: "نقدم خدمات جلي وتلميع الرخام والبلاط والجرانيت والدرج باستخدام أحدث التقنيات والمعدات المتطورة. نولي اهتماماً خاصاً لتلميع الأدراج وواجهات الرخام لتحقيق لمعان كريستالي فاخر يدوم طويلاً. نحن ملتزمون بأعلى معايير الدقة والاحترافية في عملنا مع الالتزام التام بالمواعيد.",
  },
  "gallery.desc.p2": {
    en: "We rely on Syrian expertise specializing in marble polishing and cleaning, and we offer our services in the Eastern Province for all types of marble, tiles, stone facades, and granite. Our professional technicians have extensive experience, and we use only genuine diamond polishing stones and crystal polishing materials to guarantee the best results.",
    ar: "نعتمد على خبرات سورية متخصصة في جلي وتلميع وتنظيف الرخام، ونقدم خدماتنا في المنطقة الشرقية لجميع أنواع الرخام والبلاط والواجهات الحجرية والجرانيت. يمتلك فنيونا المحترفون خبرة واسعة، ونستخدم فقط أحجار جلي الألماس الأصلية ومواد تلميع الكريستال لضمان أفضل النتائج.",
  },
  "experts.label": { en: "LEARN FROM THE EXPERTS", ar: "تعلم من الخبراء" },
  "experts.title": { en: "Free Knowledge & Care Guides", ar: "أدلة مجانية للمعرفة والعناية" },
  "experts.desc": {
    en: "We believe in educating our clients. Learn how to identify structural cracks, maintain your marble's shine, and keep your home's water tanks hygienic.",
    ar: "نؤمن بتثقيف عملائنا. تعلم كيفية تحديد التشققات الهيكلية، والحفاظ على لمعان الرخام، والحفاظ على نظافة خزانات المياه في منزلك.",
  },
  "experts.link": { en: "Browse Our Guides", ar: "تصفح أدلتنا" },

  // Contact Page
  "contact.hero.title": { en: "Get In Touch", ar: "تواصل معنا" },
  "contact.hero.sub": {
    en: "Contact us for professional marble & tile polishing services in Riyadh",
    ar: "اتصل بنا للحصول على خدمات تلميع الرخام والسيراميك الاحترافية في الرياض",
  },
  "contact.direct.title": { en: "Reach Us Directly", ar: "تواصل معنا مباشرة" },
  "contact.direct.sub": {
    en: "We respond within an hour during business hours.",
    ar: "نرد خلال ساعة واحدة أثناء ساعات العمل.",
  },
  "contact.form.title": { en: "Send a Message", ar: "أرسل رسالة" },
  "contact.form.sub": {
    en: "Fill the form and we'll get back to you fast.",
    ar: "املأ النموذج وسنقوم بالرد عليك بسرعة.",
  },
  "contact.hours.title": { en: "Business Hours", ar: "ساعات العمل" },
  "contact.hours.sat": {
    en: "Saturday – Thursday: 8:00 AM – 8:00 PM",
    ar: "من السبت إلى الخميس: 8:00 صباحاً – 8:00 مساءً",
  },
  "contact.hours.fri": { en: "Friday: Off", ar: "الجمعة: مغلق" },
  "contact.form.name": { en: "Full Name *", ar: "الاسم الكامل *" },
  "contact.form.email": { en: "Email *", ar: "البريد الإلكتروني *" },
  "contact.form.phone": { en: "Phone *", ar: "رقم الهاتف *" },
  "contact.form.subject": { en: "Subject", ar: "الموضوع" },
  "contact.form.service": { en: "Service Interested In", ar: "الخدمة المطلوبة" },
  "contact.form.message": { en: "Message *", ar: "الرسالة *" },
  "contact.form.submit": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.form.sending": { en: "Sending...", ar: "جاري الإرسال..." },
  "contact.form.success": {
    en: "Message sent! We'll be in touch shortly.",
    ar: "تم إرسال الرسالة! سنتواصل معك قريباً.",
  },
  "contact.form.name.ph": { en: "e.g. Ahmed Al-Rashidi", ar: "مثال: أحمد الرشيدي" },
  "contact.form.phone.ph": { en: "+966 5x xxx xxxx", ar: "+966 5x xxx xxxx" },
  "contact.form.email.ph": { en: "you@example.com", ar: "example@example.com" },
  "contact.form.message.ph": {
    en: "Describe your floor type, area size, and any specific concerns...",
    ar: "صف نوع الأرضية والمساحة وأي مخاوف محددة...",
  },
  "contact.form.select.ph": { en: "- Select a service -", ar: "- اختر خدمة -" },
  "contact.form.opt.marble": { en: "Marble Floor Polishing", ar: "تلميع أرضيات الرخام" },
  "contact.form.opt.tile": { en: "Tile Polishing", ar: "جلي البلاط" },
  "contact.form.opt.stairs": { en: "Marble Staircase Polishing", ar: "تلميع درج الرخام" },
  "contact.form.opt.ceramic": {
    en: "Ceramic & Porcelain Cleaning",
    ar: "تنظيف السيراميك والبورسلان",
  },
  "contact.form.opt.courtyard": { en: "Apartment & Courtyard Cleaning", ar: "تنظيف الشقق والحوش" },
  "contact.form.opt.tanks": { en: "Roof & Tank Cleaning", ar: "تنظيف الأسطح والخزانات" },

  // Info Cards
  "info.phone": { en: "Phone", ar: "الهاتف" },
  "info.email": { en: "Email", ar: "البريد الإلكتروني" },
  "info.whatsapp": { en: "WhatsApp", ar: "واتساب" },
  "info.location": { en: "Location", ar: "الموقع" },

  // Contact FAQs
  "contact.faq.riyadh.q": {
    en: "Which areas do you serve in Riyadh?",
    ar: "ما هي المناطق التي تخدمونها في الرياض؟",
  },
  "contact.faq.riyadh.a": {
    en: "We serve all districts across Riyadh - North, South, East, West and the city center, including Diplomatic Quarter and surrounding compounds.",
    ar: "نحن نخدم جميع الأحياء في الرياض - الشمال والجنوب والشرق والغرب ووسط المدينة، بما في ذلك الحي الدبلوماسي والمجمعات السكنية المحيطة.",
  },
  "contact.faq.duration.q": {
    en: "How long does marble polishing take?",
    ar: "كم من الوقت يستغرق تلميع الرخام؟",
  },
  "contact.faq.duration.a": {
    en: "Most homes are completed within 1–2 days. Larger commercial spaces take 3–5 days depending on scope.",
    ar: "يتم الانتهاء من معظم المنازل في غضون 1-2 يوم. تستغرق المساحات التجارية الكبيرة 3-5 أيام حسب النطاق.",
  },
  "contact.faq.quote.q": { en: "Do you provide a free quote?", ar: "هل تقدمون عرض سعر مجاني؟" },
  "contact.faq.quote.a": {
    en: "Yes - site visit, inspection and a transparent written quote are completely free.",
    ar: "نعم - زيارة الموقع والفحص وعرض السعر المكتوب الشفاف كلها مجانية تماماً.",
  },
  "contact.faq.type.q": {
    en: "Do you work for homes and commercial spaces?",
    ar: "هل تعملون للمنازل والمساحات التجارية؟",
  },
  "contact.faq.type.a": {
    en: "Both. We handle villas, apartments, hotels, retail showrooms, mosques and offices.",
    ar: "كلاهما. نحن نتعامل مع الفلل والشقق والفنادق ومعارض البيع بالتجزئة والمساجد والمكاتب.",
  },
  "contact.faq.booking.q": { en: "How do I book a service?", ar: "كيف يمكنني حجز خدمة؟" },
  "contact.faq.booking.a": {
    en: "Message us on WhatsApp, fill the form on this page or call us directly. We respond within an hour during business hours.",
    ar: "راسلنا على واتساب، أو املأ النموذج في هذه الصفحة أو اتصل بنا مباشرة. نرد في غضون ساعة خلال ساعات العمل.",
  },
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const sl = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (sl) setLangState(sl);
    const st = typeof window !== "undefined" && localStorage.getItem("theme");
    if (st === "dark") setTheme("dark");
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const t = (k: string) => dict[k]?.[lang] ?? k;

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        t,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}

export const CONTACT = {
  phone: "+966 53 650 8959",
  whatsapp: "https://wa.me/966536508959",
  whatsappDisplay: "+966 53 650 8959",
  email: "barvez0578404211@gmail.com",
  location: "Riyadh, Saudi Arabia",
};
