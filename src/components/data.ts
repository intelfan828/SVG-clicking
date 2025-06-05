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
            description: "Owns global data center designs/standards, ensuring resilient DC environments through engineered solutions and project/program/product support.",
            qa: [
                {
                    question: "What is the primary function of your team?",
                    answer: [
                        { type: "text", content: "The DCS Infrastructure and Engineering team focuses on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" },
                        { type: "text", content: "1. data center design and construction engagement," },
                        { type: "break" },
                        { type: "text", content: "2. physical infrastructure (cable plant) design and build," },
                        { type: "break" },
                        { type: "text", content: "3. product and platform development with Infrastructure Platforms hardware engineering teams," },
                        { type: "break" },
                        { type: "text", content: "4. design of “engineered solutions” that includes offsite integration of compute/storage/build infrastructure, and product management for DCS." }
                    ]
                },
                {
                    question: "What is your team ultimately accountable for?",
                    answer: [
                        { type: "text", content: "Our team's primary goal is to focus on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes " },
                        { type: "bold", content: "project/program/product support " },
                        { type: "text", content: "throughout DCS and ownership of all engineered solutions for product deployment at a global level." }
                    ]
                },
                {
                    question: "Which services, systems, or tools does your team directly own or manage?",
                    answer: [
                        { type: "text", content: "Our team's primary goal is to focus on designs and standards to ensure a stable, resilient datacenter environment for JPMC. This includes:" },
                        { type: "break" },
                        { type: "text", content: "1. Physical IT infrastructure design and layout for new site builds (including Local Zone and Specialty sites), expansions, refresh areas - including spatial planning" },
                        { type: "break" },
                        { type: "text", content: "2. Physical IT project layout/design across compute/network/storage for IP teams and LOB teams" },
                        { type: "break" },
                        { type: "text", content: "3. Infrastructure cabling standards and deployment strategies (physical cable plant, tray design, product design)" },
                        { type: "break" },
                        { type: "text", content: "4. Engineered solutions within TAPS, DCOS, Verum – this includes pattern design" },
                        { type: "break" },
                        { type: "text", content: "5. Offsite integration (build) physical standards, quality control ownership (DCOSX/PhotoQA), product design and engineering" },
                        { type: "break" },
                        { type: "text", content: "6. Physical RFID infrastructure design, including deployment and use approach" },
                        { type: "break" },
                        { type: "text", content: "7. Product advisories – new or existing deployments" },
                        { type: "break" },
                        { type: "text", content: "8. Physical power monitoring infrastructure design, including power strip meters" },
                        { type: "break" },
                        { type: "text", content: "9. Datacenter product consumables standards and definition, including power strips, cabinets, patch cords, etc." },
                        { type: "break" },
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