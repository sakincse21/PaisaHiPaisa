import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Saleheen Uddin Sakin",
    role: "Founder & Lead Developer",
    description:
      "Passionate about building digital solutions that empower users to take control of their money and grow financially.",
    avatarUrl: "https://avatars.githubusercontent.com/u/171696749?s=400&u=ffa547b68d80b144028671c394ed87770e47610b&v=4",
  },
  {
    id: 2,
    name: "Ishrat Jahan",
    role: "UI/UX Designer",
    description:
      "Designs simple, clean, and intuitive interfaces to make financial management stress-free for everyone.",
    avatarUrl: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    id: 3,
    name: "PiroPanda",
    role: "Backend Engineer",
    description:
      "Ensures that data stays secure, reliable, and fast for users across the platform.",
    avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQGoZVFcccvgmQ/profile-displayphoto-crop_800_800/B56ZipwWGXG0AQ-/0/1755194680659?e=1759363200&v=beta&t=ozOfbdsGHMFNGkKdEAhHk80XI-c8N3RuUs_rvR7FGqE",
  },
];

export default function About() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6 lg:max-w-6xl">
        {/* Header */}
        <div className="mx-auto text-center max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            About PaisaHiPaisa
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-7">
            PaisaHiPaisa is a modern money management platform that helps you
            track expenses, set savings goals, and manage your finances with
            ease. Our mission is to make financial control simple, secure, and
            accessible to everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            We believe financial freedom should not be complicated. By providing
            intuitive tools and smart insights, PaisaHiPaisa empowers users to
            make better financial decisions every day.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.id} className="flex flex-col">
                <CardContent className="flex-1 text-center">
                  <img
                    className="mx-auto size-20 rounded-full mb-4"
                    src={member.avatarUrl}
                    alt={member.name}
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold">Our Core Values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-lg bg-muted">
              <h3 className="text-lg font-medium mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                We believe in honesty and clarity when it comes to your money.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-muted">
              <h3 className="text-lg font-medium mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">
                Your financial data is protected with bank-level encryption and
                privacy standards.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-muted">
              <h3 className="text-lg font-medium mb-2">Simplicity</h3>
              <p className="text-sm text-muted-foreground">
                Managing money should be simple and stress-free for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
