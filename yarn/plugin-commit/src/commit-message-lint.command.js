import { BaseCommand } from '@yarnpkg/cli';
import { CommitLinter } from '@atls/code-commit';
import { read } from '@atls/code-commit';
class CommitMessageLintCommand extends BaseCommand {
    async execute() {
        const linter = new CommitLinter();
        const messages = await read({ edit: true });
        const results = await Promise.all(messages.map(linter.lint));
        const output = linter.format({ results });
        if (output !== '') {
            this.context.stdout.write(output);
        }
        return results.some((result) => result.valid === false) ? 1 : 0;
    }
}
CommitMessageLintCommand.paths = [['commit', 'message', 'lint']];
export { CommitMessageLintCommand };
