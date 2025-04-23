import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Testimonial {
  text: string;
  author: string;
}

interface CaseStudyData {
  id: string;
  title: string;
  categories: string;
  imageUrl: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial: Testimonial;
  technologies: string[];
}

export default function CaseStudy() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('');
  
  // Fetch case study data
  const { data: caseStudy, isLoading, error } = useQuery<CaseStudyData>({
    queryKey: ['/api/portfolio', id],
    enabled: !!id,
  });
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-purple-800/30 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-purple-800/20 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Case Study Not Found</h1>
          <p className="mb-6">The case study you're looking for doesn't exist or has been moved.</p>
          <Link href="/#portfolio">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Only try to split categories if they exist
  const categoriesArray = caseStudy.categories ? 
    caseStudy.categories.split(',').map(cat => cat.trim()) : 
    [];
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="dark-overlay"></div>
      
      <div className="container max-w-screen-lg mx-auto px-4 relative z-10">
        {/* Back button */}
        <Link href="/#portfolio">
          <Button variant="ghost" className="mb-6 -ml-2 hover:bg-purple-800/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
            {caseStudy.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {categoriesArray.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-medium">
                {category}
              </Badge>
            ))}
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {caseStudy.description}
          </p>
        </header>
        
        {/* Hero image */}
        <div className="w-full rounded-lg overflow-hidden mb-12 shadow-2xl border border-purple-500/30 aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <img 
            src={caseStudy.imageUrl} 
            alt={caseStudy.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">The Challenge</h2>
              <p className="text-gray-300">{caseStudy.challenge}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Solution</h2>
              <p className="text-gray-300">{caseStudy.solution}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Results</h2>
              <p className="text-gray-300">{caseStudy.results}</p>
            </section>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies && caseStudy.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-900/50 border-purple-500/30">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-3">Testimonial</h3>
              {caseStudy.testimonial && (
                <>
                  <blockquote className="text-gray-300 italic mb-4">
                    "{caseStudy.testimonial.text}"
                  </blockquote>
                  <p className="text-sm text-purple-300 font-medium">— {caseStudy.testimonial.author}</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg border border-purple-500/20 mb-8">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Web3 Growth Strategy?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can apply similar strategies to help your project achieve exceptional results and stand out in the Web3 landscape.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              Get in Touch
            </Button>
          </Link>
        </div>
        
        {/* More case studies */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Explore More Case Studies</h3>
          <Link href="/#portfolio">
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}