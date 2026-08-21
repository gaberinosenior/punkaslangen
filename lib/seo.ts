import { company } from "@/lib/company";
import { PRICE_KR, PRODUCT } from "@/lib/product";
import { publicSiteUrl } from "@/lib/site";

export const defaultTitle = "Punkaslangen — punkaslang vid pyspunka";

export const defaultDescription =
  "Punkaslangen är en 4 meter lång punkaslang med pumpnipplar. Överför luft från ett friskt däck till ett däck med pyspunka på 2–3 minuter — utan el. 129 kr inkl. moms.";

export const homeFaqs = [
  {
    q: "Vad är en punkaslang?",
    a: "En slang som överför luft från ett däck med tryck till ett däck som läcker. Punkaslangen är 4 meter, har pumpnipplar i båda ändar och kräver ingen el.",
  },
  {
    q: "Vad gör jag vid pyspunka?",
    a: "Sätt ut varningstriangel och slå på varningsljus. Koppla Punkaslangen mellan ett friskt däck och pyspunkan, vänta 2–3 minuter och kör vidare med sänkt fart till närmaste verkstad.",
  },
  {
    q: "Fungerar den vid vanlig punktering?",
    a: "Den är gjord för pyspunka — när luften läcker långsamt. Är däcket helt tomt, avsitet eller sönderslaget behövs bärgning. Slangen lagar inte hålet.",
  },
  {
    q: "Behöver jag fortfarande till däckverkstad?",
    a: "Ja. Punkaslangen är första hjälpen så du slipper bli stående. Verkstaden lagar eller byter däcket. Fyll också på luft i däcket du lånade från.",
  },
  {
    q: "Fungerar den på alla fordon?",
    a: "På nästan allt med standardventil: bil, husbil, traktor, släp, lastbil, motorcykel och cykel. Vissa cyklar behöver en liten adapter, samma som på macken.",
  },
] as const;

function orgId() {
  return `${publicSiteUrl()}/#organization`;
}

export function organizationNode() {
  const url = publicSiteUrl();
  return {
    "@type": "Organization",
    "@id": orgId(),
    name: PRODUCT.name,
    legalName: company.legalName,
    url,
    email: company.email,
    logo: `${url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      postalCode: "170 69",
      addressLocality: "Solna",
      addressCountry: "SE",
    },
  };
}

export function websiteNode() {
  const url = publicSiteUrl();
  return {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: PRODUCT.name,
    url,
    inLanguage: "sv-SE",
    publisher: { "@id": orgId() },
  };
}

export function productNode() {
  const url = publicSiteUrl();
  return {
    "@type": "Product",
    "@id": `${url}/#product`,
    name: PRODUCT.name,
    alternateName: "Punkaslang",
    description: PRODUCT.description,
    image: [
      `${url}/images/punkaslangen.png`,
      `${url}/images/punkaslangen-cutout.png`,
    ],
    sku: PRODUCT.sku,
    brand: { "@type": "Brand", name: PRODUCT.name },
    manufacturer: {
      "@type": "Organization",
      name: company.manufacturer.name,
    },
    offers: {
      "@type": "Offer",
      url: `${url}/kop`,
      priceCurrency: "SEK",
      price: String(PRICE_KR),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": orgId() },
    },
  };
}

export function faqNode(
  items: readonly { q: string; a: string }[] = homeFaqs,
) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function howToNode() {
  const url = publicSiteUrl();
  return {
    "@type": "HowTo",
    name: "Så använder du Punkaslangen vid pyspunka",
    description: PRODUCT.description,
    url: `${url}/instruktioner`,
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Anslut ett friskt däck",
        text: "Koppla den ena nippeln till ett däck med lufttryck — ett annat hjul på samma fordon, ett reservhjul eller ett annat fordon.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Koppla på pyspunkan",
        text: "Koppla den andra nippeln till däcket som läcker. Sätt ut varningstriangel om du står vid vägen.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Vänta 2–3 minuter",
        text: "När trycket utjämnats kopplar du bort slangen och kör vidare med sänkt fart till närmaste verkstad. Fyll på luft i däcket du lånade från.",
      },
    ],
  };
}

export function graphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), ...nodes],
  };
}
