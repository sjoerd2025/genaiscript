script({
    title: "tool.yaml_parse",
    description: "Parses YAML content into JSON.",
    group: "tools",
    isSystem: true
})

defTool(
    "yaml_parse",
    "Parses YAML content into JSON.",
    {
        type: "object",
        properties: {
            content: {
                type: "string",
                description: "The YAML content to parse.",
            },
        },
        required: ["content"],
    },
    async (args) => {
        const { content } = args
        const { YAMLParse } = await import("../packages/core/src/yaml")
        try {
            const res = YAMLParse(content)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error parsing YAML: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
