import React, { useState } from 'react';
import { AsyncStorage, Alert, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

import { apiGateway, apiTimeout } from '../config'

export default function Provision({ navigation }) {
  const [provisionCode, setProvisionCode] = useState()

  const handleSubmit = provisionCode => {
    if (provisionCode && provisionCode.length) {
      const pReqConfig = {
        url: `${apiGateway}/v1/provision`,
        data: { provisionCode },
        timeout: apiTimeout,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      console.log('PROVISION REQUEST', { request: pReqConfig })

      axios(pReqConfig)
        .then((response) => {
          console.log('PROVISION RESPONSE', { response })
          return AsyncStorage.setItem('TOKEN', response.data.jwt)
        })
        .then((result) => {
          console.log('STORAGE RESULT', { result })
          navigation.navigate('App')
        })
        .catch((error) => {
          console.log('PROVISION FAILURE', { error })
          Alert.alert(
            'Error',
            `An error occurred while provisioning this device. API Error: [${error}]`,
            [{ text: 'Try Again', onPress: () => navigation.navigate('AuthLoading') }],
            { cancelable: false })
        })
    } else {
      Alert.alert(
        'Provision Code Required',
        'A provision code is required in order to activate this device.',
        [{ text: 'OK', onPress: () => console.log('DISMISSED PROVISION ALERT') }],
        { cancelable: false })
    }
  }

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
