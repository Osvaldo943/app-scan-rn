import { AppRoutes } from "@/@types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarcodeScannerScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation<NavigationProp<AppRoutes>>();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da permissão da tua câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (!scanned) {
      setScanned(true);
      navigation.navigate("/NewProduct/[code]", { code: data });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"],
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          >
            <Text style={styles.text}>Mudar câmera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <TouchableOpacity
        style={styles.btnScan}
        onPress={() => setScanned(false)}
      >
        <Text style={styles.text}>Escanear novamente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnAddMannually}
        onPress={() => navigation.navigate("/NewProduct/[code]", { code: "" })}
      >
        <Text style={styles.btnAddMannuallyText}>Adicionar manualmente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { width: "90%", height: 300, borderRadius: 8, marginBottom: 8 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: { flex: 1, alignSelf: "flex-end", alignItems: "center" },
  text: { fontSize: 16, fontWeight: "bold", color: "white" },
  btnScan: {
    width: "90%",
    backgroundColor: "#6366F1",
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnAddMannually: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  btnAddMannuallyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6366F1",
  },
});
