
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Camera, Edit2 } from 'lucide-react';

interface User {
  username: string;
  coins: number;
  rank: string;
  streak: number;
  enrolledCourses: any[];
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setNewUsername(JSON.parse(userData).username);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      username: newUsername,
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully",
    });
  };

  if (!user) return null;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20" />
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow">
            {editing ? (
              <div className="flex gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <span>{user.coins} coins</span>
              <span>•</span>
              <span>{user.rank}</span>
              <span>•</span>
              <span>{user.streak} day streak</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {user.enrolledCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{course.title}</h3>
                      <span>{Math.round(course.progress)}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/arena?course=${course.id}`)}
                    >
                      Resume Course
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't enrolled in any courses yet.</p>
                <Button
                  variant="link"
                  onClick={() => navigate('/arena')}
                  className="mt-2"
                >
                  Explore courses
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
