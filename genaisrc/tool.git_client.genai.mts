script({
    title: "tool.git_client",
    description: "Execute Git commands in the workspace.",
    group: "tools",
    isSystem: true
})

defTool(
    "git_client",
    "Execute Git commands.",
    {
        type: "object",
        properties: {
            command: {
                type: "string",
                description: "The git command to execute (e.g., 'status', 'diff', 'commit', 'log').",
                enum: ["status", "diff", "log", "commit", "add", "checkout", "branch", "pull", "push", "fetch"]
            },
            args: {
                type: "array",
                items: { type: "string" },
                description: "Arguments for the git command.",
            },
        },
        required: ["command"],
    },
    async (args) => {
        const { command, args: gitArgs = [] } = args
        const { GitClient } = await import("../packages/core/src/git")

        const client = new GitClient(process.cwd())

        try {
            // Map common commands to specific methods if available for safety/convenience, 
            // or use exec for flexibility.
            // Using exec for maximum flexibility as a general wrapper.
            const res = await client.exec([command, ...gitArgs])
            return res
        } catch (e) {
            return `Error executing git command: ${e.message}`
        }
    },
    {
        maxTokens: 10000, // Git output can be large
    }
)
