import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Success(props) {
  setTimeout(() => props.navigation.popToTop(), 5000);
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Thank you for your input!</Text>
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
});
