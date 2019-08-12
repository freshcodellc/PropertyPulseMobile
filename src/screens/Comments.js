import React, { useState } from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { apiGateway, apiTimeout } from '../config'

export default function Comments(props) {
  const [comments, setComments] = useState();

  const handleSubmit = async userComments => {
    const payload = props.navigation.getParam('response', {});
    if (!isEmpty(payload)) {
      payload.comments = userComments;
      try {
        const token = await AsyncStorage.getItem('TOKEN');
        const result = await axios.post(
          `${apiGateway}/v1/response`,
          payload,
          {
            headers: {
              Authorization: token,
            },
            timeout: apiTimeout
          }
        );
        props.navigation.navigate('Success');
      } catch (e) {
        console.log('Error storing token', e);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text style={styles.instructions}>Care to share how we can improve?</Text>
          <View style={styles.inputGroup}>
            <TextInput
              editable
              blurOnSubmit
              style={styles.inputControl}
              value={comments}
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="done"
              underlineColorAndroid="transparent"
              onChangeText={value => setComments(value)}
              placeholder="Share feedback here"
              placeholderTextColor="#9C9C9C"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit(comments)}>
            <Text style={styles.lightText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
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
