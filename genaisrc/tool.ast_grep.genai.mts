script({
    title: "tool.ast_grep",
    description: "Search for code using AST patterns.",
    group: "tools",
    isSystem: true
})

defTool(
    "ast_grep",
    "Search for code using AST patterns.",
    {
        type: "object",
        properties: {
            glob: {
                type: "string",
                description: "Glob pattern to filter files.",
            },
            pattern: {
                type: "string",
                description: "AST pattern to search for.",
            },
            lang: {
                type: "string",
                description: "Language of the files (e.g. typescript, python).",
            },
        },
        required: ["glob", "pattern"],
    },
    async (args) => {
        const { glob, pattern, lang } = args
        const { astGrepFindFiles } = await import("../packages/core/src/astgrep")

        // Default to typescript if not specified, or try to infer? 
        // astGrepFindFiles requires lang.
        const effectiveLang = lang || "typescript"

        try {
            const res = await astGrepFindFiles(effectiveLang, glob, pattern)
            return JSON.stringify(res, null, 2)
        } catch (e) {
            return `Error running AST Grep: ${e.message}`
        }
    },
    {
        maxTokens: 10000,
    }
)
