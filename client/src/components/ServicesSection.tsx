import { 
  FileText, 
  Users, 
  FileCode, 
  Layers2, 
  Megaphone, 
  LineChart 
} from "lucide-react";

const services = [
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Strategy Development",
    description: "Tailored marketing strategies aligned with your blockchain project's unique goals and community."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Community Building",
    description: "Creating engaged, loyal communities around your decentralized products and services."
  },
  {
    icon: <FileCode className="h-10 w-10" />,
    title: "Content Creation",
    description: "Technical whitepapers, explainer content, and marketing materials that speak to both crypto natives and newcomers."
  },
  {
    icon: <Layers2 className="h-10 w-10" />,
    title: "Web3 UX/UI",
    description: "Designing intuitive interfaces that make complex blockchain interactions accessible to all users."
  },
  {
    icon: <Megaphone className="h-10 w-10" />,
    title: "Social Promotion",
    description: "Strategic promotion across Twitter, Discord, Telegram and other key platforms in the Web3 space."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Analytics & Insights",
    description: "Data-driven insights to optimize your marketing efforts and measure on-chain engagement."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-section relative pb-16 md:pb-20 lg:pb-24">
      <div className="container-fluid mx-auto px-4 sm:px-6 z-10 relative py-12 sm:py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-poppins">Our Services</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive marketing solutions tailored for the Web3 ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card p-6 md:p-8 rounded-xl border border-gray-800 flex flex-col h-full">
                <div className="text-primary mb-3 md:mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 md:mb-3 font-poppins">{service.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}