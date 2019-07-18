import React, { useState } from 'react';
import { AsyncStorage, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function Provision(props) {
  const [provisionCode, setProvisionCode] = useState();

  const handleSubmit = async provisionCode => {
    if (provisionCode && provisionCode.length) {
      const response = await axios.post(
        'https://6gg2aphawd.execute-api.us-east-1.amazonaws.com/prod/provision',
        {
          provisionCode,
        }
      );

      try {
        await AsyncStorage.setItem('TOKEN', response.data.jwt);
        props.navigation.navigate('App');
      } catch (e) {
        console.log('Error storing token');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.instructions}>
          Please enter your provision code below to get started.
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            editable
            style={styles.inputControl}
            value={provisionCode}
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="done"
            underlineColorAndroid="transparent"
            onChangeText={value => setProvisionCode(value)}
            placeholder="Provision Code"
            placeholderTextColor="#9C9C9C"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit(provisionCode)}>
          <Text style={styles.lightText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '15%',
  },
  instructions: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 30,
    color: '#5C5C5C',
  },
  inputControl: {
    borderWidth: 2,
    borderColor: '#979797',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 15,
    width: 300,
  },
  inputGroup: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#14BF6F',
    alignSelf: 'center',
  },
  lightText: {
    color: '#FFFFFF',
  },
});
