export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("examples/styles.css");
	eleventyConfig.ignores.add("examples/dist/**");
}
