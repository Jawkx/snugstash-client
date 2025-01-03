import React from "react";
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	View,
} from "react-native";
import { useStashes } from "./useStashes";
import { Stash } from "@/model";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export const StashesSelectionScreen = () => {
	const { stashes, isLoading } = useStashes();
	const router = useRouter();

	console.log({ stashes });
	const renderStashItem: ListRenderItem<Stash> = ({ item }) => {
		const { name, id } = item;

		const handlePressItem = () => {
			router.back();
			router.replace(`/stash/${id}`);
		};

		return (
			<Button
				variant="ghost"
				onPress={handlePressItem}
				className="items-start w-full"
			>
				<Text>{name}</Text>
			</Button>
		);
	};

	return (
		<View className="flex-1 items-center px-8 pt-safe">
			<View className="h-2" />

			<Text className="font-semibold text-xl">Select a stash</Text>

			<View className="h-2" />
			<View className="bg-muted h-0.5 w-full" />
			<View className="h-2" />

			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<View className="w-full">
					<FlatList<Stash>
						data={stashes}
						renderItem={renderStashItem}
						className="w-full h-5/6"
					/>
					<Button>
						<Text>Create new stash</Text>
					</Button>
				</View>
			)}
		</View>
	);
};
