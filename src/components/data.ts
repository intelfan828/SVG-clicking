export interface AnswerSegment {
  type: 'text' | 'bold' | 'break';
  content?: string;
}

export const blockData = [
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
                        { type: "text" as const, content: "The DCS Infrastructure and Engineering team focuses on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" as const },
                        { type: "text" as const, content: "1. " },
                        { type: "bold" as const, content: "data center design and construction engagement" },
                        { type: "break" as const },
                        { type: "text" as const, content: "2. " },
                        { type: "bold" as const, content: "physical infrastructure (cable plant) design and build" },
                        { type: "break" as const },
                        { type: "text" as const, content: "3. " },
                        { type: "bold" as const, content: "product and platform development" },
                        { type: "text" as const, content: " with Infrastructure Platforms hardware engineering teams" },
                        { type: "break" as const },
                        { type: "text" as const, content: "4. " },
                        { type: "bold" as const, content: "design of engineered solutions" },
                        { type: "text" as const, content: " that includes offsite integration of compute/storage/build infrastructure, and product management for DCS." }
                    ]
                },
                {
                    question: "What is your team ultimately accountable for?",
                    answer: [
                        { type: "text" as const, content: "Our team's primary goal is to focus on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" as const },
                        { type: "bold" as const, content: "project/program/product support" },
                        { type: "text" as const, content: " throughout DCS and " },
                        { type: "bold" as const, content: "ownership of all engineered solutions" },
                        { type: "text" as const, content: " for product deployment at a global level." }
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