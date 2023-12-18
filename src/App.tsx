import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainDashboard from './screens/MainDashboard';
import {RootStackParamList} from './types/Navigation';
import ItemDetail from './screens/ItemDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  /** HOOKS ************************************************** */
  /** STATE && USECALLBACK *********************************** */
  /** HANDLERS & FUNCTIONS *********************************** */
  /** EFFECTS ************************************************ */
  /** TEMPLATE(RENDER) *************************************** */
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainDashboard"
          component={MainDashboard}
          options={{title: 'Users'}}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={{title: 'Photos', headerBackTitle: 'Back'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
