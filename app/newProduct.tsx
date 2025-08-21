import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import type { AppRoutes, IProduct } from "@/@types";
import { productRepository } from "@/mock/productsRepository";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ScrollView } from "react-native";

const productRepo = productRepository;

type NewProductRouteProp = RouteProp<AppRoutes, "/NewProduct/[code]">;

export default function NewProdudct() {
  const { params } = useRoute<NewProductRouteProp>();
  const { code } = params;

  const navigation = useNavigation<NavigationProp<AppRoutes>>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCode, setProductCode] = useState<string | null>(null);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productShop, setProductShop] = useState("");

  const [productExist, setProductExist] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [barcodeExist, setBarcodeExist] = useState(false);

  const handleAddProduct = () => {
    const newProduct: IProduct = {
      code: productCode || "",
      title: productTitle || "",
      price: productPrice || 0,
      shop: productShop,
    };

    const product = products.find(
      (product) =>
        product.code === newProduct.code && product.shop === newProduct.shop
    );

    if (product) {
      setProductExist(true);
      setTimeout(() => setProductExist(false), 3000);
    } else {
      productRepo.add(newProduct);
      navigation.navigate("/Home");

      setProductExist(false);
      setProductAdded(true);
      setTimeout(() => setProductAdded(false), 3000);
    }
  };

  useEffect(() => {
    const products = productRepo.get();
    setProducts(products);
    setProductCode(code);

    const product = products.find((product) => product.code === code);
    if (product) {
      setProductTitle(product.title);
    }
  }, []);

  return (
    <>
      <ScrollView style={styles.screen}>
        <View style={styles.productImageContainer}>
          <Image
            source={require("@/assets/images/produtos.png")}
            style={styles.productImage}
          />
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { borderColor: productCode !== "" ? "#6366F1" : "b3b3b3" },
              ]}
              placeholder="Código"
              value={productCode || ""}
              onChangeText={setProductCode}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { borderColor: productTitle !== "" ? "#6366F1" : "b3b3b3" },
              ]}
              placeholder="Nome"
              value={productTitle}
              onChangeText={setProductTitle}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { borderColor: productShop !== "" ? "#6366F1" : "b3b3b3" },
              ]}
              placeholder="Loja"
              value={productShop}
              onChangeText={setProductShop}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: productPrice !== 0 ? "#6366F1" : "b3b3b3" },
              ]}
              placeholder="Preço"
              value={String(productPrice)}
              onChangeText={(value) => setProductPrice(Number(value))}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddProduct()}
          >
            <Text style={styles.buttonText}>Adicionar produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
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

  form: {},
  label: {
    color: "#c4c4c4",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 8,
  },

  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 8,
    padding: 8,
  },

  buttonText: {
    color: "#fff",
  },
  isChecked: {
    borderColor: "#6366F1",
  },
});
