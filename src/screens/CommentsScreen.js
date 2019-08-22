import React, { useState } from 'react'
import styled from 'styled-components/native'
import { AsyncStorage, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'

import { apiGateway, apiTimeout } from '../config'

const Button = styled.TouchableOpacity`
  align-self: center;
  border-radius: 4;
  padding-top: 10;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  background-color: #14BF6F;
`

const ButtonLabel = styled.Text`
  color: #FFFFFF;
`

const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-right: 15%;
  padding-left: 15%;
`

const FormGroup = styled.View`
  margin-bottom: 30;
  align-items: center;
  justify-content: center;
`

const FormInput = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  placeholder: 'Share feedback here',
  placeholderTextColor: '#9C9C9C',
  keyboardType: 'default',
  autoCapitalize: 'none',
  returnKeyType: 'done',
  numberOfLines: 4,
  blurOnSubmit: true,
  multiline: true,
  editable: true
})`
  border-width: 2;
  border-radius: 4;
  border-color: #979797;
  background-color: #FFFFFF;
  padding-bottom: 10;
  padding-right: 10;
  padding-left: 10;
  padding-top: 10;
  width: 100%;
`

const Instructions = styled.Text`
  margin-bottom: 30;
  text-align: center;
  font-size: 48;
  color: #5C5C5C;
`

export default function CommentsScreen (props) {
  const [comments, setComments] = useState()

  const handleSubmit = userComments => {
    const payload = props.navigation.getParam('response', {})
    if (isEmpty(payload)) {
      return
    }

    payload.comments = userComments
    AsyncStorage.getItem('TOKEN')
      .then((token) => {
        const reqConfig = {
          url: `${apiGateway}/v1/response`,
          headers: { Authorization: token },
          timeout: apiTimeout,
          method: 'post',
          data: payload
        }

        console.log('TOKEN RETRIEVE RESULT', { token })
        console.log('RESPONSE REQUEST', { request: reqConfig })
        return axios(reqConfig)
      })
      .then((response) => console.log('RESPONSE REQUEST RESPONSE', { response }))
      .catch((error) => console.log('RESPONSE REQUEST ERROR', { error }))

    // Navigate to 'Success' regardless of the server response.
    // The user will not be able to do anything further regardless
    // of the server response. Log any errors to console and resume.
    props.navigation.navigate('Success')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <View>
          <Instructions>Care to share how we can improve?</Instructions>
          <FormGroup>
            <FormInput
              value={comments}
              onChangeText={value => setComments(value)} />
          </FormGroup>
          <Button onPress={() => handleSubmit(comments)}>
            <ButtonLabel>Submit</ButtonLabel>
          </Button>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}
