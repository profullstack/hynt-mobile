import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    if (password1 !== password2) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Other validations can be added here...

    try {
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName, lastName, username, email, password: password1, phonePrefix, phone
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'User registered successfully!');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register user.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password1}
        onChangeText={setPassword1}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.phoneContainer}>
        <TextInput
          style={styles.phonePrefix}
          placeholder="Prefix"
          value={phonePrefix}
          onChangeText={setPhonePrefix}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.phone}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <Button title="Sign Up" onPress={handleSignUp} />
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
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phonePrefix: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  phone: {
    flex: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default Register;
