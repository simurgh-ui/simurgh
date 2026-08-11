import { transform } from 'esbuild';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const packageRoot = resolve(import.meta.dirname, '../packages/angular');
const dist = resolve(packageRoot, 'dist');
const files = await readdir(dist, { recursive: true });

for (const relativePath of files.filter((file) => file.endsWith('.js'))) {
  const path = resolve(dist, relativePath);
  const source = await readFile(path, 'utf8');
  const sourceFile = ts.createSourceFile(
    relativePath,
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS,
  );
  const statements = sourceFile.statements.filter((statement) => {
    if (!ts.isExpressionStatement(statement)) return true;
    const expression = statement.expression;
    return !(
      ts.isCallExpression(expression) &&
      ts.isPropertyAccessExpression(expression.expression) &&
      expression.expression.name.text === 'ɵɵngDeclareClassMetadata'
    );
  });
  const optimized = ts
    .createPrinter()
    .printFile(ts.factory.updateSourceFile(sourceFile, statements));
  const result = await transform(optimized, {
    loader: 'js',
    format: 'esm',
    target: 'es2022',
    minifySyntax: true,
    sourcemap: 'external',
    sourcefile: relativePath.replaceAll('\\', '/'),
    sourcesContent: false,
  });
  await writeFile(path, result.code);
  await writeFile(`${path}.map`, result.map);
}
