import { AppRoutes, IProduct } from "@/@types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function Product({ title, code, price, shop }: IProduct) {
  const navigation = useNavigation<NavigationProp<AppRoutes>>();
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(`/ProductComparison/[code]`, { code })}
      style={styles.container}
    >
      <View>
        <Text style={styles.productCode}>#{code}</Text>
        <Text style={styles.productName}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "47%",
    minHeight: 80,
    padding: 16,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },

  productCode: {
    width: 90,
    fontSize: 12,
    backgroundColor: "#6365f1dc",
    color: "#ffffff",
    borderRadius: 8,
    padding: 4,
  },
});
