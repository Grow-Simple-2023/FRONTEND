import React, { Component } from 'react';
import { Alert, Keyboard, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('firstName')
    .required('firstName is required'),
});

export default function Form () {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Formik
            initialValues={
                { firstName: ''}
            }
            onSubmit={values => {
              alert(JSON.stringify(values, null, 2));
              Keyboard.dismiss();
            }}
            validationSchema={validationSchema}>
            {({ handleChange, handleSubmit, values, errors }) => (
              <View>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  value={values.firstName}
                  placeholder="I am ready!"
                />
                {errors.firstName ? (
                  <Text>{errors.firstName}</Text>
                ) : (
                  <></>
                )}
                <TouchableOpacity onPress={() => handleSubmit()} >
                    <View style={styles.button}>
                        <Text>Submit</Text>
                    </View> 
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
  },
  content: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});
