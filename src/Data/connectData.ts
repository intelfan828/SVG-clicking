
export const connectData = [
    // Internal Interactions
    {
        id: "g3884",
        from: "g1778",
        to: "g2378",
        type: "internal",
        data: {
            name: "DC Engineering --> DC Exit & Strategy (DCE&S)",
            summary: "Technical deployment & support",
            desTitle: "DC Engineering —— DCE&S:",
            description: "DC Engineering owns global standards and hardware design patterns; DCE&S applies these designs in site-specific exit or lifecycle scenarios. DCE&S consults Engineering for design feasibility and adaptations when standard patterns (e.g., Micro/Mini deployments) require tailoring due to location-specific constraints.",
        }
    },
    {
        id: "g3888",
        from: "g1778",
        to: "g1618",
        type: "internal",
        data: {
            name: "DC Engineering --> Capacity & Placement Capacity",
            summary: "Design and Standards",
            desTitle: "DC Engineering —— Capacity:",
            description: "Capacity collects business-side demand and routes it to Engineering (and sometimes TS or Ops. TS is optional in project support. ) Engineering provides the “what” — meaning engineered solution requirements for new tech.",
        }
    },
    {
        id: "g3880",
        from: "g1778",
        to: "g1451",
        type: "internal",
        data: {
            name: "EC Engineering --> Tech Support (TS)",
            summary: "Design and Standards",
            desTitle: "DC Engineering —— TS:",
            description: "DC Engineering defines and communicates what to deploy (design specs, standards). TS determines how to deploy, operate, and support the solution. Daily project and escalation coordination occurs.",
        }
    },

    // External Interactions
    {
        id: "g4336",
        from: "g1778",
        to: "g7",
        type: "external",
        data: {
            name: "DC Engineering<--> Global Real Estate (GRE)",
            summary: "Facility Readiness",
            desTitle: "DC Engineering —— GRE:",
            description: "DC Engineering defines requirements and validates facility designs; GRE executes physical build and maintains operational readiness for DCS deployment.",
        }
    },
    {
        id: "g4358",
        from: "g1778",
        to: "g7",
        type: "external",
        data: {
            name: "DC Engineering <----> Global Security (GS)",
            summary: "Security Design Alignment",
            desTitle: "DC Engineering —— GS:",
            description: "GS and DC Engineering relationship is functionally similar to GRE and DC Engineering in the context of facility readiness and infrastructure support, just with a security focus. The interaction is project-based, typically triggered during new builds, expansions, or specific infrastructure projects.",
        }
    },
    {
        id: "g4385",
        from: "g1778",
        to: "g7",
        type: "external",
        data: {
            name: "DC Engineering <----> Supply Chain (SC)",
            summary: "Engineered Solution",
            desTitle: "DC Engineering —— SC:",
            description: "DC Engineering defines rack specs; interfaces with integrators; drives QA/QC and physical build requirements. SC coordinates with vendors; manages integrators; procures parts/materials Together, make ready-to-deploy racks.",
        }
    },
    {
        id: "g4408",
        from: "g1778",
        to: "g7",
        type: "external",
        data: {
            name: "DC Engineering <--> IP/CNS product owners and architects",
            summary: "Engineered Solution",
            desTitle: "DC Engineering —— IP/CNS product owners and architects:",
            description: "IP/CNS PO and Architects defines product specs, tech requirements, deployment guidance. DC Engineering translates IP hardware needs into physical infrastructure design.",
        }
    },
]