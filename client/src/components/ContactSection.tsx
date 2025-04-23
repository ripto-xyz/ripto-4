import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Users } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  project: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      message: ""
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will get back to you soon.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to elevate your Web3 marketing? Let's discuss your project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#1A1A2E] bg-opacity-80 backdrop-blur-md p-8 rounded-xl border border-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register("name")}
                  className="contact-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white" 
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  {...register("email")}
                  className="contact-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white" 
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="project" className="block text-sm font-medium text-gray-400 mb-2">Project Type</label>
                <select 
                  id="project" 
                  {...register("project")}
                  className="contact-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white bg-transparent"
                >
                  <option value="" className="bg-[#1A1A2E]">Select Project Type</option>
                  <option value="token" className="bg-[#1A1A2E]">Token Launch</option>
                  <option value="defi" className="bg-[#1A1A2E]">DeFi Protocol</option>
                  <option value="nft" className="bg-[#1A1A2E]">NFT Collection</option>
                  <option value="dao" className="bg-[#1A1A2E]">DAO Formation</option>
                  <option value="metaverse" className="bg-[#1A1A2E]">Metaverse Project</option>
                  <option value="other" className="bg-[#1A1A2E]">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  {...register("message")}
                  rows={4} 
                  className="contact-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition-colors duration-300"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          <div>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-2xl mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-poppins">Location</h3>
                  <p className="text-gray-300">
                    Global Team - Remote First<br />
                    Hubs in San Francisco, New York, London, Singapore
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-primary text-2xl mt-1">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-poppins">Email</h3>
                  <p className="text-gray-300">
                    hello@ripto.eth<br />
                    laurence@web3.marketing
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-primary text-2xl mt-1">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-poppins">Connect</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.5 6.374-.5 6.374s-.012.221-.109.338c-.9.109-.21.156-.324.177-.114.021-.285.034-.466-.069-.18-.103-3.75-2.364-3.75-2.364-.097-.064-.156-.096-.156-.195.005-.091.161-.181.161-.181s4.114-3.702 4.422-4.115c.028-.036.006-.07-.058-.106-.231-.106-1.422.391-1.422.391s-1.445.923-2.86 1.864c-.066.04-.114.066-.198.066-.073 0-.146-.023-.208-.06-.106-.063-.188-.14-.188-.14s-.333-.203-.637-.348a3.66 3.66 0 0 0-.921-.28l-.031-.01s1.463-.573 2.928-1.169c1.21-.488 2.275-.942 3.285-1.294.059-.024.116-.052.186-.063l.025-.004z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary bg-opacity-10 p-6 rounded-xl mt-4">
                <h3 className="text-xl font-bold mb-4 font-poppins">Ready to Transform Your Web3 Presence?</h3>
                <p className="text-gray-300 mb-4">
                  Schedule a free 30-minute consultation to discuss your project goals and how we can help you reach them.
                </p>
                <a 
                  href="#" 
                  className="inline-block px-6 py-2 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
