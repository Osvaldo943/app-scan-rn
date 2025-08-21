import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { AppRoutes, IProduct } from "@/@types";
import { Product } from "@/components/product";
import { productRepository } from "@/mock/productsRepository";
import { NavigationProp, useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<AppRoutes>>();
  const [product, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const allProducts = productRepository.get();

    const uniqueProducts = Array.from(
      new Map(allProducts.map((p) => [p.code, p])).values()
    );
    setProducts(uniqueProducts);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View>
          <Text>Produtos ({product.length})</Text>
          <View style={styles.productsContainer}>
            {product.map((product) => (
              <Product
                key={product.code}
                title={product.title}
                code={product.code}
                shop={product.shop}
                price={product.price}
              />
            ))}
          </View>
        </View>

        <View style={styles.btnScanContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("/Camera")}
            style={styles.btnScan}
          >
            <Image
              style={styles.btnLogo}
              source={require("@/assets/images/logo2x.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 8,
  },
  productsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },

  btnScanContainer: {
    position: "fixed",
    bottom: 10,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnScan: {
    width: 70,
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: "50%",
  },

  btnLogo: {
    width: 40,
    height: 40,
  },
  
  scanText:{
    right: "auto",
    position: "relative",
    
  }
});
