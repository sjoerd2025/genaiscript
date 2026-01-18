script({
    title: "tool.diff_parse",
    description: "Parses a unified diff string into a structured JSON object.",
    group: "tools",
    isSystem: true
})

defTool(
    "diff_parse",
    "Parses a unified diff string into a structured JSON object.",
    {
        type: "object",
        properties: {
            diff: {
                type: "string",
                description: "The unified diff string to parse.",
            },
        },
        required: ["diff"],
    },
    async (args) => {
        const { diff } = args
        const { diffParse } = await import("../packages/core/src/diff")
        try {
            const res = diffParse(diff)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing Diff: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
