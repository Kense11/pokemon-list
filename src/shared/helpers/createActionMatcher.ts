import { Action } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit/src/createAction";

export const createActionMatcher =
    <ActionCreator extends ReturnType<typeof createAction>>(actionCreators: Array<ActionCreator>) =>
    (action: Action): action is ReturnType<ActionCreator> =>
        actionCreators.some(({ match }) => match(action));
