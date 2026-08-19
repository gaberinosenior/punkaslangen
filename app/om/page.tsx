import type { Metadata } from "next";
import Image from "next/image";
import { ArticlePage } from "@/components/ArticlePage";
import { OutlinedButton } from "@/components/OutlinedButton";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Uppfinnaren till Punkaslangen, Pertti Hirvonen, och historien bakom produkten.",
};

export default function AboutPage() {
  return (
    <ArticlePage
      title="om oss"
      cta={<OutlinedButton href="/kop">Beställ</OutlinedButton>}
    >
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 md:grid-cols-2 md:gap-16">
        <figure>
          <Image
            src="/images/pertti-verkstad.jpg"
            alt="Pertti Hirvonen i verkstaden"
            width={1279}
            height={700}
            className="h-auto w-full rounded-card object-cover"
            priority
          />
          <figcaption className="mt-3 text-caption text-muted">
            Photography by Jessie Wadman
          </figcaption>
        </figure>
        <div className="space-y-6 text-body text-carbon">
          <h2 className="text-heading-sm font-extrabold">Pertti Hirvonen</h2>
          <p>
            Uppfinnaren till Punkaslangen® kom från Finland till Sverige som ung
            man, och har framgångsrikt drivit en egen mekanisk verkstad i över
            37 år. Han har sedan tidigare erfarenhet av att utveckla och ta fram
            produkter för motor och fordonsindustrin, och Punkaslangen® är hans
            senaste tillskott.
          </p>
          <p>
            Snilleblixten kom en dag då Pertti själv fått utstå pyspunka en gång
            för många, där han behövt åka och hämta en kompressor, och tänkte
            för sig själv att “det här, det måste gå att lösa enklare!”
          </p>
          <p>
            Efter ett intensivt år av produktutveckling, materialval, tester och
            förfining så är den äntligen här. Årets kanske mest förnuftiga
            present man kan ge sig själv eller någon annan.
          </p>
        </div>
      </div>
    </ArticlePage>
  );
}
