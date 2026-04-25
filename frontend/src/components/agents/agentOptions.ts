import type { AgentProvider, AgentRuntimeSelection } from "@/stores/agentSessionStore";
import { AGENT_MODEL_CATALOG, DEFAULT_CODEX_MODEL_ID } from "@/lib/agent-models";

export interface AgentModelOption {
  id: string;
  label: string;
}

export const AGENT_PROVIDER_OPTIONS: Array<{ id: AgentProvider; label: string }> = [
  { id: "claude", label: "Claude" },
  { id: "codex", label: "Codex" },
];

export const AGENT_MODEL_OPTIONS: Record<AgentProvider, AgentModelOption[]> = {
  claude: AGENT_MODEL_CATALOG.claude.map(({ id, label }) => ({ id, label })),
  codex: AGENT_MODEL_CATALOG.codex.map(({ id, label }) => ({ id, label })),
};

export const DEFAULT_AGENT_RUNTIME: AgentRuntimeSelection = {
  provider: "codex",
  modelId: DEFAULT_CODEX_MODEL_ID,
};

export function defaultModelForProvider(provider: AgentProvider): string {
  return AGENT_MODEL_OPTIONS[provider][0]?.id ?? DEFAULT_AGENT_RUNTIME.modelId;
}

export function normalizeRuntimeSelection(
  runtime: AgentRuntimeSelection | null | undefined
): AgentRuntimeSelection {
  if (!runtime) {
    return DEFAULT_AGENT_RUNTIME;
  }

  const availableModels = AGENT_MODEL_OPTIONS[runtime.provider] ?? [];
  if (availableModels.some((model) => model.id === runtime.modelId)) {
    return runtime;
  }

  return {
    provider: runtime.provider,
    modelId: defaultModelForProvider(runtime.provider),
  };
}
