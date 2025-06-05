export const blockData = [
    {
        id: 'block-id',   // id from svg file.
        lines: [
            'g3884', 'g3880', 'g3888'
        ],
        data: {
            name: 'block-name',
            description: 'block-description',
            qa: [
                {
                    question: 'question-1',
                    answer: 'answer-1',
                }
            ]
        }
    }
]

export const connectData = [
    {
        id: 'connect-id',
        to: 'block-id',
        from: 'block-id',
        data: {
            name: 'connect-name',
            description: 'connect-description',
        }
    }
]