
import React, { createContext, useContext, ReactNode } from 'react';
import { useUserActivities, UserActivity, ActivityType } from '@/hooks/useUserActivities';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ActivityContextType {
  activities: UserActivity[];
  loading: boolean;
  error: string | null;
  recordActivity: (type: ActivityType, data: any) => Promise<UserActivity | null>;
  refreshActivities: () => void;
  trackPageVisit: (pageName: string) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const { activities, loading, error, recordActivity, refreshActivities } = useUserActivities();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Helper function to track page visits
  const trackPageVisit = (pageName: string) => {
    recordActivity('page_visit', { page: pageName, timestamp: new Date().toISOString() })
      .catch(err => {
        console.error('Failed to track page visit:', err);
      });
  };

  const value = {
    activities,
    loading,
    error,
    recordActivity,
    refreshActivities,
    trackPageVisit,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
