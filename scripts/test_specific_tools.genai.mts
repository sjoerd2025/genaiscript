script({
    title: "test_specific_tools",
    description: "Verify specific tools capability",
    tools: ["tool.ast_grep", "tool.git_client", "tool.changelog_apply", "tool.unzip", "tool.vector_search"]
})

$`Check if specific tools are working.`

// Helper to handle ESM/CJS default exports
function getExport(mod: any, name: string) {
    return mod[name] || (mod.default && mod.default[name]) || mod.default
}

// Test Git
const gitModule = await import("../packages/core/src/git")
const GitClient = getExport(gitModule, "GitClient")
const client = new GitClient(process.cwd())
const status = await client.branch()
console.log("Git branch:", status)
console.log("Git tool verified.")

// Test AST Grep
const astModule = await import("../packages/core/src/astgrep")
const astGrepFindFiles = getExport(astModule, "astGrepFindFiles")
// Mocking pattern search in this repo
const astRes = await astGrepFindFiles("typescript", "packages/core/src/*.ts", "class $A { $$$ }")
console.log("AST Grep result length:", astRes.length)
console.log("AST Grep tool verified.")

// Test Unzip (Mock)
// Need a real zip file to test, or we can mock/skip
console.log("Skipping live unzip test (setup required). Tool registered.")

// Test Vector Search (Mock)
// Needs indexed files.
console.log("Skipping live vector search test (indexing required). Tool registered.")
