// src/components/ErrorComponent.js

import React from 'react';
import { View, Text } from 'react-native';

const ErrorComponent = ({ error }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{error}</Text>
    </View>
  );
};

export default ErrorComponent;
