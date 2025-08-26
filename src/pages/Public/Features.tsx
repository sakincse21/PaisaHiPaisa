import {
  Send,
  Wallet,
  Download,
  History,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

const features = [
  // User Features
  {
    icon: Send,
    title: "Send Money Instantly",
    description:
      "Transfer money to friends, family, or agents in seconds—fast, secure, and reliable.",
  },
  {
    icon: Download,
    title: "Withdraw Money",
    description:
      "Easily withdraw your balance anytime with full transaction safety.",
  },
  {
    icon: Wallet,
    title: "Add Money",
    description:
      "Top-up your wallet directly from bank or agent for seamless transactions.",
  },
  {
    icon: History,
    title: "Track Transactions",
    description:
      "View all your past transactions with powerful date filters to find exactly what you need.",
  },

  // Agent Features
  {
    icon: CircleDollarSign,
    title: "Cash In for Customers",
    description:
      "Agents can add money to customer wallets quickly and securely.",
  },
  {
    icon: Send,
    title: "Send Money (Agent)",
    description:
      "Facilitate transfers for customers while ensuring every transaction is logged.",
  },
  {
    icon: History,
    title: "Transaction Records",
    description:
      "Access all transaction history with advanced filtering for better management.",
  },
  {
    icon: BarChart3,
    title: "30-Day Overview",
    description:
      "Get a complete financial snapshot of the past 30 days to monitor performance.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Features That Empower Users & Agents
        </h2>
        <p className="mt-4 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          PaisaHiPaisa makes money management easy for everyone. Whether you are
          a <span className="font-semibold">User</span> or an{" "}
          <span className="font-semibold">Agent</span>, our tools help you send,
          save, and track your money effortlessly.
        </p>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5 hover:shadow-lg transition"
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
