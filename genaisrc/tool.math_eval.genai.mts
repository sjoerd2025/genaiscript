script({
    title: "tool.math_eval",
    description: "Evaluates a mathematical expression using mathjs.",
    group: "tools",
    isSystem: true
})

defTool(
    "math_eval",
    "Evaluates a mathematical expression.",
    {
        type: "object",
        properties: {
            expression: {
                type: "string",
                description: "The mathematical expression to evaluate.",
            },
        },
        required: ["expression"],
    },
    async (args) => {
        const { expression } = args
        const { MathTryEvaluate } = await import("../packages/core/src/math")
        const res = await MathTryEvaluate(expression)
        return res !== undefined ? String(res) : "Error evaluating expression"
    },
    {
        maxTokens: 100,
    }
)
