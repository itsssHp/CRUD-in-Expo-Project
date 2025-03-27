import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

type LandingProps = {
  session: Session;
};

export default function LandingScreen({ session }: LandingProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && data) {
        setUserData(data);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={landingStyles.container}>
      {userData ? (
        <Text style={landingStyles.welcome}>Welcome, {userData.first_name} {userData.last_name}!</Text>
      ) : (
        <Text style={landingStyles.loading}>Loading user data...</Text>
      )}
      <TouchableOpacity style={landingStyles.button} onPress={handleLogout}>
        <Text style={landingStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
