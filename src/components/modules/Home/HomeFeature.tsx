import { Activity, ArrowRight, History, Lock, Send, Clock } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  excerpt: string;
  href: string;
  icon: React.ReactElement;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Send Money Instantly",
    excerpt:
      "Transfer funds in seconds with a secure and reliable system that works anytime, anywhere.",
    href: "/features",
    icon: <Send />,
  },
  {
    id: 2,
    title: "Track All Transactions",
    excerpt:
      "Stay on top of your money with complete transaction history and date-based filtering.",
    href: "/features",
    icon: <History />,
  },
  {
    id: 3,
    title: "Secure & Encrypted",
    excerpt:
      "Every transaction is protected with bank-grade security, keeping your money safe.",
    href: "/features",
    icon: <Lock />,
  },
  {
    id: 4,
    title: "24/7 Availability",
    excerpt:
      "No banking hours needed. PaisaHiPaisa is always open for your financial needs.",
    href: "/features",
    icon: <Clock />,
  },
  {
    id: 5,
    title: "Smart Insights",
    excerpt:
      "Analyze spending and earnings with simple charts and performance summaries.",
    href: "/features",
    icon: <Activity />,
  },
];

export default function HomeFeature() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl/tight font-semibold tracking-tight sm:text-4xl/tight">
            What We Offer
          </h2>
          <p className="text-muted-foreground mt-4 text-base/7 sm:text-lg/8">
            PaisaHiPaisa brings convenience and security to your financial
            journey. Whether you send, receive, or track—everything is at your
            fingertips.
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {features.map((feature: Feature) => {
            return (
              <div
                key={feature.id}
                className="flex flex-1 flex-col items-center text-center"
              >
                <div className="bg-primary text-primary-foreground inline-flex size-11 items-center justify-center rounded-md shadow-sm [&_svg]:size-4">
                  {feature.icon}
                </div>
                <div className="mt-4 flex-1">
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-sm text-sm/6">
                    {feature.excerpt}
                  </p>
                </div>
                <a
                  href={feature.href}
                  className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-85"
                >
                  Learn More <ArrowRight className="size-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
