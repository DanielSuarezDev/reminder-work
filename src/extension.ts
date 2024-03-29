import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.setReminder', async () => {
        const message = await vscode.window.showInputBox({ prompt: 'Reminder message:' });
        const time = await vscode.window.showInputBox({ prompt: 'In how many minutes?' });

        if (!message || !time || isNaN(Number(time))) {
            vscode.window.showErrorMessage('Please enter a valid message and time.');
            return;
        }

        const timer = setTimeout(() => {
            vscode.window.showInformationMessage(`Reminder: ${message}`);
        }, Number(time) * 60000);

        context.subscriptions.push({ dispose: () => clearTimeout(timer) });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
