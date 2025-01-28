// import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import './../../global.css';
import { useEffect, useState } from 'react';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { PublicQuiz } from '../../models/PublicQuiz';
import React from 'react';

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
export default function Page() {
    const [quizzes, setQuizzes] = useState<PublicQuiz[]>([]);
    useEffect(() => {
        const getQuizzes = async () => {
            const res = await fetch('https://www.fruitsbase.com/api/quiz/', {
                method: 'GET',
                headers: {
                    token: 'fruitsbase',
                },
            });
            if (!res.ok) {
                return { data: null, error: 'some error' };
            }
            const data: { quizzes: PublicQuiz[] } = await res.json();
            setQuizzes(data.quizzes);
            console.log('クイズデータです', data.quizzes);
        };
        getQuizzes();
    }, []);
    return (
        <>
            <View
                style={{
                    borderColor: '#2c2c2c',
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                }}
                className="relative z-20 flex-row items-center justify-between border-b border-l border-r border-[#2c2c2c] bg-[#171717] pt-[45px] px-5 w-[102%] ml-[-1%]"
            >
                <View className="flex-row">
                    <Image
                        source={require('./../../assets/fruitsbase-logo.png')}
                        style={{
                            width: 100,
                            height: 60,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View>
                    <Image
                        source={{
                            uri: `https://avatars.githubusercontent.com/u/134667077?v=4&size=64`,
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain',
                            borderRadius: 100,
                        }}
                    />
                </View>
            </View>
            <ScrollView
                className="mt-0 flex-1 bg-[#171717] relative top-[-10px] pt-[10px]"
                style={{ backgroundColor: '#171717' }}
            >
                <View className="px-5">
                    <Text
                        className="text-xs text-white mt-3"
                        style={{ fontWeight: '900' }}
                    >
                        タイムライン
                    </Text>
                    <View>
                        {quizzes.map((quiz) => (
                            <View key={quiz.id} className="mt-3">
                                <View className="bg-[#292929] w-full text-left px-5 rounded-md flex-row justify-between items-center">
                                    <View className="flex-row items-center w-[100%] py-5 pb-10 overflow-hidden">
                                        <View className="w-full">
                                            <View className="w-full overflow-hidden flex-row items-center justify-between hidden-scrollbar">
                                                <View className="flex-row items-start justify-between w-full">
                                                    <View className="flex-row items-start duration-300 hover:opacity-50">
                                                        {quiz.author.image && (
                                                            <Image
                                                                source={{
                                                                    uri: `${quiz.author.image}`,
                                                                }}
                                                                style={{
                                                                    width: 26,
                                                                    height: 25,
                                                                    resizeMode:
                                                                        'contain',
                                                                    borderRadius: 100,
                                                                }}
                                                            />
                                                        )}
                                                        <View className="ml-2">
                                                            <Text className="text-gray-400 text-[13px]">
                                                                {
                                                                    quiz.author
                                                                        .username
                                                                }
                                                            </Text>
                                                            <Text className="text-[10px] text-gray-500">
                                                                2024/01/20
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className="hover:opacity-50 duration-200">
                                                        <Text className="text-gray-400">
                                                            →
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="text-[20px] w-full pt-8">
                                                {JSON.parse(quiz.question)[0]
                                                    .data.text ? (
                                                    <Text
                                                        className="w-fit text-gray-200 text-[17px]"
                                                        numberOfLines={1}
                                                        style={{
                                                            fontWeight: '800',
                                                        }}
                                                    >
                                                        {
                                                            JSON.parse(
                                                                quiz.question,
                                                            )[0].data.text
                                                        }
                                                    </Text>
                                                ) : (
                                                    <View className="w-full">
                                                        <CodeHighlighter
                                                            hljsStyle={
                                                                atomOneDark
                                                            }
                                                            language="typescript"
                                                        >
                                                            {
                                                                JSON.parse(
                                                                    quiz.question,
                                                                )[0].data.code
                                                            }
                                                        </CodeHighlighter>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
