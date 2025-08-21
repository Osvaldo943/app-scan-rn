import { Link, useNavigation } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export function Logo() {
  const nav = useNavigation();

  return (
    <Link href={"/home"} asChild>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo.png")}
        />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
});
