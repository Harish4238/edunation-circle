
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Generate personalized courses using advanced AI technology"
    },
    {
      title: "Interactive Community",
      description: "Learn together with a vibrant community of learners"
    },
    {
      title: "Gamified Experience",
      description: "Earn coins and ranks as you progress in your learning journey"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Developer",
      content: "VSkill Arena transformed how I learn new technologies. The AI-generated courses are incredibly helpful!"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "The community features and gamification make learning engaging and fun. Great platform!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Welcome to VSkill Arena
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Transform your learning journey with AI-powered courses and an engaging community
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-scale">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Explore Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-scale">
              <CardHeader>
                <CardTitle>Odyssey</CardTitle>
                <CardDescription>Your personalized learning dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Track your learning progress</li>
                  <li>Earn ranks and build streaks</li>
                  <li>View your enrolled courses</li>
                  <li>Receive personalized recommendations</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/odyssey')}
                >
                  Explore Odyssey
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-scale">
              <CardHeader>
                <CardTitle>Arena</CardTitle>
                <CardDescription>AI-powered course generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Create AI-generated courses</li>
                  <li>Explore courses by other users</li>
                  <li>Enroll and track your progress</li>
                  <li>Customize and share your knowledge</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/arena')}
                >
                  Visit Arena
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-scale">
              <CardHeader>
                <CardTitle>Tribe</CardTitle>
                <CardDescription>Community discussions and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Engage in learning discussions</li>
                  <li>Share and read educational blogs</li>
                  <li>Explore learning resources</li>
                  <li>Connect with fellow learners</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/tribe')}
                >
                  Join the Tribe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-scale">
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join VSkill Arena today and discover a new way to learn, with AI-powered courses and a supportive community.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
