import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { verifyInstallation } from "nativewind";

export default function App() {
	verifyInstallation();
	return (
		<View className="bg-red-500 mt-20">
			<Text className="text-xs text-white">hello world</Text>
			<Text className="text-[20px]">helloo world</Text>
			<StatusBar style="auto" />
		</View>
	);
}
