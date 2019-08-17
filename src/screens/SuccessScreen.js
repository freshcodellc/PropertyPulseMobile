import React from 'react'
import styled from 'styled-components/native'

const MEME_THANK_YOU = require('../images/thank-you-meme.jpg')

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding-left: 15%;
  padding-right: 15%;
`

const MemeContainer = styled.View`
  margin-bottom: 36;
  margin-top: 24;
`

const MemeHolder = styled.Image`
  height: 270px;
  width: 480px;
`

const PrimaryText = styled.Text`
  font-size: 48;
  text-align: center;
  margin-bottom: 24;
  color: #5C5C5C;
`

const SecondaryText = styled.Text`
  font-size: 24;
  text-align: center;
  margin-bottom: 12;
  color: #6E6E6E;
`

export default function SuccessScreen (props) {
  setTimeout(() => props.navigation.popToTop(), 5000)
  return (
    <Container>
      <MemeContainer>
        <MemeHolder source={MEME_THANK_YOU } />
      </MemeContainer>
      <PrimaryText>Keep an eye out for our kiosks.</PrimaryText>
      <SecondaryText>(Most people vote weekly)</SecondaryText>
    </Container>
  )
}
