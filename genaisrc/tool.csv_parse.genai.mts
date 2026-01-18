script({
    title: "tool.csv_parse",
    description: "Parses CSV content into JSON.",
    group: "tools",
    isSystem: true
})

defTool(
    "csv_parse",
    "Parses CSV content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The CSV content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { CSVParse } = await import("../packages/core/src/csv")
        try {
            const res = CSVParse(content)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing CSV: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
