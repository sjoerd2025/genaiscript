script({
    title: "tool.json5_parse",
    description: "Parses JSON5 content into JSON (supports comments, trailing commas).",
    group: "tools",
    isSystem: true
})

defTool(
    "json5_parse",
    "Parses JSON5 content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The JSON5 content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { JSONLLMTryParse } = await import("../packages/core/src/json5")
        try {
            // JSONLLMTryParse handles fencing, thinking blocks, and repairs.
            const res = JSONLLMTryParse(content)
            if (res === undefined) throw new Error("Parsed result is undefined")
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing JSON5: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
