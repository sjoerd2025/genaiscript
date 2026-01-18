script({
    title: "tool.xml_parse",
    description: "Parses XML content into JSON.",
    group: "tools",
    isSystem: true
})

defTool(
    "xml_parse",
    "Parses XML content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The XML content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { XMLParse } = await import("../packages/core/src/xml")
        try {
            const res = XMLParse(content)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing XML: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
