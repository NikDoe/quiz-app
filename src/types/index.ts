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
}

export enum ActionType {
    DATARECEIVED = 'dataReceived',
    DATAFAILED = 'dataFailed',
}

export type TState = {
    questions: Tquestion[];
    status: QuizStatus;
}

export type TAction = {
	type: ActionType;
	payload?: Tquestion[];
}