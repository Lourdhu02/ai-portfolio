# Datasets

No public benchmark datasets are directly applicable to AI-native portfolio platforms. Instead, data is **self-generated**:

- **profile.json** (YiWang24) — single JSON file containing bio, experience, education, skills, and project metadata. Acts as the RAG corpus after chunking and embedding.
- **portfolio/*.json** (rollacode) — per-site config.json, projects.json, skills.json, experience.json, recommendations.json. Structured data the AI agent acts over via 22 reactive UI tools.
- **portfolio_data.py** (enriquekalven) — Python data module holding career history, certifications, awards, and skills for A2UI agent synthesis.
- **Resume/bio chunks** (psjprajna) — semantic chunks from resume, bio text, and project READMEs embedded via Voyage AI into pgvector for multilingual RAG.
- **Conversation history** — IndexedDB (rollacode), KV store (YiWang24), or chat session DB for multi-turn context.

No external training datasets are used — all context is personal profile data that gets embedded at build time or on-demand.
