import { UserProfileModel, RepoModel, Orientation } from './Model'
import { Route } from './Routes';

export interface OnUsernameSearchChanged {
    type: 'OnUsernameSearchChanged',
    text: string
}

export interface OnUsernameSearch {
    type: 'OnUsernameSearch',
    pushInHistory: boolean
}

export interface FetchReposForUser {
    type: 'FetchReposForUser',
    user: UserProfileModel
}

export interface FetchLanguagesForRepo {
    type: 'FetchLanguagesForRepo',
    repo: RepoModel
}

export interface Navigate {
    type: 'Navigate',
    route: Route
}

export interface OrientationChanged {
    type: 'OrientationChanged',
    orientation: Orientation
}

export type Msg =
    OnUsernameSearch
    | OnUsernameSearchChanged
    | FetchReposForUser
    | FetchLanguagesForRepo
    | Navigate
    | OrientationChanged

export default Msg;