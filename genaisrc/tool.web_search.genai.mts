script({
    title: "tool.web_search",
    description: "Search the web using Bing or Tavily.",
    group: "tools",
    isSystem: true
})

defTool(
    "web_search",
    "Search the web using Bing or Tavily.",
    {
        type: "object",
        properties: {
            query: {
                type: "string",
                description: "The search query.",
            },
            provider: {
                type: "string",
                description: "Search provider to use (bing or tavily).",
                enum: ["bing", "tavily"],
            },
        },
        required: ["query"],
    },
    async (args) => {
        const { query, provider } = args
        const { bingSearch, tavilySearch } = await import("../packages/core/src/websearch")

        try {
            let res
            if (provider === "tavily") {
                res = await tavilySearch(query)
            } else {
                // Default to Bing or maybe try both? Defaulting to Bing as per existing patterns often seen.
                // However, without keys this will fail. The core function checks keys.
                res = await bingSearch(query, { ignoreMissingApiKey: true })
                if (!res) {
                    res = await tavilySearch(query, { ignoreMissingApiKey: true })
                }
            }

            if (!res) return "No search provider configured or available (missing API keys)."

            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error performing web search: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
