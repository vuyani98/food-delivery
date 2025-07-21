import { createUser } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({

    email: '',
    password: '',
    name: ''
  });
  const submit  = async () => {

    const { name, email, password } = form;

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email address');

    setIsSubmitting(true);

    try {
      // call the Appwrite sign-up function here
      console.log(email)
      await createUser({email: email, password: password, name: name});
      router.replace('/');
    }

    catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.'); 
    }

    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput 
          placeholder='Enter your name'
          value={form.name}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))} 
          label='Full Name'
      />
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
        title='Sign Up'
        onPress={submit}
        isLoading={isSubmitting}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>Already have an account</Text>
        <Link href="/sign-in" className='base-bold text-primary'>Sign In</Link>
      </View>
    </View>
  )
}

export default SignUp