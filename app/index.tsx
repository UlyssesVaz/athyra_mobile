import { Redirect } from 'expo-router';
import React from 'react';

// This component will automatically redirect to the starting route of your app.
// Since our root layout handles whether to show (auth) or (tabs),
// this effectively kicks off the entire navigation flow.
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}