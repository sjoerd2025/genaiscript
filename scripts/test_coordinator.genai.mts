script({
    title: "Test Coordinator Agent",
    description: "Tests the coordinator agent with a sample task.",
    tools: ["agent_coordinator", "fs_read_file"]
})

$`You are a user testing the Coordinator agent.
Ask the coordinator to 'Analyze the current repository structure and summarize the purpose of the packages/cli directory'.
Verify that the coordinator accepts the task and provides a plan or delegation strategy (even if it simulates the delegation).
Wait for the response and output whether the test passed or failed based on if the coordinator behaved as an agent.`
