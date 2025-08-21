import { AppRoutes, IProduct } from "@/@types";
import { Header } from "@/components/header";
import { globalStyles } from "@/globalStyles";
import { productRepository } from "@/mock/productsRepository";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ProductComparisonRouteProp = RouteProp<AppRoutes, '/ProductComparison/[code]'>;

function ProductComparison() {
  const [mainProduct, setMainProduct] = useState<IProduct | null>(null);
  const [comparisonList, setComparisonList] = useState<IProduct[]>([]);

  const {params} = useRoute<ProductComparisonRouteProp>()
  const { code } = params;

  useEffect(() => {
    if (code) {
      const allProducts = productRepository.get();

      const foundMainProduct = allProducts.find((p) => p.code === code);
      setMainProduct(foundMainProduct || null);

      const foundComparisonList = allProducts.filter(
        (p) => p.code === code
      );
      foundComparisonList.sort((a, b) => a.price - b.price);
      setComparisonList(foundComparisonList);
    }
  }, [code]);

  if (!mainProduct) {
    return (
      <>
        <Header />
        <View style={styles.screenComparison}>
          <Text>Produto não encontrado ou código não fornecido</Text>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.screenComparison}>
      <ScrollView>
        <View style={styles.screenComparison}>
          <View style={styles.productContainer}>
            <View style={styles.productImageContainer}>
              <Image
                source={require("@/assets/images/produtos.png")}
                style={styles.productImage}
              />
            </View>

            <View style={styles.productInfo}>
              <Text style={styles.code}>#{mainProduct.code}</Text>
              <Text
                style={[
                  globalStyles.text,
                  {
                    fontWeight: "bold",
                    fontSize: 18,
                    marginVertical: 6,
                    borderBottomWidth: 2,
                    borderColor: "#f3f3f3",
                    paddingBottom: 8,
                  },
                ]}
              >
                {mainProduct.title}
              </Text>

              <Text style={[globalStyles.text, styles.productDesc]}>
                Este é um produto importante que serve para alimentar o povo
                angolano.
              </Text>
            </View>

            <View style={styles.comparisonContainer}>
              <Text style={[globalStyles.text, {marginBottom: 8}]}>Comparação de Produto</Text>
              <View style={styles.comparisonByShop}>
                {comparisonList.length > 0 ? (
                  comparisonList.map((product, index) => (
                    <View key={index} style={styles.shop}>
                      <Text style={globalStyles.text}>{product.shop}</Text>
                      <Text style={globalStyles.text}>
                        {product.price.toLocaleString("pt-AO", {
                          style: "currency",
                          currency: "AOA",
                        })}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text>Não há Comparação disponivel</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductComparison;

const styles = StyleSheet.create({
  screenComparison: {
    paddingHorizontal: 8,
  },

  productContainer: {
    backgroundColor: "transparent",
  },

  code: {
    width: 90,
    fontSize: 12,
    color: "#ffffff",
    backgroundColor: "#6365f1dc",
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 8,
  },

  productImageContainer: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    backgroundColor: "#ffffff96",
    marginHorizontal: "auto",
    marginVertical: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  productImage: {
    width: 120,
    height: 120,
    padding: 16,
  },

  productInfo: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  productDesc: {
    color: "#cfcfcf",
  },

  comparisonContainer: {
    marginTop: 8,
  },
  comparisonByShop: {
  },
  shop: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    gap: 4,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 4,
    padding: 8,

  },
});
