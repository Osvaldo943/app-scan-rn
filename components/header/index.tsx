import { AppRoutes } from "@/@types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Logo } from "../logo";

export function Header(){

    const navigation = useNavigation<NavigationProp<AppRoutes>>()

    return(
        <View style={styles.headerContainer}>
            <Logo/>
            <TouchableOpacity onPress={()=> navigation.navigate('/Camera')} style={styles.btnScan}>
                <Text style={styles.scanText}>Scan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        padding: 8,
        backgroundColor: "#6366F1",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    scanText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#6366F1"
    },
    btnScan: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4
    }

})