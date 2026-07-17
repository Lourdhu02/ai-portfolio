# MCP-Enabled Financial Agent

## Architecture
A financial analysis agent using the Model Context Protocol (MCP) to connect LLMs with market data APIs. Demonstrates the tool-as-a-service pattern where financial tools are discoverable and callable via JSON-RPC over Streamable HTTP.

## Tech Stack
- MCP Protocol 2026-07-28
- Claude Sonnet for financial reasoning
- Express.js MCP server
- PostgreSQL for portfolio tracking

## Implementation
Implements MCP tools/list and tools/call for financial operations: fetch_stock_data, calculate_portfolio_metrics, generate_report. Each tool has a Zod schema for parameter validation. The agent discovers available tools at runtime and chains them for multi-step financial analysis workflows.

## Key Features
- Dynamic tool discovery via MCP protocol
- Streaming financial report generation
- Multi-step analysis workflows
- Type-safe tool definitions with Zod
