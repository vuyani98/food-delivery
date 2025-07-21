import { signIn } from '@/lib/appwrite';
import * as Sentry from '@sentry/react-native';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const Signin = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const submit = async () => {

    const { email, password } = form;

    if (!email || !password) return Alert.alert('Error', 'Please enter valid email address');

    setIsSubmitting(true);

    try {
      // call the Appwrite sign-in function here
      await signIn({email: email, password: password});

      router.replace('/');
    }

    catch (error: any) {
      console.error('Sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in. Please try again.'); 
      Sentry.captureEvent(error)

    }

    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

      <CustomInput 
          placeholder='Email'
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))} 
          label='Email'
          keyboardType='email-address'
      />
      <CustomInput 
          placeholder='Enter your password'
          value={form.password}
          onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))} 
          label="Password"
          secureTextEntry={true}
      />
      <CustomButton
        title='Sign In'
        onPress={submit}
        isLoading={isSubmitting}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>Don&apos;t have an account</Text>
        <Link href="/sign-up" className='base-bold text-primary'>Sign Up</Link>
      </View>
    </View>
  )
}

export default Signin