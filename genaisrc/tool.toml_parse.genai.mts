script({
    title: "tool.toml_parse",
    description: "Parses TOML content into JSON.",
    group: "tools",
    isSystem: true
})

defTool(
    "toml_parse",
    "Parses TOML content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The TOML content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { TOMLParse } = await import("../packages/core/src/toml")
        try {
            const res = TOMLParse(content)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing TOML: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
