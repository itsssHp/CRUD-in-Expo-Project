import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function SignUpScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const userId = data.user?.id;
      if (userId) {
        const { error: insertError } = await supabase
          .from('user_details')
          .insert([{ id: userId, first_name: firstName, last_name: lastName, email }]);

        if (insertError) {
          Alert.alert('Insert Error', insertError.message);
        } else {
          Alert.alert('Success', 'Check your email to confirm your account');
          navigation.navigate('SignIn');
        }
      }
    }
  };

  return (
    <View style={signUpStyles.container}>
      <Text style={signUpStyles.title}>Sign Up</Text>
      <TextInput
        placeholder="First Name"
        style={signUpStyles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        style={signUpStyles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        style={signUpStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={signUpStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={signUpStyles.button} onPress={handleSignUp}>
        <Text style={signUpStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
