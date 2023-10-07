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
    FINISH = 'finish',
}

export enum ActionType {
    DATARECEIVED = 'dataReceived',
    DATAFAILED = 'dataFailed',
    START = 'start',
    SETANSWER = 'setAnswer',
    SETPROGERSS = 'setProgress',
    SETSCORE = 'setScore',
    SETHIGHSCORE = 'setHighScore',
    NEXTQUESTION = 'nextQuestin',
    SETTIMER = 'setTimer',
    FINISH = 'finish',
    RESTART = 'restart',
}

export type TState = {
    questions: Tquestion[];
    status: QuizStatus;
    index: number;
    isAnswer: boolean;
    progress: number;
    score: number;
    highScore: number;
    secondsRemaining: number;
}

export type TAction = 
{ type: ActionType.DATARECEIVED; payload: Tquestion[] } |
{ type: ActionType.DATAFAILED; } |
{ type: ActionType.START; } |
{ type: ActionType.SETANSWER; payload: boolean} |
{ type: ActionType.SETPROGERSS; } |
{ type: ActionType.SETSCORE; payload: number } |
{ type: ActionType.SETHIGHSCORE; } |
{ type: ActionType.NEXTQUESTION; } |
{ type: ActionType.SETTIMER; } |
{ type: ActionType.FINISH; } |
{ type: ActionType.RESTART; }