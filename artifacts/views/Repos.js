import * as React from 'react';
import { View, Text } from 'react-native';
import { lookupRepos, lookupUserProfile, currentlyFetchingRepos, lookupProgrammingLanguagesModel } from '../Model';
function ProgrammingLanguagesView({ languages, repo }) {
    if (languages === null) {
        return null;
    }
    const languagesUsed = languages.reduce(function (reduction, numberOfLines, languageName) {
        const summary = `${languageName}: ${numberOfLines}`;
        if (reduction !== '') {
            return `${reduction}, ${summary}`;
        }
        return summary;
    }, '');
    return (React.createElement(Text, { key: `${repo.get('id')}-languages` }, languagesUsed));
}
function RepoView({ repo, model }) {
    if (!repo) {
        return null;
    }
    const languages = lookupProgrammingLanguagesModel(repo, model);
    return (React.createElement(View, { className: 'repo' },
        React.createElement(View, null, repo.get('name')),
        React.createElement(ProgrammingLanguagesView, { languages: languages, repo: repo }),
        React.createElement(View, null, repo.get('description')),
        repo.get('fork') && React.createElement(Text, null, "fork"),
        React.createElement(Text, null,
            "Number of forks: ",
            repo.get('forks_count')),
        React.createElement(Text, null,
            "Number of open issues: ",
            repo.get('open_issues_count')),
        React.createElement(Text, null,
            "Number of watchers: ",
            repo.get('watchers'))));
}
const Repos = ({ model }) => {
    const username = model.get('showProfile');
    if (username === null) {
        return null;
    }
    const profile = lookupUserProfile(username, model);
    if (profile === null) {
        return null;
    }
    const repos = lookupRepos(profile, model);
    const fetching = currentlyFetchingRepos(profile, model);
    if (repos === null && !fetching) {
        return (React.createElement(Text, null,
            "Fetchign repos... ",
            username));
    }
    if (repos === null) {
        return React.createElement(Text, null,
            "Can't get the repos for ",
            username);
    }
    if (repos.size === 0) {
        return React.createElement(Text, null, "No repos");
    }
    return (React.createElement(View, { className: 'repositories' },
        React.createElement(Text, null, "Repositories"),
        repos.map(repo => React.createElement(RepoView, { repo: repo, model: model, key: repo === undefined ? 'remove-when-immutable4-released' : repo.get('id') }))));
};
export default Repos;
//# sourceMappingURL=Repos.js.map