import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotFoundScreen from "./+not-found";
import Camera from "./camera";
import HomeScreen from "./home";
import NewProdudct from "./newProduct";
import ProductComparison from "./productComparison";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="/Home" component={HomeScreen} />
      <Stack.Screen name="/Camera" component={Camera} />
      <Stack.Screen name="/NewProduct/[code]" component={NewProdudct}/>
      <Stack.Screen name="/ProductComparison/[code]" component={ProductComparison}/>
      <Stack.Screen name="/+NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}
