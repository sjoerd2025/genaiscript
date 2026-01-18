script({
    title: "tool.changelog_apply",
    description: "Apply a changelog to a file.",
    group: "tools",
    isSystem: true
})

defTool(
    "changelog_apply",
    "Apply a changelog to a file.",
    {
        type: "object",
        properties: {
            file: {
                type: "string",
                description: "The path to the file to apply changes to.",
            },
            changelog: {
                type: "string",
                description: "The changelog string containing the changes.",
            },
        },
        required: ["file", "changelog"],
    },
    async (args) => {
        const { file, changelog } = args
        const { parseChangeLogs, applyChangeLog } = await import("../packages/core/src/changelog")
        const { readText, writeText } = await import("../packages/core/src/fs")

        try {
            const changes = parseChangeLogs(changelog)
            if (changes.length === 0) {
                return "No changes found in changelog."
            }

            // Find the change for the specific file if possible, or just apply the first one if it matches/is generic
            // For safety, let's try to match filename if provided from the parsed log, or assume the user knows what they are doing.

            const content = await readText(file)
            // Assuming the first changelog structure applies to the file 
            // OR finding the specific one.
            const changeToApply = changes.find(c => c.filename.includes(file) || file.includes(c.filename)) || changes[0]

            if (!changeToApply) return "Could not match changelog to file."

            const newContent = applyChangeLog(content, changeToApply)

            if (newContent !== content) {
                await writeText(file, newContent)
                return `Successfully applied changes to ${file}`
            } else {
                return `No changes were applied to ${file} (content might match already).`
            }

        } catch (e) {
            return `Error applying changelog: ${e.message}`
        }
    },
    {
        maxTokens: 10000,
    }
)
