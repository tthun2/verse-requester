# verse-requester
 Replicate https://text.recoveryversion.bible/list/list.htm

-----

Day 1
01/Aug/2023


Downloaded and installed
- VS Code
- Git
- GitHub
- Node.js


Downloaded ASV Bible from https://www.biblesupersearch.com/bible-downloads/


Followed the steps shown here to build a custom CLI with Node.js: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs


Followed the steps to set the execution policy:
https://www.sharepointdiary.com/2014/03/fix-for-powershell-script-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system.html

1. Open PowerShell as Administrator
2. Enter command: Set-ExecutionPolicy RemoteSigned
3. Type "Y" when prompted to proceed

Restricted – No scripting allowed
Unrestricted – You can run any script, No signing is required.
RemoteSigned – Good for Test, Dev environments. Only files from the internet need to be signed. This is the default setting on servers.
AllSigned  – local or remote script – It should be signed by a trusted publisher.


Followed the steps shown to get arguments: https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program


Understanding how to read json files with Node.js


Figuring out how to access each object (book, chapter, verse, text) in the json file

-----
