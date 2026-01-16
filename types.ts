import React from 'react';

export type Language = 'en' | 'zh';

export enum ModuleType {
  OVERVIEW = 'Overview',
  RAG = 'RAG',
  QA = 'QA',
  TOOL_CALLING = 'Tool Calling',
  DEEP_RESEARCH = 'Deep Research'
}

export interface Metric {
  name: string;
  description: string;
  tool?: string; 
  formula: string; 
}

export interface Dataset {
  name: string;
  description: string; 
  tags?: string[];     
  kpis?: string[];     
}

export interface ModuleData {
  id: ModuleType;
  title: string;
  icon: React.ReactNode;
  summary: string;
  metrics: Metric[];
  datasets: Dataset[];
  radarData?: any[]; 
}