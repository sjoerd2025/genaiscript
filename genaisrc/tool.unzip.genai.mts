script({
    title: "tool.unzip",
    description: "Unzip a file.",
    group: "tools",
    isSystem: true
})

defTool(
    "unzip",
    "Unzip a file and return the list of extracted files.",
    {
        type: "object",
        properties: {
            filename: {
                type: "string",
                description: "The path to the zip file.",
            },
            glob: {
                type: "string",
                description: "Optional glob pattern to filter extracted files.",
            },
        },
        required: ["filename"],
    },
    async (args) => {
        const { filename, glob } = args
        const { unzip } = await import("../packages/core/src/zip")
        const { resolveFileBytes } = await import("../packages/core/src/file")

        try {
            const bytes = await resolveFileBytes(filename)
            if (!bytes) return "File not found or empty."

            const files = await unzip(bytes, { glob })

            // Return summary or content? Content might be huge.
            // Let's return filenames and sizes, and maybe preview content for text files?
            // For now, just listing.
            return files.map(f => `${f.filename} (${f.content ? f.content.length + " chars" : "binary"})`).join("\n")
        } catch (e) {
            return `Error unzipping file: ${e.message}`
        }
    },
    {
        maxTokens: 4000,
    }
)
