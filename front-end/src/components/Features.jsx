import { File, Shield, Timer, Calendar, Share } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <File />,
    title: "Invest in Entire Markets",
    description:
      "You can invest in etire markets includes US, EU, Asia, America and Africa.",
  },
  {
    icon: <Shield />,
    title: "Blockchain Contract",
    description:
      "Secure contracts based on Blockchain.",
  },
  {
    icon: <Timer />,
    title: "Long-term Investment",
    description:
      "You can invest long-term based goal.",
  },
  {
    icon: <Calendar />,
    title: "Scheduled Withdrawal",
    description:
      "Set specific dates for your withdrawals to secure your gains.",
  },
];

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-10 px-4 text-center md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            EXTF Features
          </h2>
          <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl/relaxed xl:text-base/relaxed">
            The EXTF application introduces innovative features to
            invest in entire markets with digital assets.
          </p>
        </div>

        <div className="grid gap-10 md:px-28 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="w-full h-full">
              <CardHeader className="flex items-center justify-center">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
