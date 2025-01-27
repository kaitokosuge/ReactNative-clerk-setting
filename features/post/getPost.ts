export const getPosts = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	if (!res.ok) {
		return { data: null, error: "some error" };
	}
	const data = await res.json();
	return { data: data, error: null };
};
