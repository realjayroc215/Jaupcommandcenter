/**
 * APEX DAN ↔ JAUP API Contract
 * Defines the communication interfaces between APEX DAN and JAUP platform
 */

/**
 * Agent registration data
 */
export interface JAUPAgentRegistration {
  id: string;
  name: string;
  role: 'operator' | 'assistant' | 'observer';
  capabilities: string[];
  version: string;
  created_at: string;
}

/**
 * Workflow start event
 */
export interface JAUPWorkflowStart {
  id: string;
  name: string;
  initiator: string;
  payload: Record<string, unknown>;
  created_at: string;
}

/**
 * APEX DAN command query
 */
export interface APEXDanQuery {
  commandCode: string;
  input: Record<string, unknown>;
  timestamp?: string;
}

/**
 * APEX DAN response
 */
export interface APEXDanResponse {
  commandCode: string;
  output: Record<string, unknown>;
  notes?: string;
  timestamp: string;
  status: 'success' | 'partial' | 'failed';
}

/**
 * Workflow execution status
 */
export interface WorkflowStatus {
  workflow_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  agent_id: string;
  message?: string;
  timestamp: string;
}

/**
 * Agent status
 */
export interface AgentStatus {
  agent_id: string;
  state: 'idle' | 'active' | 'busy' | 'offline';
  current_task?: string;
  queued_tasks: number;
  uptime_seconds: number;
  timestamp: string;
}

/**
 * Event types for JAUP event bus
 */
export type JAUPEvent =
  | { type: 'command.received'; payload: APEXDanQuery }
  | { type: 'workflow.start'; payload: JAUPWorkflowStart }
  | { type: 'workflow.complete'; payload: { workflow_id: string; result: unknown } }
  | { type: 'workflow.failed'; payload: { workflow_id: string; error: string } }
  | { type: 'agent.status_change'; payload: AgentStatus }
  | { type: 'query.request'; payload: APEXDanQuery }
  | { type: 'query.response'; payload: APEXDanResponse };

/**
 * REST endpoints
 */
export interface APEXDanAPI {
  // Submit command
  POST('/commands', { body: APEXDanQuery }): Promise<APEXDanResponse>;

  // Query agent status
  GET('/status'): Promise<AgentStatus>;

  // Get command history
  GET('/history'): Promise<APEXDanResponse[]>;

  // Get available commands
  GET('/commands'): Promise<{ code: string; description: string }[]>;

  // Register with JAUP
  POST('/register', { body: JAUPAgentRegistration }): Promise<{ registered: boolean }>;
}

/**
 * JAUP platform interface
 */
export interface JAUPPlatformAPI {
  // Emit event
  emit(event: JAUPEvent): Promise<void>;

  // Subscribe to events
  on(eventType: string, handler: (event: JAUPEvent) => void): void;

  // Get agent by ID
  getAgent(agentId: string): Promise<JAUPAgentRegistration | null>;

  // List all agents
  listAgents(): Promise<JAUPAgentRegistration[]>;

  // Start workflow
  startWorkflow(workflow: JAUPWorkflowStart): Promise<{ workflow_id: string }>;

  // Get workflow status
  getWorkflowStatus(workflowId: string): Promise<WorkflowStatus>;
}
