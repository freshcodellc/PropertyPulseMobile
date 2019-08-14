import React, { useState } from 'react'
import styled from 'styled-components/native'
import axios from 'axios'
import {
  Alert,
  AsyncStorage
} from 'react-native'

import { apiGateway, apiTimeout } from '../config'

const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true
})`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding-left: 15%;
  padding-right: 15%;
`

const ButtonText = styled.Text`
  color: #FFFFFF;
`

const GreenButton = styled.TouchableOpacity`
  align-self: center;
  background-color: #14BF6F;
  border-radius: 4;
  padding: 10px;
`

const InstructionText = styled.Text`
  font-size: 48;
  text-align: center;
  margin-bottom: 30;
  color: #5C5C5C;
`

const ProvisionForm = styled.View`
  margin-bottom: 30;
  align-items: center;
  justify-content: center;
`

const ProvisionFormInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  editable: true,
  keyboardType: 'default',
  placeholder: 'Provision Code',
  placeholderTextColor: '#9C9C9C',
  returnKeyType: 'done',
  underlineColorAndroid: 'transparent'
})`
  background-color: #FFFFFF;
  border-color: #979797;
  border-radius: 4;
  border-width: 2px;
  padding: 15px;
  width: 300;
`

const SubmitButton = ({ onPress, children }) => (
  <GreenButton onPress={onPress}>
    <ButtonText>
      {children}
    </ButtonText>
  </GreenButton>
)

export default function ProvisionScreen({ navigation }) {
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
    <Container>
      <InstructionText>
        Please enter your provision code below to get started.
      </InstructionText>

      <ProvisionForm>
        <ProvisionFormInput
          value={provisionCode}
          onChangeText={value => setProvisionCode(value)} />
      </ProvisionForm>

      <SubmitButton onPress={() => handleSubmit(provisionCode)}>
        Submit
      </SubmitButton>
    </Container>
  )
}
