import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { verifyInstallation } from "nativewind";
import { useEffect, useState } from "react";
import { getPosts } from "./features/post/getPost";

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
export default function App() {
	verifyInstallation();
	const [posts, setPosts] = useState<Post[]>([]);
	useEffect(() => {
		const getPosts = async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/posts");
			if (!res.ok) {
				return { data: null, error: "some error" };
			}
			const data = await res.json();
			setPosts(data);
		};
		getPosts();
	}, []);
	return (
		<View className="bg-gray-200 mt-20 flex-1">
			{posts.map((post) => (
				<Text key={post.id} className="text-[15px] mt-2">
					{post.title}
				</Text>
			))}
			<Text className="text-xs text-white w-fit">hello world</Text>
			<Text className="text-[25px] w-fit">helloo world</Text>
			<StatusBar style="auto" />
		</View>
	);
}
