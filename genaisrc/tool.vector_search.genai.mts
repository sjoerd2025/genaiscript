script({
    title: "tool.vector_search",
    description: "Semantic search over files using embeddings.",
    group: "tools",
    isSystem: true
})

defTool(
    "vector_search",
    "Semantic search over files using embeddings.",
    {
        type: "object",
        properties: {
            query: {
                type: "string",
                description: "The search query.",
            },
            files: {
                type: "string",
                description: "Glob pattern or path to files to search over.",
            },
            topK: {
                type: "number",
                description: "Number of results to return (default 5).",
            },
        },
        required: ["query", "files"],
    },
    async (args) => {
        const { query, files, topK = 5 } = args
        const { vectorSearch } = await import("../packages/core/src/vectorsearch")
        const { expandFiles } = await import("../packages/core/src/fs")

        try {
            // Resolve files from glob
            const filePaths = await expandFiles([files])
            if (filePaths.length === 0) return "No files found matching the pattern."

            const workspaceFiles = filePaths.map(f => ({ filename: f }))

            const res = await vectorSearch("vector_search_tool_index", query, workspaceFiles, {
                topK,
                trace: context.trace
            })

            return JSON.stringify(res.map(r => ({ filename: r.filename, score: r.score, content: r.content })), null, 2)
        } catch (e) {
            return `Error performing vector search: ${e.message}`
        }
    },
    {
        maxTokens: 10000,
    }
)
