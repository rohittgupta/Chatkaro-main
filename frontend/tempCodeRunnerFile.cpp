#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string url;
    getline(cin, url);

    string line;
    getline(cin, line);
    int n = stoi(line);

    vector<string> keys(n);
    for (int i = 0; i < n; ++i) getline(cin, keys[i]);

    size_t qpos = url.find('?');
    if (qpos == string::npos || qpos + 1 == url.size()) {
        for (int i = 0; i < n; ++i) cout << "-1\n";
        return 0;
    }

    string query = url.substr(qpos + 1);
    vector<pair<string, string>> params;
    size_t start = 0;
    while (start < query.size()) {
        size_t end = query.find('&', start);
        if (end == string::npos) end = query.size();
        string part = query.substr(start, end - start);
        size_t mid = part.find('-');
        if (mid != string::npos)
            params.emplace_back(part.substr(0, mid), part.substr(mid + 1));
        else
            params.emplace_back(part, "");
        start = end + 1;
    }

    for (const string& key : keys) {
        bool found = false;
        for (const auto& [k, v] : params) {
            if (k == key) {
                cout << v << endl;
                found = true;
                break;
            }
        }
        if (!found) cout << "-1\n";
    }

    return 0;
}
