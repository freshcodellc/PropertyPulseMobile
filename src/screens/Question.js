import React, { useEffect, useState } from 'react';
import { AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

export default function Question(props) {
  const [kiosk, setKiosk] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      const result = await axios.get(
        'https://6gg2aphawd.execute-api.us-east-1.amazonaws.com/prod/kiosk',
        { headers: { Authorization: token } }
      );

      setKiosk(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (response, navigation) => {
    const payload = {
      kiosk: kiosk._id,
      question: kiosk.question._id,
      response: response._id,
      comments: '',
    };
    if (!response.askForComments) {
      try {
        const token = await AsyncStorage.getItem('TOKEN');
        const result = await axios.post(
          'https://6gg2aphawd.execute-api.us-east-1.amazonaws.com/prod/response',
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        props.navigation.navigate('Success');
      } catch (e) {
        console.log('Error storing token', e);
      }
    } else {
      props.navigation.navigate('Comments', { response: payload });
    }
  };

  return (
    <View style={styles.container}>
      {!isEmpty(kiosk) && (
        <View style={styles.inner}>
          <Text style={styles.instructions}>{kiosk.question.text}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit(kiosk.question.responses[0])}
            >
              <Image source={require('../images/happy-face.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit(kiosk.question.responses[1])}
            >
              <Image source={require('../images/sad-face.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    paddingHorizontal: '5%',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 50,
    color: '#5C5C5C',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  icon: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
