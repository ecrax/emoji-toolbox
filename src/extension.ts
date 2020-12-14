// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const emoticon = require("emoticon");

  let emojis = new Array();

  let emojisWithNames = new Map();

  for (let i = 0; i < emoticon.length; i++) {
    const element = emoticon[i]["emoji"];
    emojis.push(element);

    emojisWithNames.set(emoticon[i]["emoji"], emoticon[i]["name"]);
  }

  let disposableTwo = vscode.commands.registerCommand(
    "emoji-place.insertEmoji",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("Editor does not exist!");
      }

      const quickPick = vscode.window.createQuickPick();
      quickPick.items = emojis.map((x: any) => ({
        label: x + " " + emojisWithNames.get(x),
      }));
      quickPick.onDidChangeSelection(([item]) => {
        if (item) {
          editor?.edit((edit) => {
            edit.insert(editor.selection.active, item.label.split(" ")[0]);
          });
          quickPick.dispose();
        }
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    }
  );

  let disposableFour = vscode.commands.registerCommand(
    "emoji-place.anythingToEmoji",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("Editor does not exist!");
      }

      const text = editor?.document.getText(editor.selection).trim();

      let emojis = new Array();

      for (let index = 0; index < emoticon.length; index++) {
        const element = emoticon[index];

        for (let j = 0; j < element["tags"].length; j++) {
          const tags = element["tags"][j];

          if (tags === text) {
            emojis.push(element["emoji"]);
          }
        }

        for (let j = 0; j < element["emoticons"].length; j++) {
          const emoticons = element["emoticons"][j];

          if (emoticons === text) {
            emojis.push(element["emoji"]);
          }
        }

        if (element["name"] === text) {
          emojis.push(element["emoji"]);
        }
      }

      if (emojis.length > 1) {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = emojis.map((x: any) => ({ label: x }));
        quickPick.onDidChangeSelection(([item]) => {
          if (item) {
            editor?.edit((edit) => {
              edit.replace(editor.selection, item.label);
            });
            quickPick.dispose();
          }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
      } else if (emojis.length === 0) {
        vscode.window.showInformationMessage("Nothing to convert found");
      } else {
        editor?.edit((edit) => {
          if (emojis.length !== 0) {
            edit.replace(editor.selection, emojis[0]);
          }
        });
      }
    }
  );

  let disposableThree = vscode.commands.registerCommand(
    "emoji-place.textToEmoji",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("Editor does not exist!");
      }

      const text = editor?.document.getText(editor.selection).trim();

      let emojis = new Array();

      for (let index = 0; index < emoticon.length; index++) {
        const element = emoticon[index];

        for (let j = 0; j < element["tags"].length; j++) {
          const tags = element["tags"][j];

          if (tags === text) {
            emojis.push(element["emoji"]);
          }
        }

        if (element["name"] === text) {
          emojis.push(element["emoji"]);
        }
      }

      // Maybe there is more than one emoji to convert to -> show quickPick to choose -> either way replace selected emoji
      if (emojis.length > 1) {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = emojis.map((x: any) => ({ label: x }));
        quickPick.onDidChangeSelection(([item]) => {
          if (item) {
            editor?.edit((edit) => {
              edit.replace(editor.selection, item.label);
            });
            quickPick.dispose();
          }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
      } else if (emojis.length === 0) {
        vscode.window.showInformationMessage("No emoji found");
      } else {
        editor?.edit((edit) => {
          if (emojis.length !== 0) {
            edit.replace(editor.selection, emojis[0]);
          }
        });
      }
    }
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "emoji-place.asciiToEmoji",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("Editor does not exist!");
      }

      const text = editor?.document.getText(editor.selection).trim();

      let emojis = new Array();

      for (let index = 0; index < emoticon.length; index++) {
        const element = emoticon[index];

        for (let j = 0; j < element["emoticons"].length; j++) {
          const emoticons = element["emoticons"][j];

          if (emoticons === text) {
            emojis.push(element["emoji"]);
          }
        }
      }

      // Maybe there is more than one emoji to convert to -> show quickPick to choose -> either way replace selected emoji
      if (emojis.length > 1) {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = emojis.map((x: any) => ({ label: x }));
        quickPick.onDidChangeSelection(([item]) => {
          if (item) {
            editor?.edit((edit) => {
              edit.replace(editor.selection, item.label);
            });
            quickPick.dispose();
          }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
      } else if (emojis.length === 0) {
        vscode.window.showInformationMessage("No ASCII emoji detected");
      } else {
        editor?.edit((edit) => {
          if (emojis.length !== 0) {
            edit.replace(editor.selection, emojis[0]);
          }
        });
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableTwo);
  context.subscriptions.push(disposableThree);
}

// this method is called when your extension is deactivated
export function deactivate() {}
