#!/usr/bin/env tsx

import { execSync } from 'child_process';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

const dbPath = 'infra/db';
const migrationsPath = path.resolve(dbPath, 'migrations');

const log = (msg: string) => console.log(`\n🔹 ${msg}\n`);

function run(cmd: string) {
  try {
    execSync(cmd, { cwd: dbPath, stdio: 'inherit' });
  } catch (e) {
    console.error(`\n❌ Erro ao executar: ${cmd}\n`);
    process.exit(1);
  }
}

async function main() {
  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: 'O que você deseja fazer com o Drizzle ORM?',
    choices: [
      { title: '🚀 Push (Aplicar mudanças e sincronizar com banco)', value: 'push' },
      { title: '📝 Generate (Gerar migrations .sql sem aplicar)', value: 'generate' },
      { title: '💣 Drop + Recriar banco a partir das migrations', value: 'drop' },
      { title: '👋 Sair', value: 'exit' }
    ]
  });

  if (action === 'exit') {
    log('Até mais!');
    process.exit(0);
  }

  if (action === 'push') {
    log('Executando: drizzle-kit push');
    run('npx drizzle-kit push');
  }

  if (action === 'generate') {
    log('Executando: drizzle-kit generate');
    run('npx drizzle-kit generate');
    run('npx drizzle-kit migrate');
  }

  if (action === 'drop') {
    const hasMigrations = fs.existsSync(migrationsPath) && fs.readdirSync(migrationsPath).length > 0;

    if (!hasMigrations) {
      console.error('\n❌ Nenhuma migration encontrada em drizzle/migrations. Rode `generate` antes de usar drop.\n');
      process.exit(1);
    }

    const confirm = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Tem certeza que deseja DELETAR todas as tabelas e recriar do zero?',
      initial: false,
    });

    if (!confirm.value) {
      log('Operação cancelada.');
      process.exit(0);
    }

    log('Executando: drizzle-kit drop');
    run('npx drizzle-kit drop');
  }
}

main();
