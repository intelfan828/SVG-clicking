export interface AnswerSegment {
  type: 'text' | 'bold' | 'break';
  content?: string;
}

export interface BlockData {
  id: string;
  lines: string[];
  data: {
    name: string;
    description: string;
    qa: Array<{
      question: string;
      answer: AnswerSegment[];
    }>;
  };
}

export const blockData: BlockData[] = [
    {
        id: "g1778",
        lines: [
            "g3884", "g3880", "g3888"
        ],
        data: {
            name: "DC Engineering",
            description: "DC Engineering",
            qa: [
                {
                    question: "What is the primary function of your team?",
                    answer: [
                        { type: "text", content: "The DCS Infrastructure and Engineering team focuses on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" },
                        { type: "text", content: "1. " },
                        { type: "bold", content: "data center design and construction engagement" },
                        { type: "break" },
                        { type: "text", content: "2. " },
                        { type: "bold", content: "physical infrastructure (cable plant) design and build" },
                        { type: "break" },
                        { type: "text", content: "3. " },
                        { type: "bold", content: "product and platform development" },
                        { type: "text", content: " with Infrastructure Platforms hardware engineering teams" },
                        { type: "break" },
                        { type: "text", content: "4. " },
                        { type: "bold", content: "design of engineered solutions" },
                        { type: "text", content: " that includes offsite integration of compute/storage/build infrastructure, and product management for DCS." }
                    ]
                },
                {
                    question: "What is your team ultimately accountable for?",
                    answer: [
                        { type: "text", content: "Our team's primary goal is to focus on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" },
                        { type: "bold", content: "project/program/product support" },
                        { type: "text", content: " throughout DCS and " },
                        { type: "bold", content: "ownership of all engineered solutions" },
                        { type: "text", content: " for product deployment at a global level." }
                    ]
                }
            ]
        }
    }
]

export const connectData = [
    {
        id: "connect-id",
        to: "block-id",
        from: "block-id",
        data: {
            name: "connect-name",
            description: "connect-description",
        }
    }
]