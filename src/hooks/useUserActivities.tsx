
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ActivityType = 'login' | 'course_progress' | 'achievement' | 'page_visit';

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: ActivityType;
  activity_data: any;
  created_at: string;
}

export const useUserActivities = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities from Supabase
  const fetchActivities = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setActivities(data || []);
    } catch (err: any) {
      console.error('Error fetching activities:', err);
      setError(err.message || 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  // Record a new activity
  const recordActivity = async (activityType: ActivityType, activityData: any) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        console.error('User not authenticated');
        return null;
      }

      const { data, error } = await supabase
        .from('user_activities')
        .insert([
          {
            user_id: userData.user.id,
            activity_type: activityType,
            activity_data: activityData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      // Update the local state with the new activity
      setActivities(prev => [data, ...prev]);
      
      return data;
    } catch (err: any) {
      console.error('Error recording activity:', err);
      return null;
    }
  };

  // Refresh activities (useful after operations)
  const refreshActivities = () => {
    fetchActivities();
  };

  // Load activities when the hook is initialized
  useEffect(() => {
    fetchActivities();
    
    // Set up a subscription to auth state changes to reload activities when user logs in/out
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchActivities();
      } else if (event === 'SIGNED_OUT') {
        setActivities([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    activities,
    loading,
    error,
    recordActivity,
    refreshActivities,
  };
};
