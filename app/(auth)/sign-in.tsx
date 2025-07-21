import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';


const Signin = () => {
  return (
    <View>
      <Text>Signin</Text>
      <Button title="Sign In"  onPress={() => router.push("/sign-up") } />
    </View>
  )
}

export default Signin