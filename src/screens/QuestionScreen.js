import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'

import { apiGateway, apiTimeout } from '../config'

const IMAGE_HAPPY_FACE = require('../images/happy-face.png')
const IMAGE_SAD_FACE = require('../images/sad-face.png')

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30%;
`

const ButtonImage = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 100%;
  width: 100%;
`

const QuestionText = styled.Text`
  padding-left: 5%;
  padding-right: 5%;
  font-size: 48;
  text-align: center;
  margin-bottom: 50;
  color: #5C5C5C;
`

const ResponseGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`

const FeedbackButton = ({ onPress, source }) => (
  <Button onPress={onPress}>
    <ButtonImage source={source} />
  </Button>
)

export default function QuestionScreen (props) {
  const [kiosk, setKiosk] = useState({})

  useEffect(() => {
    const fetchData = () => {
      AsyncStorage.getItem('TOKEN')
        .then((token) => {
          const reqConfig = {
            url: `${apiGateway}/v1/kiosk`,
            headers: { Authorization: token },
            timeout: apiTimeout,
            method: 'get'
          }

          console.log('TOKEN RETRIEVE RESULT', { token })
          console.log('KIOSK STATE REQUEST', { request: reqConfig })
          return axios(reqConfig)
        })
        .then((response) => {
          console.log('KIOSK STATE RESPONSE', { response })
          setKiosk(response.data)
        })
        .catch((error) => console.log('KIOSK STATE ERROR', { error }))
    }

    fetchData()
  }, [])

  const handleSubmit = (response, navigation) => {
    const payload = {
      kiosk: kiosk._id,
      question: kiosk.question._id,
      response: response._id,
      comments: ''
    }

    if (response.askForComments) {
      props.navigation.navigate('Comments', { response: payload })
      return
    }

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
        console.log('QUESTION REQUEST', { request: reqConfig })
        return axios(reqConfig)
      })
      .then((response) => console.log('QUESTION REQUEST RESPONSE', { response }))
      .catch((error) => console.log('QUESTION REQUEST ERROR', { error }))

    // Navigate to 'Success' regardless of the server response.
    // The user will not be able to do anything further regardless
    // of the server response. Log any errors to console and resume.
    props.navigation.navigate('Success')
  }

  return (
    <Container>
      {!isEmpty(kiosk) && (
        <Content>
          <QuestionText>{kiosk.question.text}</QuestionText>
          <ResponseGroup>
            <FeedbackButton
              source={IMAGE_HAPPY_FACE}
              onPress={() => handleSubmit(kiosk.question.responses[0])} />

            <FeedbackButton
              source={IMAGE_SAD_FACE}
              onPress={() => handleSubmit(kiosk.question.responses[1])} />
          </ResponseGroup>
        </Content>
      )}
    </Container>
  )
}
