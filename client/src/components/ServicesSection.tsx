import { 
  FileText, 
  Users, 
  Brain, 
  Megaphone, 
  Hash, 
  LineChart 
} from "lucide-react";

const services = [
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Strategy Development",
    description: "Crafting tailored marketing campaigns that align with your blockchain project's unique goals, fostering deep connections and long-term growth."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Community Building",
    description: "Managing community support and interns, running social media channels such as X, Telegram, and Discord, plus designing engaging airdrop campaigns to cultivate loyal, active users around your Web3 project."
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI Proficiency",
    description: "Leveraging AI to enhance workflows without replacing the human touch—much like building this site on Replit—ensuring creativity and soul remain at the core."
  },
  {
    icon: <Megaphone className="h-10 w-10" />,
    title: "Web3 Advertising",
    description: "Expertise in decentralized ad platforms, PPC strategies, and targeted campaigns for crypto-native audiences, bypassing traditional networks for authentic reach."
  },
  {
    icon: <Hash className="h-10 w-10" />,
    title: "Social Media Savvy",
    description: "Mastering X (Twitter) for real-time sentiment analysis, trend-jacking, influencer collaborations, and viral content; plus narrative crafting to simplify DeFi or layer-2 concepts, and forging key partnerships."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Blockchain Analytics",
    description: "Providing data-driven insights across multiple ecosystems and cross-chain activities to optimize marketing and measure on-chain engagement effectively."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-section relative pb-8 md:pb-10 lg:pb-12">
      <div className="container-fluid mx-auto px-4 sm:px-6 z-10 relative py-8 sm:py-10 md:py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-poppins">Services</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto italic">
              "I offer wonders from the deep places."
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