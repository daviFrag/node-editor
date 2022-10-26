import { PolyglotNode, PolyglotEdge, MultipleChoiceQuestionNode, CodingQuestionNode, PassFailEdge, PolyglotFlow } from "../types/polyglotElements";
import { v4 as UUIDv4 } from 'uuid';
import { MarkerType } from "react-flow-renderer";

// this should be the real data type
// type PlanningGoal = {
//     currentState: string,
//     goal: string
// }
type PlanningGoal = string;
const subFlow = new Map<PlanningGoal, PolyglotFlow>();

{
    const ids = [...Array(2).keys()].map(i => UUIDv4());

    const multipleChoiceNodes: MultipleChoiceQuestionNode[] = [
        {
            type: "multipleChoiceQuestionNode",
            title: 'Multiple Choice Question',
            description: 'Some description',
            difficulty: 1,
            data: { question: "Test", isChoiceCorrect: [false], choices: ["Choice test"] },
            reactFlow: {
                id: ids[0],
                type: "multipleChoiceQuestionNode",
                position: { x: 250, y: 300 },
                data: { label: 'Multiple Choice Question' },

            },
        }
    ]

    const codingNodes: CodingQuestionNode[] = [

        {
            type: "codingQuestionNode",
            title: 'Coding Question',
            description: 'Some description',
            difficulty: 4,
            data: {},
            reactFlow: {
                id: ids[1],
                type: "codingQuestionNode",
                position: { x: 500, y: 300 },
                data: { label: 'Coding Question' },
            },
        }
    ];

    const flowNodes: PolyglotNode[] = [
        ...multipleChoiceNodes,
        ...codingNodes,
    ];

    const passFailEdges: PassFailEdge[] = [
        {
            title: 'Pass/Fail',
            type: "passFailEdge",
            data: {
                conditionKind: "pass",
            },
            reactFlow: {
                id: UUIDv4(),
                source: ids[0],
                target: ids[1],
                type: "passFailEdge",
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 25,
                    height: 25,
                }
            },
        },
    ]

    const flowEdges: PolyglotEdge[] = [
        ...passFailEdges,
    ]

    subFlow.set(
        // {
        //     currentState: "example",
        //     goal: "example",
        // }, {
        "example, example", {
        _id: UUIDv4(),
        title: "Abstract subTree",
        description: "This is an example",
        nodes: flowNodes,
        edges: flowEdges
    })
}
export default subFlow;