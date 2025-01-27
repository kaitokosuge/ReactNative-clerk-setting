import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import "./global.css";
import { useEffect, useState } from "react";
import { verifyInstallation } from "nativewind";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
			console.log("記事データです", data);
			setPosts(data);
		};
		getPosts();

		const getQuizzes = async () => {
			const res = await fetch("https://www.fruitsbase.com/api/quiz/", {
				method: "GET",
				headers: {
					token: "fruitsbase",
				},
			});
			if (!res.ok) {
				return { data: null, error: "some error" };
			}
			const data = await res.json();
			console.log("クイズデータです", data);
		};
		getQuizzes();
	}, []);
	return (
		<ScrollView className="bg-gray-200 mt-20 flex-1">
			{posts.map((post) => (
				<Text key={post.id} className="text-[15px] mt-2">
					{post.title}
				</Text>
			))}
			<CodeHighlighter hljsStyle={atomOneDark} language="typescript">
				{`const hello = "world"`}
			</CodeHighlighter>
			<Text className="text-xs text-white w-fit">hello world</Text>
			<Text className="text-[25px] w-fit">helloo world</Text>
			<StatusBar style="auto" />
		</ScrollView>
	);
}
