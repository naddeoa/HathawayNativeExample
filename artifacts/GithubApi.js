var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function appendKey(url) {
    return `${url}?client_secret=072b5041986c59c65804831ba94086ea043e04be&client_id=185bde446d817f14681f`;
}
function isGetUserProfileResponse(a) {
    return a.id && a.repos_url;
}
export function getUserProfile(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = appendKey(`https://api.github.com/users/${username}`);
        const response = yield fetch(url);
        const responseJson = yield response.json();
        if (!isGetUserProfileResponse(responseJson)) {
            throw new Error(`Unexpected return object from Github: ${JSON.stringify(response)}`);
        }
        return responseJson;
    });
}
function isRepos(a) {
    if (!('length' in a)) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }
    const repo = a[0];
    return 'id' in repo
        && 'name' in repo
        && 'description' in repo;
}
export function getUserRepos(profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = appendKey(profile.get('repos_url'));
        const response = yield fetch(url);
        const responseJson = yield response.json();
        responseJson.forEach((repo) => {
            delete repo['size'];
        });
        if (!isRepos(responseJson)) {
            throw new Error(`Unexpected return object from Github: ${JSON.stringify(responseJson)}`);
        }
        return responseJson;
    });
}
function isProgrammingLanguages(a) {
    const keys = Object.keys(a);
    if (keys.length === 0) {
        return true;
    }
    const someValue = a[keys[0]];
    return Number.isInteger(someValue);
}
export function getProgrammingLangugesForRepos(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = appendKey(repo.get('languages_url'));
        const response = yield fetch(url);
        const responseJson = yield response.json();
        if (!isProgrammingLanguages(responseJson)) {
            throw new Error(`Unexpected return object from Github: ${JSON.stringify(responseJson)}`);
        }
        return responseJson;
    });
}
//# sourceMappingURL=GithubApi.js.map