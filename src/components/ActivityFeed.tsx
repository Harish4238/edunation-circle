
import React from 'react';
import { useActivity } from '@/contexts/ActivityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserActivity } from '@/hooks/useUserActivities';
import { Clock, Award, BookOpen, MousePointer } from 'lucide-react';

interface ActivityFeedProps {
  limit?: number;
  showTitle?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  limit,
  showTitle = true
}) => {
  const { activities, loading, error } = useActivity();
  
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'course_progress':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'page_visit':
        return <MousePointer className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatActivityType = (type: string) => {
    switch (type) {
      case 'login':
        return 'Login';
      case 'achievement':
        return 'Achievement';
      case 'course_progress':
        return 'Course Progress';
      case 'page_visit':
        return 'Page Visit';
      default:
        return type.replace('_', ' ');
    }
  };

  const renderActivityDetails = (activity: UserActivity) => {
    switch (activity.activity_type) {
      case 'login':
        return `Logged in from ${activity.activity_data.device.split(' ')[0]}`;
      case 'page_visit':
        return `Visited ${activity.activity_data.page}`;
      case 'achievement':
        return activity.activity_data.name || 'Earned an achievement';
      case 'course_progress':
        return `Made progress in ${activity.activity_data.courseName || 'a course'}`;
      default:
        return JSON.stringify(activity.activity_data);
    }
  };

  if (loading) {
    return (
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center text-red-500 py-4">
            Error loading activities: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activities.length) {
    return (
      <Card>
        {showTitle && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center text-muted-foreground py-6">
            No activities recorded yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showTitle && (
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.activity_type)}
                    <Badge variant="outline">
                      {formatActivityType(activity.activity_type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{renderActivityDetails(activity)}</TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {formatTimestamp(activity.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
