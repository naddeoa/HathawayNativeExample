import { createModel } from 'reelm-core';
import { Map, List } from 'immutable';
export function addUserProfile(username, profile, model) {
    return model.set('userProfiles', model.get('userProfiles').set(username, createModel(profile)));
}
export function lookupUserProfile(username, model) {
    const profile = model.get('userProfiles').get(username);
    if (!profile) {
        return null;
    }
    return profile;
}
export function currentlyFetchingRepos(profile, model) {
    const fetching = model.get('fetchingReposForProfile').get(profile.get('id'));
    if (!fetching) {
        return false;
    }
    return fetching;
}
export function setCurrentlyFetchingRepos(profile, fetching, model) {
    const fetchingStatus = model.get('fetchingReposForProfile').set(profile.get('id'), fetching);
    return model.set('fetchingReposForProfile', fetchingStatus);
}
export function addRepos(profile, repos, model) {
    const updatedRepos = model.get('repos').set(profile.get('id'), List(repos.map(createModel)));
    return model.set('repos', updatedRepos);
}
export function lookupRepos(profile, model) {
    // TODO make this one line
    const repos = model.get('repos').get(profile.get('id'));
    if (!repos) {
        return null;
    }
    return repos;
}
export function addProgammingLanguages(repo, languages, model) {
    const updatedProgrammingLanguagesModel = model.get('programmingLanguages').set(repo.get('id'), Map(languages));
    return model.set('programmingLanguages', updatedProgrammingLanguagesModel);
}
export function lookupProgrammingLanguagesModel(repo, model) {
    return model.get('programmingLanguages').get(repo.get('id')) || null;
}
const defaultValues = {
    usernameSearchText: '',
    showProfile: null,
    userProfiles: Map(),
    repos: Map(),
    fetchingReposForProfile: Map(),
    programmingLanguages: Map()
};
export const initialValue = createModel(defaultValues);
//# sourceMappingURL=Model.js.map