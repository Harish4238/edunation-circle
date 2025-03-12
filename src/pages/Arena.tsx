
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, Plus } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  creator: string;
  tags: string[];
}

interface User {
  username: string;
  coins: number;
  rank: string;
  streak: number;
  enrolledCourses: Course[];
  completedCourses: Course[];
}

const Arena = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample courses data
  const sampleCourses = [
    {
      id: 'course1',
      title: 'Introduction to React',
      description: 'Learn the basics of React and build your first application',
      progress: 0,
      modules: 5,
      creator: 'ReactMaster',
      tags: ['Web Development', 'Frontend', 'JavaScript']
    },
    {
      id: 'course2',
      title: 'Python Data Science',
      description: 'Master data analysis and visualization with Python',
      progress: 0,
      modules: 8,
      creator: 'DataExplorer',
      tags: ['Data Science', 'Python', 'Analytics']
    },
    {
      id: 'course3',
      title: 'Machine Learning Fundamentals',
      description: 'Understand the core concepts of machine learning algorithms',
      progress: 0,
      modules: 6,
      creator: 'AIEnthusiast',
      tags: ['AI', 'Data Science', 'Python']
    },
    {
      id: 'course4',
      title: 'Full Stack Development',
      description: 'Build complete web applications with frontend and backend technologies',
      progress: 0,
      modules: 10,
      creator: 'WebDevPro',
      tags: ['Web Development', 'Full Stack', 'JavaScript', 'Node.js']
    },
    {
      id: 'course5',
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of creating user-friendly interfaces',
      progress: 0,
      modules: 7,
      creator: 'DesignCraft',
      tags: ['Design', 'UI/UX', 'Figma']
    }
  ];

  const [availableCourses, setAvailableCourses] = useState<Course[]>(sampleCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sampleCourses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Web Development', 'Data Science', 'AI', 'Design', 'Mobile'];

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Get user data if logged in
    if (loggedIn) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  useEffect(() => {
    // Filter courses based on search query and category
    let filtered = availableCourses;
    
    if (searchQuery) {
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        course => course.tags.some(tag => tag === selectedCategory)
      );
    }
    
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, availableCourses]);

  const handleEnrollCourse = (course: Course) => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in courses",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!user) return;
    
    if (user.coins < 20) {
      toast({
        title: "Not enough coins",
        description: "You need 20 coins to enroll in this course",
        variant: "destructive",
      });
      return;
    }
    
    // Update user data with enrolled course and deduct coins
    const updatedUser = {
      ...user,
      coins: user.coins - 20,
      enrolledCourses: [...(user.enrolledCourses || []), {...course, progress: 0}]
    };
    
    // Update local storage and state
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast({
      title: "Enrolled successfully!",
      description: `You've enrolled in ${course.title}`,
    });
  };

  const handleCreateCourse = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to create courses",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!user) return;
    
    if (user.coins < 50) {
      toast({
        title: "Not enough coins",
        description: "You need 50 coins to create a course",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would navigate to a course creation page
    // For now, just show a toast
    toast({
      title: "Course creation",
      description: "Course creation feature coming soon!",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Arena</h1>
      
      <Tabs defaultValue="explore" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="explore">Explore Courses</TabsTrigger>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="create">Create Course</TabsTrigger>
        </TabsList>
        
        {/* Explore Courses Tab */}
        <TabsContent value="explore" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover-scale">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>By {course.creator}</span>
                      <span>{course.modules} modules</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleEnrollCourse(course)}
                    >
                      Enroll for 20 coins
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* My Courses Tab */}
        <TabsContent value="my-courses">
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">You need to log in to view your courses</h2>
              <p className="text-muted-foreground mb-4">Log in to track your progress and continue learning</p>
              <Button onClick={() => navigate('/login')}>Log in</Button>
            </div>
          ) : user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      Progress: {Math.round(course.progress)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue Learning</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">You haven't enrolled in any courses yet</h2>
              <p className="text-muted-foreground mb-4">Explore courses and start your learning journey</p>
              <Button onClick={() => setActiveTab('explore')}>Explore Courses</Button>
            </div>
          )}
        </TabsContent>
        
        {/* Create Course Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Course</CardTitle>
              <CardDescription>Share your knowledge with the VSkill Arena community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI-Generated Course</CardTitle>
                    <CardDescription>Let AI help you build a structured course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="topic">Course Topic</Label>
                        <Input id="topic" placeholder="e.g., Machine Learning Basics" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="audience">Target Audience</Label>
                        <Input id="audience" placeholder="e.g., Beginners, Data Scientists" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="modules">Number of Modules</Label>
                        <Input id="modules" type="number" min="1" max="10" placeholder="5" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleCreateCourse}>
                      Generate Course (50 coins)
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Manual Course Creation</CardTitle>
                    <CardDescription>Build your course from scratch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input id="title" placeholder="e.g., Web Development Masterclass" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Course Description</Label>
                        <Input id="description" placeholder="Describe your course..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input id="tags" placeholder="e.g., Web, JavaScript, CSS" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleCreateCourse}>
                      Start Building (50 coins)
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Why Create a Course?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Share your expertise with the community</li>
                  <li>• Earn coins when users enroll in your course</li>
                  <li>• Build your reputation as an educator</li>
                  <li>• Help others learn valuable skills</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Arena;
