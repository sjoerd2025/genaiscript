script({
    title: "tool.ini_parse",
    description: "Parses INI content into JSON.",
    group: "tools",
    isSystem: true
})

defTool(
    "ini_parse",
    "Parses INI content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The INI content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { INIParse } = await import("../packages/core/src/ini")
        try {
            const res = INIParse(content)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing INI: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
