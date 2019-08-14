import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding-left: 15%;
  padding-right: 15%;
`

const ThankYouText = styled.Text`
  font-size: 48;
  text-align: center;
  margin-bottom: 30;
  color: #5C5C5C;
`

export default function SuccessScreen(props) {
  setTimeout(() => props.navigation.popToTop(), 5000)
  return (
    <Container>
      <ThankYouText>Thank you for your input!</ThankYouText>
    </Container>
  )
}
