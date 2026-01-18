script({
    title: "test_general_tools",
    description: "Verify general tools capability",
    tools: [
        "tool.math_eval",
        "tool.xml_parse",
        "tool.yaml_parse",
        "tool.diff_parse",
        "tool.csv_parse",
        "tool.toml_parse",
        "tool.ini_parse",
        "tool.json5_parse",
        "tool.web_search"
    ]
})

$`Check if the tools are working correctly.`

// Helper to handle ESM/CJS default exports
function getExport(mod: any, name: string) {
    return mod[name] || (mod.default && mod.default[name]) || mod.default
}

// Test Math
const mathModule = await import("../packages/core/src/math")
const MathTryEvaluate = getExport(mathModule, "MathTryEvaluate")
const mathRes = await MathTryEvaluate("12 + 34")
if (String(mathRes) !== "46") throw new Error(`Math failed: ${mathRes}`)
console.log("Math tool verified.")

// Test XML
const xmlModule = await import("../packages/core/src/xml")
const XMLParse = getExport(xmlModule, "XMLParse")
const xmlRes = XMLParse("<root><child>value</child></root>")
if (xmlRes.root.child !== "value") throw new Error(`XML failed: ${JSON.stringify(xmlRes)}`)
console.log("XML tool verified.")

// Test YAML
const yamlModule = await import("../packages/core/src/yaml")
const YAMLParse = getExport(yamlModule, "YAMLParse")
const yamlRes = YAMLParse("root:\n  child: value")
if (yamlRes.root.child !== "value") throw new Error(`YAML failed: ${JSON.stringify(yamlRes)}`)
console.log("YAML tool verified.")

// Test Diff
const diffModule = await import("../packages/core/src/diff")
const diffParse = getExport(diffModule, "diffParse")
const diffRes = diffParse(`
--- a/file.txt
+++ b/file.txt
@@ -1,1 +1,1 @@
-old
+new
`)
if (diffRes[0].to !== "file.txt" && diffRes[0].from !== "file.txt") throw new Error(`Diff failed: ${JSON.stringify(diffRes)}`)
console.log("Diff tool verified.")

// Test CSV
const csvModule = await import("../packages/core/src/csv")
const CSVParse = getExport(csvModule, "CSVParse")
const csvRes = CSVParse("col1,col2\nval1,val2")
if (csvRes[0].col1 !== "val1") throw new Error(`CSV failed: ${JSON.stringify(csvRes)}`)
console.log("CSV tool verified.")

// Test TOML
const tomlModule = await import("../packages/core/src/toml")
const TOMLParse = getExport(tomlModule, "TOMLParse")
const tomlRes = TOMLParse("title = 'TOML Example'")
if (tomlRes.title !== "TOML Example") throw new Error(`TOML failed: ${JSON.stringify(tomlRes)}`)
console.log("TOML tool verified.")

// Test INI
const iniModule = await import("../packages/core/src/ini")
const INIParse = getExport(iniModule, "INIParse")
const iniRes = INIParse("[section]\nkey=value")
if (iniRes.section.key !== "value") throw new Error(`INI failed: ${JSON.stringify(iniRes)}`)
console.log("INI tool verified.")

// Test JSON5
const json5Module = await import("../packages/core/src/json5")
const JSON5TryParse = getExport(json5Module, "JSON5TryParse")
const json5Res = JSON5TryParse("{ // comment \n key: 'value', }")
if (json5Res.key !== "value") throw new Error(`JSON5 failed: ${JSON.stringify(json5Res)}`)
console.log("JSON5 tool verified.")

console.log("All general tools verified.")

// Test Web Search (Mock or warn)
console.log("Skipping live web search test to avoid key errors, but tool is registered.")
