import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './app/MainPage';
import InstrumentSeeMore from './app/InstrumentSeeMore';
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainPage} options={{ title: 'Medical Instruments' }} />
                <Stack.Screen name="InstrumentSeeMore" component={InstrumentSeeMore} options={{ title: 'Instrument Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
