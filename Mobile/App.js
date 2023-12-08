import MainScreen from "./src/screens/main";
import LoginScreen from "./src/screens/login";
import AddComodoScreen from "./src/screens/comodo";
import RegisterScreen from "./src/screens/register";
import LogoutScreen from "./src/screens/logout";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ControlScreen from "./src/screens/ControlScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainScreen} />
        <Drawer.Screen name="Adicionar cômodos" component={AddComodoScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Main" component={DrawerRoutes} options={{ headerShown: false}}></Stack.Screen>
      <Stack.Screen name="AddComodo" component={AddComodoScreen}></Stack.Screen>
      <Stack.Screen name="ControlScreen" component={ControlScreen} options={{ headerTitle: 'Controle de Cômodo'}}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;