import React from 'react';
import { ModuleData, ModuleType, Language } from './types';
import { Database, MessageSquare, Wrench, Microscope, LayoutDashboard } from 'lucide-react';

export const UI_LABELS = {
  en: {
    metricsTitle: "Evaluation Metrics",
    standardFormulas: "Standard Formulas",
    datasetsTitle: "Recommended Datasets",
    performanceTrend: "Performance Trend",
    trendDesc: "Expected improvement per version iteration",
    holisticTitle: "Holistic System Evaluation",
    holisticDesc: "Bio-Agent vs Baseline Performance",
    exportReport: "Export Report",
    status: "Status",
    ready: "Ready for Testing",
    currentContext: "Current Context",
    contextDesc: "Biological System Evaluation",
    designedFor: "Designed for Bio-Agents",
    modules: "Evaluation Modules",
    pythonImpl: "Python Implementation",
    datasetName: "Dataset Name",
    tags: "Tags",
    kpis: "KPIs",
    desc: "Description",
    baseline: "Baseline",
    bioAgent: "Bio-Agent"
  },
  zh: {
    metricsTitle: "评估指标",
    standardFormulas: "标准公式",
    datasetsTitle: "推荐数据集",
    performanceTrend: "性能趋势",
    trendDesc: "每个版本的预期改进",
    holisticTitle: "系统整体评估",
    holisticDesc: "Bio-Agent 与基线的性能对比",
    exportReport: "导出报告",
    status: "状态",
    ready: "测试准备就绪",
    currentContext: "当前上下文",
    contextDesc: "生物系统评估",
    designedFor: "专为生物智能体设计",
    modules: "评估模块",
    pythonImpl: "Python 实现",
    datasetName: "数据集名称",
    tags: "标签",
    kpis: "关键指标",
    desc: "描述",
    baseline: "基线",
    bioAgent: "生物智能体"
  }
};

const DATA_EN: ModuleData[] = [
  {
    id: ModuleType.OVERVIEW,
    title: 'System Overview',
    icon: <LayoutDashboard className="w-5 h-5" />,
    summary: 'High-level performance summary of the Bio-Agent across key dimensions compared to baseline.',
    metrics: [],
    datasets: [],
    radarData: [
      { subject: 'Retrieval Accuracy', A: 92, B: 65, fullMark: 100 },
      { subject: 'Clinical Reasoning', A: 85, B: 55, fullMark: 100 },
      { subject: 'Tool Success', A: 78, B: 40, fullMark: 100 },
      { subject: 'Safety/Factuality', A: 95, B: 60, fullMark: 100 },
      { subject: 'Context Length', A: 88, B: 50, fullMark: 100 },
      { subject: 'Bio-Knowledge', A: 90, B: 60, fullMark: 100 },
    ]
  },
  {
    id: ModuleType.RAG,
    title: 'RAG Evaluation',
    icon: <Database className="w-5 h-5" />,
    summary: 'Evaluates the retrieval accuracy of biological entities and the faithfulness of the generation based on retrieved contexts.',
    metrics: [
      {
        name: 'Context Recall',
        description: 'Top-K retrieved documents must contain the Golden Truth.',
        tool: 'Custom Python',
        formula: `def context_recall(retrieved, ground_truth): 
    # Check intersection of retrieved content and ground truth
    return len(set(retrieved) & set(ground_truth)) / len(ground_truth)`
      },
      {
        name: 'Faithfulness',
        description: 'Ensures the generated claim can be derived solely from the context.',
        tool: 'Ragas',
        formula: `from ragas import faithfulness 
# Calculate faithfulness score based on answer and context
score = faithfulness.score(answer, context)`
      }
    ],
    datasets: [
      {
        name: 'BioASQ (Task B)',
        tags: ['Semantic Indexing', 'QA'],
        kpis: ['MAP@K', 'Recall@K'],
        description: 'The "Olympics" of biomedical retrieval. Task B contains real questions, triplets, and exact answers based on PubMed abstracts.'
      },
      {
        name: 'SciFact',
        tags: ['Claim Verification', 'Evidence'],
        kpis: ['Label Accuracy'],
        description: 'A dataset for scientific claim verification. Requires verifying if a generated claim is supported by evidence.'
      },
      {
        name: 'TREC-COVID',
        tags: ['IR', 'Domain Specific'],
        kpis: ['NDCG@10'],
        description: 'Retrieval benchmark specifically for public health emergencies. Tests retrieval capabilities on rapidly growing corpora.'
      },
      {
        name: 'PubMedQA',
        tags: ['Context Reasoning'],
        kpis: ['Accuracy'],
        description: 'Requires the model to answer Yes/No/Maybe based on abstract content, testing context understanding.'
      }
    ]
  },
  {
    id: ModuleType.QA,
    title: 'QA & Reasoning',
    icon: <MessageSquare className="w-5 h-5" />,
    summary: 'Assesses the agent\'s ability to answer domain-specific questions correctly, including multi-hop reasoning.',
    metrics: [
      {
        name: 'Exact Match',
        description: 'Strict matching test for Bio-Entities.',
        tool: 'Python String Match',
        formula: `def exact_match(prediction, truth): 
    # Strict string comparison after stripping whitespace
    return 1 if prediction.strip() == truth.strip() else 0`
      },
      {
        name: 'Bio-F1 Score',
        description: 'Vocabulary-level overlap degree.',
        tool: 'sklearn',
        formula: `from sklearn.metrics import f1_score 
# Calculate F1 score based on precision and recall of tokens
score = 2 * (p * r) / (p + r)`
      }
    ],
    datasets: [
      {
        name: 'MedQA (USMLE)',
        tags: ['Clinical Knowledge'],
        kpis: ['Accuracy'],
        description: 'Questions from the US Medical Licensing Examination, evaluating if AI possesses human doctor-level knowledge.'
      },
      {
        name: 'GeneTuring',
        tags: ['Genomics'],
        kpis: ['Exact Match'],
        description: 'Genomics-specific QA library (including gene locations, aliases) to test molecular biology details.'
      },
      {
        name: 'MedMCQA',
        tags: ['Broad Coverage'],
        kpis: ['Accuracy'],
        description: 'Covers 194k questions from Indian medical entrance exams, suitable for stability testing.'
      },
      {
        name: 'MMLU-Med',
        tags: ['Zero-shot'],
        kpis: ['Zero-shot Acc'],
        description: 'Used to evaluate the general biological common sense level of the model without fine-tuning.'
      }
    ]
  },
  {
    id: ModuleType.TOOL_CALLING,
    title: 'Tool Use / Agents',
    icon: <Wrench className="w-5 h-5" />,
    summary: 'Evaluates if the agent calls the correct external APIs (e.g., NCBI, BLAST) with correct parameters.',
    metrics: [
      {
        name: 'Tool Success',
        description: 'Successful call and compliance with Schema.',
        tool: 'Schema Validator',
        formula: `def success(outputs): 
    # Calculate ratio of successful outputs to total
    return len([o for o in outputs if o.ok]) / total`
      },
      {
        name: 'Arg Hallucination',
        description: 'Checks if parameters are fabricated.',
        tool: 'Validation Logic',
        formula: `def check_args(schema, args): 
    # Return 1 minus the error rate of invalid arguments
    return 1 - (invalid / total)`
      }
    ],
    datasets: [
      {
        name: 'ChemCrow Bench',
        tags: ['Chemistry Tools'],
        kpis: ['Success Rate'],
        description: 'Authoritative benchmark for chemical agents. Tests ability to plan molecular synthesis and predict properties.'
      },
      {
        name: 'SciBench',
        tags: ['Calculation'],
        kpis: ['Calc Accuracy'],
        description: 'Focuses on complex scientific calculation problems, such as concentration calculations and kinetic equation solving.'
      },
      {
        name: 'Mol-Instructions',
        tags: ['Protein Design'],
        kpis: ['Validity'],
        description: 'Contains instructional tasks regarding biomolecules, testing instruction following and tool execution.'
      },
      {
        name: 'ToolBench-Bio',
        tags: ['API Calling'],
        kpis: ['Pass Rate'],
        description: 'General bio-related API call scenarios, testing parameter filling and error handling.'
      }
    ]
  },
  {
    id: ModuleType.DEEP_RESEARCH,
    title: 'Deep Research',
    icon: <Microscope className="w-5 h-5" />,
    summary: 'Evaluates the ability to synthesize long-form reports, cite sources accurately, and cover topics comprehensively.',
    metrics: [
      {
        name: 'Citation Precision',
        description: 'Whether the citation supports the argument.',
        tool: 'Custom Eval',
        formula: `def cite_prec(report, sources): 
    # Calculate precision of citations supporting the report claims
    return hits / len(report.citations)`
      },
      {
        name: 'Factuality',
        description: 'NLI model to judge authenticity.',
        tool: 'RoBERTa-MNLI',
        formula: `from transformers import pipeline
# Use NLI pipeline to check entailment
pipe = pipeline("nli", model="roberta-mnli")`
      }
    ],
    datasets: [
      {
        name: 'LitQA (LitQA2)',
        tags: ['Leak-proof', 'Multi-step Retrieval'],
        kpis: ['Accuracy', 'Evidence Retrieval'],
        description: 'Developed by LabWorm. A leak-proof benchmark based on recent literature, preventing training data contamination. Requires expert-level multi-step reasoning and synthesis.'
      },
      {
        name: 'Cochrane Reviews',
        tags: ['Systematic Review'],
        kpis: ['ROUGE-L'],
        description: 'Highest standard for evidence-based medicine. Tests ability to summarize conclusions from multiple papers.'
      },
      {
        name: 'Qasper',
        tags: ['Evidence Extraction'],
        kpis: ['Evidence F1'],
        description: 'Focuses on answering questions from full academic papers and locating evidence fragments.'
      },
      {
        name: 'LongHealth',
        tags: ['Long Context'],
        kpis: ['Retrieval Acc'],
        description: 'QA for ultra-long clinical records and literature, testing long-context forgetting issues.'
      },
      {
        name: 'MS^2',
        tags: ['Summarization'],
        kpis: ['BERTScore'],
        description: 'Medical domain multi-document summarization task, corresponding to core output of Research Agents.'
      }
    ]
  }
];

const DATA_ZH: ModuleData[] = [
  {
    id: ModuleType.OVERVIEW,
    title: '系统概览',
    icon: <LayoutDashboard className="w-5 h-5" />,
    summary: 'Bio-Agent 在关键维度上与基线相比的高级性能总结。',
    metrics: [],
    datasets: [],
    radarData: [
      { subject: '检索准确率', A: 92, B: 65, fullMark: 100 },
      { subject: '临床推理', A: 85, B: 55, fullMark: 100 },
      { subject: '工具成功率', A: 78, B: 40, fullMark: 100 },
      { subject: '安全/真实性', A: 95, B: 60, fullMark: 100 },
      { subject: '上下文长度', A: 88, B: 50, fullMark: 100 },
      { subject: '生物知识', A: 90, B: 60, fullMark: 100 },
    ]
  },
  {
    id: ModuleType.RAG,
    title: 'RAG 评估',
    icon: <Database className="w-5 h-5" />,
    summary: '评估生物实体的检索准确性以及基于检索上下文生成的忠实度。',
    metrics: [
      {
        name: '上下文召回率 (Context Recall)',
        description: 'Top-K 检索文档必须包含 Golden Truth (标准答案)。',
        tool: 'Custom Python',
        formula: `def context_recall(retrieved, ground_truth): 
    # Check intersection of retrieved content and ground truth
    return len(set(retrieved) & set(ground_truth)) / len(ground_truth)`
      },
      {
        name: '忠实度 (Faithfulness)',
        description: '确保生成的声明仅源自检索到的上下文。',
        tool: 'Ragas',
        formula: `from ragas import faithfulness 
# Calculate faithfulness score based on answer and context
score = faithfulness.score(answer, context)`
      }
    ],
    datasets: [
      {
        name: 'BioASQ (Task B)',
        tags: ['语义索引', '问答'],
        kpis: ['MAP@K', 'Recall@K'],
        description: '生物医学检索领域的“奥运会”。Task B 包含基于 PubMed 摘要的真实问题、三元组和准确答案。'
      },
      {
        name: 'SciFact',
        tags: ['声明验证', '证据支持'],
        kpis: ['Label Accuracy'],
        description: '针对科学声明的校验数据集。要求验证生成的声明（Claim）是否有证据支持。'
      },
      {
        name: 'TREC-COVID',
        tags: ['信息检索', '特定领域'],
        kpis: ['NDCG@10'],
        description: '专门针对突发公共卫生事件的检索基准。测试快速增长语料库的检索能力。'
      },
      {
        name: 'PubMedQA',
        tags: ['上下文推理'],
        kpis: ['Accuracy'],
        description: '要求模型根据摘要内容回答 Yes/No/Maybe，测试上下文理解力。'
      }
    ]
  },
  {
    id: ModuleType.QA,
    title: '问答与推理',
    icon: <MessageSquare className="w-5 h-5" />,
    summary: '评估智能体正确回答特定领域问题的能力，包括多跳推理。',
    metrics: [
      {
        name: '精确匹配 (Exact Match)',
        description: '针对生物实体的严格匹配测试。',
        tool: 'Python String Match',
        formula: `def exact_match(prediction, truth): 
    # Strict string comparison after stripping whitespace
    return 1 if prediction.strip() == truth.strip() else 0`
      },
      {
        name: '生物 F1 分数 (Bio-F1)',
        description: '词汇级别的重叠度测试。',
        tool: 'sklearn',
        formula: `from sklearn.metrics import f1_score 
# Calculate F1 score based on precision and recall of tokens
score = 2 * (p * r) / (p + r)`
      }
    ],
    datasets: [
      {
        name: 'MedQA (USMLE)',
        tags: ['临床知识'],
        kpis: ['Accuracy'],
        description: '美国医疗执照考试题目，评估 AI 是否具备人类医生水平的知识。'
      },
      {
        name: 'GeneTuring',
        tags: ['基因组学'],
        kpis: ['Exact Match'],
        description: '专门针对基因组学的 QA 库（包含基因位置、别名），测试分子生物学细节。'
      },
      {
        name: 'MedMCQA',
        tags: ['广泛覆盖'],
        kpis: ['Accuracy'],
        description: '涵盖印度医学入学考试的 19.4万 个问题，适合做稳定性测试。'
      },
      {
        name: 'MMLU-Med',
        tags: ['Zero-shot'],
        kpis: ['Zero-shot Acc'],
        description: '用于评估模型在没有微调情况下的通用生物学常识水平。'
      }
    ]
  },
  {
    id: ModuleType.TOOL_CALLING,
    title: '工具调用 / Agents',
    icon: <Wrench className="w-5 h-5" />,
    summary: '评估智能体是否能够使用正确的参数调用外部 API（如 NCBI, BLAST）。',
    metrics: [
      {
        name: '工具成功率 (Tool Success)',
        description: '成功调用且符合 Schema 规范。',
        tool: 'Schema Validator',
        formula: `def success(outputs): 
    # Calculate ratio of successful outputs to total
    return len([o for o in outputs if o.ok]) / total`
      },
      {
        name: '参数幻觉 (Arg Hallucination)',
        description: '检查参数是否为捏造或无效。',
        tool: 'Validation Logic',
        formula: `def check_args(schema, args): 
    # Return 1 minus the error rate of invalid arguments
    return 1 - (invalid / total)`
      }
    ],
    datasets: [
      {
        name: 'ChemCrow Bench',
        tags: ['化学工具'],
        kpis: ['Success Rate'],
        description: '化学 Agent 权威基准。测试使用工具进行分子合成规划、性质预测的能力。'
      },
      {
        name: 'SciBench',
        tags: ['科学计算'],
        kpis: ['Calc Accuracy'],
        description: '专注于复杂的科学计算问题，如浓度计算、动力学方程求解。'
      },
      {
        name: 'Mol-Instructions',
        tags: ['蛋白质设计'],
        kpis: ['Validity'],
        description: '包含关于生物分子的指令任务，测试指令遵循与工具执行。'
      },
      {
        name: 'ToolBench-Bio',
        tags: ['API 调用'],
        kpis: ['Pass Rate'],
        description: '通用生物类 API 调用场景，测试参数填充和错误处理。'
      }
    ]
  },
  {
    id: ModuleType.DEEP_RESEARCH,
    title: '深度研究',
    icon: <Microscope className="w-5 h-5" />,
    summary: '评估合成长篇报告、准确引用来源以及全面覆盖主题的能力。',
    metrics: [
      {
        name: '引用精确度 (Citation Precision)',
        description: '引用是否确实支持了论点。',
        tool: 'Custom Eval',
        formula: `def cite_prec(report, sources): 
    # Calculate precision of citations supporting the report claims
    return hits / len(report.citations)`
      },
      {
        name: '真实性 (Factuality)',
        description: '使用 NLI 模型判断内容的真实性。',
        tool: 'RoBERTa-MNLI',
        formula: `from transformers import pipeline
# Use NLI pipeline to check entailment
pipe = pipeline("nli", model="roberta-mnli")`
      }
    ],
    datasets: [
      {
        name: 'LitQA (LitQA2)',
        tags: ['防泄漏', '多步检索'],
        kpis: ['Accuracy', 'Evidence Retrieval'],
        description: '由 LabWorm 团队开发。基于最新文献的防泄漏基准测试，防止训练数据污染。需要专家级的多步检索和综合能力。'
      },
      {
        name: 'Cochrane Reviews',
        tags: ['系统综述'],
        kpis: ['ROUGE-L'],
        description: '循证医学最高标准。测试从多篇文献中总结结论的能力。'
      },
      {
        name: 'Qasper',
        tags: ['证据提取'],
        kpis: ['Evidence F1'],
        description: '专注于从学术论文全文中回答问题并定位证据片段。'
      },
      {
        name: 'LongHealth',
        tags: ['长上下文'],
        kpis: ['Retrieval Acc'],
        description: '针对超长临床病历和文献的问答，测试长窗口遗忘问题。'
      },
      {
        name: 'MS^2',
        tags: ['摘要生成'],
        kpis: ['BERTScore'],
        description: '医学领域多文档摘要任务，对应 Research Agent 核心产出。'
      }
    ]
  }
];

export const getAppData = (lang: Language) => lang === 'zh' ? DATA_ZH : DATA_EN;