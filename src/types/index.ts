export type Tquestion = {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
};

export enum QuizStatus {
	LOADING = 'loading',
	READY = 'ready',
    ERROR = 'error',
    ACTIVE = 'active',
}

export enum ActionType {
    DATARECEIVED = 'dataReceived',
    DATAFAILED = 'dataFailed',
    START = 'start',
    NEXTQUESTION = 'nextQuestin',
}

export type TState = {
    questions: Tquestion[];
    status: QuizStatus;
    index: number;
}

export type TAction = {
	type: ActionType;
	payload?: Tquestion[];
}