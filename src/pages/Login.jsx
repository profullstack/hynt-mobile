import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // This can be username, or email
  const [phone, setPhone] = useState(''); // This can be phone
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier, password
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'User logged in successfully!');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log in.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username or email"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <Text style={styles.h4Style}>-- or --</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={identifier}
        onChangeText={setPhone}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  h4Style: {
    fontSize: 18,  // Set the font size or any other style attributes you need
    fontWeight: 'bold',
    marginVertical: 10,
  },
});


export default Login;
